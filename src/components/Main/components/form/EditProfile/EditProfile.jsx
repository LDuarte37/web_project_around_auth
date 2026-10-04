import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || "");
  const [description, setDescription] = useState(currentUser.about || "");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  function handleNameChange(event) {
    const value = event.target.value;
    const trimmedValue = value.trim();

    setName(value);

    if (!trimmedValue) {
      setNameError("Completa el nombre.");
    } else if (trimmedValue.length < 2) {
      setNameError("El nombre debe tener al menos 2 caracteres.");
    } else if (trimmedValue.length > 40) {
      setNameError("El nombre no puede superar los 40 caracteres.");
    } else {
      setNameError("");
    }
  }

  function handleDescriptionChange(event) {
    const value = event.target.value;
    const trimmedValue = value.trim();

    setDescription(value);

    if (!trimmedValue) {
      setDescriptionError("Completa la descripción.");
    } else if (trimmedValue.length < 2) {
      setDescriptionError("La descripción debe tener al menos 2 caracteres.");
    } else if (trimmedValue.length > 200) {
      setDescriptionError(
        "La descripción no puede superar los 200 caracteres.",
      );
    } else {
      setDescriptionError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    let isValid = true;

    setNameError("");
    setDescriptionError("");

    if (!trimmedName) {
      setNameError("Completa el nombre.");
      isValid = false;
    } else if (trimmedName.length < 2) {
      setNameError("El nombre debe tener al menos 2 caracteres.");
      isValid = false;
    } else if (trimmedName.length > 40) {
      setNameError("El nombre no puede superar los 40 caracteres.");
      isValid = false;
    }

    if (!trimmedDescription) {
      setDescriptionError("Completa la descripción.");
      isValid = false;
    } else if (trimmedDescription.length < 2) {
      setDescriptionError("La descripción debe tener al menos 2 caracteres.");
      isValid = false;
    } else if (trimmedDescription.length > 200) {
      setDescriptionError(
        "La descripción no puede superar los 200 caracteres.",
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    handleUpdateUser({
      name: trimmedName,
      about: trimmedDescription,
    });
  }

  const isNameValid = name.trim().length >= 2 && name.trim().length <= 40;

  const isDescriptionValid =
    description.trim().length >= 2 && description.trim().length <= 200;

  const isFormValid = isNameValid && isDescriptionValid;

  return (
    <form
      className="popup__form"
      id="edit-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={`popup__input ${nameError ? "popup__input_type_error" : ""}`}
        id="name-input"
        name="name"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span
        className={`popup__input-error name-input-error ${
          nameError ? "popup__error_visible" : ""
        }`}
      >
        {nameError}
      </span>
      <input
        type="text"
        className={`popup__input ${
          descriptionError ? "popup__input_type_error" : ""
        }`}
        id="job-input"
        name="about"
        placeholder="Acerca de mí"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span
        className={`popup__input-error job-input-error ${
          descriptionError ? "popup__error_visible" : ""
        }`}
      >
        {descriptionError}
      </span>
      <button
        type="submit"
        className={`popup__button ${
          !isFormValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isFormValid}
      >
        Guardar
      </button>{" "}
    </form>
  );
}
