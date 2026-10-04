import "./InfoTooltip.css";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="info-tooltip">
      <div className="info-tooltip__overlay" onClick={onClose} />

      <div className="info-tooltip__container">
        <button
          className="info-tooltip__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? "info-tooltip__icon_success"
              : "info-tooltip__icon_error"
          }`}
        >
          {isSuccess ? "✓" : "×"}
        </div>

        <p className="info-tooltip__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;