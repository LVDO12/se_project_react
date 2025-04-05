import React, { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import useModalClose from "../../../hook/useModalClose";

function ItemModal({ formName, isOpen, item, onClose, handleDeleteImage }) {
  const currentUser = useContext(CurrentUserContext);
  useModalClose(isOpen, onClose);
  
  const isOwn = item && currentUser ? item.owner === currentUser._id : false;

  return (
    <div
      className={`modal modal_type_${formName} ${
        isOpen ? `modal_type_${formName}_open` : ""
      }`}
    >
      <div className="modal__container">
        {item && (
          <>
            <img src={item.imageUrl} alt={item.name} className="item__image" />
            <p className="item__name">{item.name}</p>
            <p className="item__weather">Weather: {item.weather}</p>
          </>
        )}
        <button
          className="modal__button_close "
          id="close-button"
          onClick={onClose}
        ></button>
        {isOwn && (
          <button
            className="modal_type_garment__button_delete"
            onClick={handleDeleteImage}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
