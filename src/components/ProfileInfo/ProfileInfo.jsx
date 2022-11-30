import { useContext, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import "./ProfileInfo.scss";
import userImgUrl from "./Sample.png";
import { currentContext } from "../../context/CurrentUser";
import UserAction from "./UserAction";
import Toast from "../../UI/Toast/Toast";
import { DarkLightContext } from "../../context/DarkLightContext";

const ProfileInfo = ({ user, self }) => {
  const { currentUser, updateCurrentUser } = useContext(currentContext);
  const { changeMode } = useContext(DarkLightContext);

  const [smShow, setSmShow] = useState(false);
  const [userImg, setUserImg] = useState(user.photoUrl);
  const [editingImg, setEditingImg] = useState(userImg);

  const openFile = function (event) {
    const input = event.target;

    const reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      setEditingImg(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  const removeImg = function () {
    updateCurrentUser("photoUrl", userImgUrl, "Your Photo has been removed");
    setUserImg(userImgUrl);
    setSmShow(false);
  };

  const confirmImg = () => {
    updateCurrentUser("photoUrl", editingImg, "Your Photo has been updated");
    setUserImg(editingImg);

    setSmShow(false);
  };

  return (
    <div className="profile-info">
      <div className="row">
        <div className="col-lg-3 d-flex justify-content-center">
          <div
            className="profile-img border rounded-circle border-4 border-primary"
            style={{ width: "200px", height: "200px" }}
          >
            <img
              src={userImg}
              alt="user"
              className="h-100 w-100 rounded-circle "
            />
            {self && (
              <>
                <button
                  className="btn btn-primary p-2 py-1 cam-btn text-white rounded-circle me-3 position-absolute"
                  onClick={() => setSmShow(true)}
                >
                  <AiFillCamera />
                </button>
                <Modal
                  size="md"
                  show={smShow}
                  onHide={() => setSmShow(false)}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <Modal.Body
                    className={`modalBody px-4 text-center ${
                      changeMode ? "bg-white" : "bg-body "
                    }`}
                  >
                    <div
                      className="edit-img mx-auto mb-4 rounded-circle"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={editingImg}
                        alt="user"
                        className="h-100 w-100 border rounded-circle border-4 border-primary"
                        style={{ width: "200px", height: "200px" }}
                      />
                    </div>
                    <input
                      type="file"
                      name="image"
                      id="user-img"
                      onChange={openFile}
                      className="form-control mb-3"
                    />
                    <button
                      className="btn btn-success me-2"
                      onClick={confirmImg}
                    >
                      Done
                    </button>
                    <button className="btn btn-danger" onClick={removeImg}>
                      Remove
                    </button>
                  </Modal.Body>
                </Modal>
              </>
            )}
          </div>
        </div>
        <div className="col-lg-9">
          <div className="info-content py-3">
            <div className="user d-flex justify-content-between align-items-start">
              <div className="user">
                <h2 className="name">
                  <span className="me-2 text-white"> {user.name}</span>
                  {user.userBadge && (
                    <img
                      className="custom-badge"
                      src={user.userBadge}
                      alt="rank"
                    />
                  )}
                </h2>
                <div className="username text-muted mb-2">@{user.username}</div>
                {user.friends.includes(currentUser[0].uid) && (
                  <span className="badge bg-primary">Friend</span>
                )}
              </div>
              <div>{self || <UserAction user={user} />}</div>
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default ProfileInfo;
