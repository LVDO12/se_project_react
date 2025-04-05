import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by LV</p>
      <p className="footer__text">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
