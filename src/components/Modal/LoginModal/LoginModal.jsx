import React, { useState } from "react";
import "./LoginModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onSubmit, openSignupModal, onClose }) {
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: logData.email, password: logData.password });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log In"
      formName="login"
      isOpen={isOpen}
      handleSubmit={handleSubmit}
      onClose={onClose}
    >
      <fieldset className="form__set">
        <label className="form__field">
          Email*
          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="Email"
            onChange={handleChange}
          />
        </label>
        <label className="form__field">
          Password*
          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="Password"
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <p className="form__signup" onClick={openSignupModal}>
        or Sign Up
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
