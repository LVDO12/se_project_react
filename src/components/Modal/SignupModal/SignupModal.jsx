import React, { useState } from "react";
import "./SignupModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignupModal({ isOpen, onSubmit, openLoginModal }) {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: regData.name,
      email: regData.email,
      password: regData.password,
      avatar: regData.avatar,
    });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      formName="signup"
      isOpen={isOpen}
      handleSubmit={handleSubmit}
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
        <label className="form__field">
          Name*
          <input
            type="text"
            name="name"
            value={regData.name}
            className="form__input"
            placeholder="Name"
            onChange={handleChange}
          />
        </label>
        <label className="form__field">
          Avatar URL*
          <input
            type="url"
            name="avatar"
            value={regData.avatar}
            className="form__input"
            placeholder="Avatar URL"
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <p className="form__login" onClick={openLoginModal}>
        or Log In
      </p>
    </ModalWithForm>
  );
}

export default SignupModal;
