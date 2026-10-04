export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <div className="overlay">
      <div className={`popup ${!title ? "popup_type_image" : ""}`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>

        {title && <h2 className="popup__title">{title}</h2>}

        {children}
      </div>
    </div>
  );
}