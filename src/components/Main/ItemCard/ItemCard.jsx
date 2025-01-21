import React from "react";
import "./ItemCard.css";

function ItemCard({ item, handleOpenModal }) {
  return (
    <li className="item-card">
      <div className="item-card_title-container">
        <p className="item-card__title">{item.name}</p>
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__picture"
        onClick={() => handleOpenModal(item)}
      ></img>
    </li>
  );
}

export default ItemCard;
