import React, { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./SideBar.css";
import { getUserInitial } from "../../../utils/getUserInitial";

function SideBar({ openEditProfileModal, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="side-bar">
      <div className="side-bar__profile">
        {currentUser.avatar ? (
          <img
            className="side-bar__user__avatar"
            src={currentUser.avatar}
            alt="Avatar"
          ></img>
        ) : (
          <div className="side-bar__user__avatar-placeholder">
            {getUserInitial(currentUser)}
          </div>
        )}
        <p className="side-bar__user__name">{currentUser.name}</p>
      </div>
      <p className="side-bar__edit-profile" onClick={openEditProfileModal}>
        Change profile data
      </p>
      <p className="sida-bar__logout-user" onClick={onLogout}>
        Log out
      </p>
    </div>
  );
}

export default SideBar;
