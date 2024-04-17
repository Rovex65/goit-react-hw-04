function ImageCard({ photo, descr }) {
  return (
    <div>
      <img src={photo} alt={descr} />
    </div>
  );
}

export default ImageCard;
