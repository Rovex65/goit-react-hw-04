import SearchBar from "../searchBar/SearchBar";
import ImageGallery from "../imageGallery/ImageGallery";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import LoadMoreBtn from "../loadMoreBtn/LoadMoreBtn";

import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { fetchImagesWithQuery } from "/src/images-api.js";
import "./App.module.css";

function App() {
  const [query, setQuery] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [showBtn, setShowBtn] = useState(false);

  function onSearch(query) {
    setQuery(query);
    setImages([]);
    setPage(1);
  }

  function onLoadMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    async function fetchImages() {
      if (!query) {
        return;
      }
      if (page === maxPage) {
        setShowBtn(false);
        console.log(page, maxPage);
        toast.error("No images more");
        return;
      }

      try {
        setLoading(true);
        const data = await fetchImagesWithQuery(query, page);
        setMaxPage(data.total_pages);
        setImages([...images, ...data.results]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setShowBtn(true);
      }
    }
    fetchImages();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={onSearch} />
      {images.length > 0 && <ImageGallery images={images}></ImageGallery>}
      {loading && <Loader />}
      {showBtn && <LoadMoreBtn onLoadMore={onLoadMore} />}
      {error && <ErrorMessage error={error} />}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
