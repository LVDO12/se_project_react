import React, { useState, useEffect } from "react";
import "./AddItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, isOpen, onAddItem }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weatherType, setWeatherType] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setWeatherType("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weatherType });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      formName="garment"
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <fieldset className="form__set">
        <label className="form__field">
          Name
          <input
            type="text"
            value={name}
            className="form__input"
            placeholder="Name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="form__field">
          Image
          <input
            type="url"
            value={link}
            className="form__input"
            placeholder="Image URL"
            id="url"
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
      </fieldset>
      <fieldset className="form__set form__radio-set">
        <legend className="form__title form__legend__title">
          Select the weather type:
          <label className="form__radio-field ">
            Hot
            <input
              type="radio"
              id="hot"
              name="weather"
              className="form__radio-input form__input"
              value="hot"
              checked={weatherType === "hot"}
              onChange={(e) => setWeatherType(e.target.value)}
            />
          </label>
          <label className="form__radio-field">
            Warm
            <input
              type="radio"
              id="warm"
              name="weather"
              className="form__radio-input form__input"
              value="warm"
              checked={weatherType === "warm"}
              onChange={(e) => setWeatherType(e.target.value)}
            />
          </label>
          <label className="form__radio-field">
            Cold
            <input
              type="radio"
              id="cold"
              name="weather"
              className="form__radio-input form__input"
              value="cold"
              checked={weatherType === "cold"}
              onChange={(e) => setWeatherType(e.target.value)}
            />
          </label>
        </legend>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
