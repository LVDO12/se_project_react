import React, { useState, useEffect, useContext } from "react";
import "./EditProfileModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function EditProfileModal({ onClose, isOpen, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [editData, setEditData] = useState({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setEditData({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: editData.name, avatar: editData.avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      formName="edit"
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <fieldset className="form__set">
        <label className="form__field">
          Name*
          <input
            type="name"
            name="name"
            className="form__input"
            placeholder="Name"
            value={editData.name}
            onChange={handleChange}
          />
        </label>
        <label className="form__field">
          Avatar*
          <input
            type="url"
            name="avatar"
            className="form__input"
            placeholder="Image URL"
            value={editData.avatar}
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default EditProfileModal;
