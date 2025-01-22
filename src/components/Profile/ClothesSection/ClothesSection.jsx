import React from "react";
import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";

function ClothesSection({ handleOpenModal, handleOpenImage, clothingItems }) {
  return (
    <div className="section">
      <div className="section__list">
        <p className="section__list__text">Your items</p>
        <button className="section__list__button" onClick={handleOpenModal}>
          + Add new
        </button>
      </div>
      <ul className="section__gallery">
        {clothingItems.map((item) => {
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
