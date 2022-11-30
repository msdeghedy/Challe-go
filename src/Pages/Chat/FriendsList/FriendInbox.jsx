import { useContext } from "react";
import { SecondUserContext } from "../../../context/SecondUserContext";
const FriendInbox = ({ active, user }) => {
  const { secondUser, setSecondUser } = useContext(SecondUserContext);
  return (
    <div
      className={`msg chat-users contact-user d-flex gap-2 align-items-center p-2 ps-3 active-chat-user ${
        user?.uid === secondUser?.uid && "active"
      }`}
      onClick={() => {
        setSecondUser(user);
        document.querySelector("#fwe1fa").classList.add("chat-area-active");
      }}
    >
      <div className="msg-profile group">
        <img className="rounded-circle" src={user.photoUrl} alt={user?.name} />
      </div>
      <div className="msg-detail">
        <div className="msg-username">{user?.name} </div>
      </div>
    </div>
  );
};

export default FriendInbox;
