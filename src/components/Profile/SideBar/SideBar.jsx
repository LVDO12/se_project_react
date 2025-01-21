import React from "react";
import "./SideBar.css";
import avatar from "../../../assets/Avatar.png";

function SideBar() {
  return (
    <div className="side-bar">
      <img className="side-bar__user__avatar" src={avatar} alt="Avatar"></img>
      <p className="side-bar__user__name">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
