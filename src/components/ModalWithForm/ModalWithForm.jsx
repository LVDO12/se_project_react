import React from "react";
import "./ModalWithForm.css";
import useModalClose from "../../hook/useModalClose";

function ModalWithForm({
  children,
  title,
  buttonText,
  formName,
  onClose,
  isOpen,
  handleSubmit,
}) {
  
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`modal modal_type_${formName} ${
        isOpen ? `modal_type_${formName}_open` : ""
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
          <button
            className="modal__button_save "
            id="save-button"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
