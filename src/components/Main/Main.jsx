import { useContext } from "react";
import editIcon from "../../images/edit.svg";
import addIcon from "../../images/add.svg";

import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/form/NewCard/NewCard.jsx";
import EditProfile from "./components/form/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/form/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__details">
          <div className="profile__avatar">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Avatar"
            />

            <button
              type="button"
              className="profile__avatar-edit"
              aria-label="Cambiar foto de perfil"
              onClick={() => onOpenPopup(editAvatarPopup)}
            ></button>
          </div>

          <div className="profile__text">
            <div className="profile__name-wrapper">
              <h3 className="profile__name">{currentUser.name}</h3>
              <button
                className="profile__edit-button"
                type="button"
                onClick={() => onOpenPopup(editProfilePopup)}
              >
                <img
                  src={editIcon}
                  alt="Edit icon"
                  className="profile__edit-icon"
                />
              </button>
            </div>

            <span className="profile__role">{currentUser.about}</span>
          </div>

          <button
            className="profile__add-button"
            type="button"
            onClick={() => onOpenPopup(newCardPopup)}
          >
            <img src={addIcon} alt="Add icon" className="profile__add-icon" />
          </button>
        </div>
      </section>

      <ul className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={onOpenPopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
