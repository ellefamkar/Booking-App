import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, currentBookmark, isLoadingCurrentBookmark } =
    useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="btn btn--back"
        style={{ marginBottom: "1rem" }}
      >
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
