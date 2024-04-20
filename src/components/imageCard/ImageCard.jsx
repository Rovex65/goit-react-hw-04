import css from "./ImageCard.module.css";

function ImageCard({ photo, descr }) {
  return (
    <div className={css.card}>
      <img src={photo} alt={descr} />
    </div>
  );
}

export default ImageCard;
