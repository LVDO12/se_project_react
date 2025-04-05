import React,{useContext} from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./ItemCard.css";
import likeButton from "../../../assets/likeButton.svg";
import likedButton from "../../../assets/likedButton.svg";

function ItemCard({ item, handleOpenModal, onCardLike, isLiked }) {
  const currentUser = useContext(CurrentUserContext);

  const likeButtonStage = !isLiked ? likeButton : likedButton;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item-card">
      <ul className="item-card__wrapper">
        <li className="item-card_title-container">
          <p className="item-card__title">{item.name}</p>
        </li>
        {(currentUser && (
          <li className="item-card_title-container">
          <img
            src={likeButtonStage}
            onClick={handleLike}
            alt="Like button"
            className="item-card__like-button"
          />
        </li>
        ))}
      </ul>
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
