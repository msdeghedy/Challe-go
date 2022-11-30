import React from "react";
import "./LikeBtn.scss";
const Like = ({ click, like }) => {
  return (
    <div className={`heart ${like && "is_animating"}`} onClick={click}></div>
  );
};

export default Like;
