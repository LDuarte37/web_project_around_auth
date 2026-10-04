import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();
  const [avatarError, setAvatarError] = useState("");
  const [avatarValue, setAvatarValue] = useState("");

  function isValidUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const avatar = avatarRef.current.value.trim();

    setAvatarError("");

    if (!avatar) {
      setAvatarError("Completa el enlace de la imagen.");
      return;
    }

    if (!isValidUrl(avatar)) {
      setAvatarError("Introduce un enlace válido.");
      return;
    }

    handleUpdateAvatar({
      avatar,
    });
  }

  const isAvatarValid =
    avatarValue.trim() !== "" && isValidUrl(avatarValue.trim());

  function handleAvatarChange(event) {
    const value = event.target.value;
    const trimmedValue = value.trim();

    setAvatarValue(value);

    if (!trimmedValue) {
      setAvatarError("Completa el enlace de la imagen.");
    } else if (!isValidUrl(trimmedValue)) {
      setAvatarError("Introduce un enlace válido.");
    } else {
      setAvatarError("");
    }
  }

  return (
    <form
      className="popup__form popup__form_type_avatar"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className={`popup__input popup__input_type_avatar ${
          avatarError ? "popup__input_type_error" : ""
        }`}
        id="avatar-input"
        name="avatar"
        placeholder="Enlace a la imagen"
        required
        ref={avatarRef}
        onChange={handleAvatarChange}
      />
      <span
        className={`popup__input-error avatar-input-error ${
          avatarError ? "popup__error_visible" : ""
        }`}
      >
        {avatarError}
      </span>
      <button
        type="submit"
        className={`popup__button popup__button_type_avatar ${
          !isAvatarValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isAvatarValid}
      >
        Guardar
      </button>{" "}
    </form>
  );
}
