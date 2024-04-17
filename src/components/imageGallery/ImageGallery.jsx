import ImageCard from "../imageCard/ImageCard";

function ImageGallery({ images }) {
  return (
    <ul>
      {images.map((image) => {
        return (
          <li key={image.id}>
            <ImageCard
              photo={image.urls.small}
              descr={image.alt_description}
            ></ImageCard>
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
