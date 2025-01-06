import React from "react";
import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import useModalClose from "../../hook/useModalClose";

function ItemModal({ name, isOpen, item, onClose }) {
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`modal modal_type_${name} ${
        isOpen ? `modal_type_${name}_open` : ""
      }`}
    >
      <div className="modal__container">
        {item && (
          <>
            <img src={item.link} alt={item.name} className="item__image" />
            <p className="item__name">{item.name}</p>
            <p className="item__weather">Weather: {item.weather}</p>
          </>
        )}
        <button
          className="modal__button_close "
          id="close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ItemModal;
