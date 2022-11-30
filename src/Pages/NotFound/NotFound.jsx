import React from "react";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="sky">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
          <div className="comet"></div>
        </div>
        <div className="text">
          <p class="text-404">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </p>
          <p class="text-lost">
            The page you are looking for <br />
            has been lost in space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
