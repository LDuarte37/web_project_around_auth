export default function ImagePopup(props) {
  const { name, link } = props.card;

  return (
    <figure className="popup__image-container">
      <img
        src={link}
        alt={name}
        className="popup__image"
      />

      <figcaption className="popup__caption">
        {name}
      </figcaption>
    </figure>
  );
}