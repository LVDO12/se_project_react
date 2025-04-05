import React, { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";

function ClothesSection({ handleOpenModal, handleOpenImage, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);
  const userItem = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="section">
      <div className="section__list">
        <p className="section__list__text">Your items</p>
        <button className="section__list__button" onClick={handleOpenModal}>
          + Add new
        </button>
      </div>
      <ul className="section__gallery">
        {userItem.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleOpenModal={handleOpenImage}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
