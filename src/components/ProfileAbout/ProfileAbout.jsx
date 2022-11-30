import React, { useContext, useState } from "react";
import "./ProfileAbout.scss";
import userImg from "../../assets/profile/user-img-1.svg";
import Select from "react-select";
import { Link } from "react-router-dom";
import { currentContext } from "../../context/CurrentUser";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect } from "react";
import Toast from "../../UI/Toast/Toast";

const ProfileAbout = ({ user, users, self }) => {
  const { updateCurrentUser } = useContext(currentContext);
  const [interests, setIneterests] = useState(user.interests);
  const [editInterests, setEditInterests] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const friendsList = users.filter((friend) => {
    return friend.friends.includes(user.uid);
  });

  const interestsOptions = [
    {
      value: 1,
      label: "Frontend Development",
    },
    {
      value: 2,
      label: "Backend Development",
    },
    {
      value: 3,
      label: "UI/UX",
    },
    {
      value: 4,
      label: "Artifcial Intellegence",
    },
  ];

  const colors = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
  ];

  const style = {
    control: (base, state) => ({
      ...base,
      // This line disable the blue border
      background: "#000",
      textColor: "white",
      width: "100%",
      border: state.isFocused
        ? "1px solid rgba(54,23,94, 0.5)"
        : "1px solid #cccccc",
      boxShadow: state.isFocused
        ? "0px 0px 0px 4px rgba(54,23,94, 0.2)"
        : "none",
      "&:hover": {
        border: state.isFocused
          ? "1px solid rgba(54,23,94, 0.5)"
          : "1px solid #cccccc",
        boxShadow: state.isFocused
          ? "0px 0px 0px 4px rgba(54,23,94, 0.2)"
          : "none",
      },
    }),
    option: (base, state) => ({
      ...base,
      background: "#000",
      textColor: "#fff",
      cursor: "pointer",
    }),
  };

  function handleEditInterests() {
    setEditInterests(true);
  }

  function confirmEditInterests() {
    updateCurrentUser(
      "interests",
      interests,
      "Your Interests has been updated successfully"
    );
    setEditInterests(false);
  }

  return (
    <div className="profile-about">
      <div className="mb-2">
        <div className="info-interests d-flex flex-wrap text-center gap-3 mb-3 w-100">
          {!editInterests ? (
            interests.map((interest) => (
              <div
                className={`badge bg-${
                  colors[Math.floor(Math.random() * (colors.length - 1))]
                }`}
              >
                {interest.label}
              </div>
            ))
          ) : (
            <Select
              closeMenuOnSelect={false}
              defaultValue={interests}
              isMulti
              options={interestsOptions}
              styles={style}
              onChange={(choice) => setIneterests(choice)}
              className="w-100"
            />
          )}
        </div>

        {self &&
          (!editInterests ? (
            <button
              className="btn btn-primary btn-sm rounded-2  d-block"
              onClick={handleEditInterests}
            >
              {interests.length ? "Edit" : "Add interests"}
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm rounded-2  d-block"
              onClick={confirmEditInterests}
            >
              Done
            </button>
          ))}
      </div>

      <div class="card bg-body border-primary mb-3">
        <div class="card-header text-uppercase">Study Buddies</div>
        <div class="card-body">
          <div className="contacts-list row">
            {friendsList.length === 0 ? (
              <div>No study buddies yet</div>
            ) : (
              friendsList
                .map((friend) => (
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100 }}
                    overlay={
                      <Tooltip id="my-tooltip-id">{friend.name}</Tooltip>
                    }
                  >
                    <div className="contact mb-3 col-4">
                      <Link
                        to={`/${friend.username}`}
                        className="text-white fw-bold text-decoration-none"
                      >
                        <img
                          src={friend.photoUrl}
                          alt="contact"
                          className="img-fluid rounded-circle"
                        />
                      </Link>
                    </div>
                  </OverlayTrigger>
                ))
                .slice(0, 9)
            )}
          </div>
          {friendsList.length > 9 && (
            <button
              className="btn btn-primary w-100"
              onClick={() => setSmShow(true)}
            >
              See all
            </button>
          )}
        </div>
      </div>

      <Modal
        size="md"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="text-white"
        scrollable={true}
      >
        <Modal.Header className="bg-body">
          <h3 className="text-center fw-bold text-uppercase mx-auto">
            Contacts
          </h3>
        </Modal.Header>
        <Modal.Body className="px-4 text-center bg-body">
          <div className="contacts-list row">
            {friendsList.map((friend) => (
              <div className="contact mb-3 d-flex align-items-center col-lg-6">
                <img
                  src={friend.photoUrl}
                  alt="contact"
                  className="img-fluid me-2 w-25 rounded-circle"
                />
                <Link
                  to={`/${friend.username}`}
                  className="fw-bold text-decoration-none"
                >
                  {friend.name}
                </Link>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <Toast />
    </div>
  );
};

export default ProfileAbout;
