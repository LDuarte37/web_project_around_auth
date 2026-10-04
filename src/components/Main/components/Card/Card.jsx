import { useContext } from "react";
import likeIcon from "../../../../images/likeBTN.svg";
import likeActiveIcon from "../../../../images/likeBTN_Active.svg";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function Card(props) {
  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const { name, link, isLiked } = card;

  const isOwn =
    card.owner?._id === currentUser._id || card.owner === currentUser._id;

  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const imageComponent = {
    children: <ImagePopup card={card} />,
  };

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__delete-btn"
          type="button"
          aria-label="Eliminar tarjeta"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />

      <div className="card__info">
        <h3 className="card__name">{name}</h3>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Me gusta"
          onClick={handleLikeClick}
        >
          <img
            src={isLiked ? likeActiveIcon : likeIcon}
            alt=""
            className="card__like-icon"
          />
        </button>
      </div>
    </li>
  );
}
