import React from "react";
import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { DarkLightContext } from "../../context/DarkLightContext";
import "./ChallengerShortcut.scss";
const ChallengerShortcut = ({ name, photoURL, username }) => {
  const { changeMode } = useContext(DarkLightContext);

  return (
    <div
      className={`d-flex g-1  justify-content-center  align-items-center p-2 `}
    >
      <div className="col-2 ">
        <img src={photoURL} className="w-100 rounded-circle img-fluid" alt="" />
      </div>
      <div className="col-7">
        <p className="mb-0">{name}</p>
        <small>@{name}</small>
      </div>
      <Link className=" text-decoration-none text-white" to={`/${username}`}>
        <div className="col-2 profile-icon text-muted">
          <CgProfile />
        </div>
      </Link>
    </div>
  );
};

export default ChallengerShortcut;
