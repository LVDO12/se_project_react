import React from "react";
import "./Header.css";
import avatar from "../../assets/Avatar.png";
import logo from "../../assets/siteLogo.svg";

function Header({ openModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header-container">
        <img className="header__logo" src={logo} alt="Logo"></img>
        <p className="header__date">{currentDate}</p>
      </div>
      <div className="header-container header-button-and-user-container">
        <button
          className="header__button"
          type="button"
          onClick={openModal}
        >
          + Add clothes
        </button>
        <div className="header-container header__user">
          <p className="header__user__name">Terrence Tegegne</p>
          <img className="header__user__avatar" src={avatar} alt="Avatar"></img>
        </div>
      </div>
      {/* onClick={onAddClothesClick} */}
    </header>
  );
}

export default Header;
