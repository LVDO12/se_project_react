import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import avatar from "../../assets/Avatar.png";
import logo from "../../assets/Logo.png";
import Switch from "../Switch/switch";

function Header({ openModal }) {
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
      <div className="header-container header-button-and-user-container">
        <Switch />
        <button className="header__button" type="button" onClick={openModal}>
          + Add clothes
        </button>
        <Link to="/Profile" className="header__link">
        <div className="header-container header__user">
          <p className="header__user__name">Terrence Tegegne</p>
          <img className="header__user__avatar" src={avatar} alt="Avatar"></img>
        </div>
        </Link>
      </div>
      {/* onClick={onAddClothesClick} */}
    </header>
  );
}

export default Header;
