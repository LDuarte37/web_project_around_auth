import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  function handleNameChange(event) {
    const value = event.target.value;
    const trimmedValue = value.trim();

    setName(value);

    if (!trimmedValue) {
      setNameError("Completa el título.");
    } else if (trimmedValue.length < 2) {
      setNameError("El título debe tener al menos 2 caracteres.");
    } else {
      setNameError("");
    }
  }

  function handleLinkChange(event) {
    const value = event.target.value;
    const trimmedValue = value.trim();

    setLink(value);

    if (!trimmedValue) {
      setLinkError("Completa el enlace de la imagen.");
    } else if (!isValidUrl(trimmedValue)) {
      setLinkError("Introduce un enlace válido.");
    } else {
      setLinkError("");
    }
  }

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

    const trimmedName = name.trim();
    const trimmedLink = link.trim();

    let isValid = true;

    setNameError("");
    setLinkError("");

    if (!trimmedName) {
      setNameError("Completa el título.");
      isValid = false;
    } else if (trimmedName.length < 2) {
      setNameError("El título debe tener al menos 2 caracteres.");
      isValid = false;
    }

    if (!trimmedLink) {
      setLinkError("Completa el enlace de la imagen.");
      isValid = false;
    } else if (!isValidUrl(trimmedLink)) {
      setLinkError("Introduce un enlace válido.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    onAddPlaceSubmit({
      name: trimmedName,
      link: trimmedLink,
    });
  }

  const isNameValid = name.trim().length >= 2 && name.trim().length <= 30;

  const isLinkValid = link.trim() !== "" && isValidUrl(link.trim());

  const isFormValid = isNameValid && isLinkValid;

  return (
    <form
      className="popup__form"
      id="add-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      {" "}
      <input
        type="text"
        className={`popup__input ${nameError ? "popup__input_type_error" : ""}`}
        id="card-name-input"
        name="name"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span
        className={`popup__input-error card-name-input-error ${
          nameError ? "popup__error_visible" : ""
        }`}
      >
        {nameError}
      </span>{" "}
      <input
        type="url"
        className={`popup__input ${linkError ? "popup__input_type_error" : ""}`}
        id="card-link-input"
        name="link"
        placeholder="Enlace de la imagen"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span
        className={`popup__input-error card-link-input-error ${
          linkError ? "popup__error_visible" : ""
        }`}
      >
        {linkError}
      </span>{" "}
      <button
        type="submit"
        className={`popup__button ${
          !isFormValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isFormValid}
      >
        Crear
      </button>{" "}
    </form>
  );
}
