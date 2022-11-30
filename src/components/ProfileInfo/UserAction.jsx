import { useState, useEffect } from "react";
import { useContext } from "react";
import { AiOutlineStop, AiOutlineUserAdd } from "react-icons/ai";
import Toast from "../../UI/Toast/Toast";
import { currentContext } from "../../context/CurrentUser";
import { FirebaseContext } from "../../context/FirebaseContext";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdPending } from "react-icons/md";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const UserAction = ({ user }) => {
  const { currentUser, updateCurrentUser } = useContext(currentContext);
  const { userCollection } = useContext(FirebaseContext);
  const [sentReq, setSentReq] = useState(currentUser[0].sentRequests);
  const [recReq, setrecReq] = useState(user.receivedRequests);
  const [isFriend, setIsFriend] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const handleRemoveFriend = () => {
    userCollection
      .doc(currentUser[0].uid)
      .update({
        friends: firebase.firestore.FieldValue.arrayRemove(user.uid),
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    toast.error("Friend has been removed!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      onClose: () => toastClosed(),
    });
    userCollection
      .doc(user.uid)
      .update({
        friends: firebase.firestore.FieldValue.arrayRemove(currentUser[0].uid),
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  const toastClosed = () => {
    navigate(`/${currentUser[0].username}`);
  };
  useEffect(() => {
    if (clicked) {
      updateCurrentUser(
        "sentRequests",
        sentReq,
        "Friend Request has been sent!"
      );

      userCollection
        .doc(user.uid)
        .set(
          {
            receivedRequests: recReq,
          },
          { merge: true }
        )
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      setClicked(false);
    }
  }, [sentReq]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser[0].friends.includes(user.uid)) {
        setIsFriend(true);
      }
      if (currentUser[0].sentRequests.includes(user.uid)) {
        setClicked(true);
      }
    }
  }, [currentUser[0].friends, currentUser[0].sentRequests]);

  const handleAddFriend = () => {
    setSentReq([...sentReq, user.uid]);
    setrecReq([...recReq, currentUser[0].uid]);
    setClicked(true);
  };
  return (
    <div>
      <>
        {isFriend && (
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={<Tooltip id={`remove`}>Remove friend.</Tooltip>}
          >
            <button className="icon-btn  text-danger me-3 h4">
              <AiOutlineStop onClick={handleRemoveFriend} />
            </button>
          </OverlayTrigger>
        )}

        {!isFriend ? (
          <>
            {clicked ? (
              <i disabled className=" text-primary me-3 h4">
                <MdPending />
              </i>
            ) : (
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip id={`add`}>Add friend.</Tooltip>}
              >
                <button
                  className="icon-btn text-secondary me-3 h4"
                  onClick={() => handleAddFriend()}
                >
                  <AiOutlineUserAdd />
                </button>
              </OverlayTrigger>
            )}
          </>
        ) : (
          <i className=" text-primary me-3 h4" disabled>
            <BsFillPersonCheckFill />
          </i>
        )}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
        <Toast />
      </>
    </div>
  );
};

export default UserAction;
