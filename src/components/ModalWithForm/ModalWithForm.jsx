import React from "react";
import "./ModalWithForm.css";
import "../Form/Form.css";
import useModalClose from "../../hook/useModalClose";

function ModalWithForm({ children, title, buttonText, name, onClose, isOpen }) {
    useModalClose(isOpen, onClose);
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className={`modal modal_type_${name} ${
        isOpen ? `modal_type_${name}_open` : ""
      }`}
    >
      <div className="modal__container">
        <p className="modal__title">{title}</p>
        <button
          className="modal__button_close"
          id="close-button"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
        </form>
        <button className="modal__button_save" id="save-button" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
