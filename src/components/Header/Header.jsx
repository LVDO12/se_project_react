import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import "./Header.css";
import avatar from "../../assets/Avatar.png";
import logo from "../../assets/Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { getUserInitial } from "../../utils/getUserInitial";

function Header({
  openAddItemModal,
  isLoggedIn,
  openSignupModal,
  openLoginModal,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo"></img>
        </Link>
        <p className="header__date">{currentDate}</p>
      </div>
      {isLoggedIn ? (
        <>
          <div className="header-container header-button-and-user-container">
            <ToggleSwitch />
            <button
              className="header__button"
              type="button"
              onClick={openAddItemModal}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header-container header__user">
                <p className="header__user__name">{currentUser.name}</p>
                {currentUser.avatar ? (
                  <img
                    className="header__user__avatar"
                    src={currentUser.avatar}
                    alt="Avatar"
                  ></img>
                ) : (
                  <div className="header__user__avatar-placeholder">
                    {getUserInitial(currentUser)}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className="header-container header-button-and-user-container">
          <ToggleSwitch />
          <p className="header__signup" onClick={openSignupModal}>
            Sign Up
          </p>
          <p className="header__login" onClick={openLoginModal}>
            Log In
          </p>
        </div>
      )}
    </header>
  );
}

export default Header;
