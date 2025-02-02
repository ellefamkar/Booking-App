import { useNavigate } from "react-router-dom";
import useUrlParams from "../../hooks/useUrlParams";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkProvider";

const BASE_GEOCODING_URL = "https://api-bdc.net/data/reverse-geocode-client";

// function getFlagEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlParams();
  console.log(lat, lng);

  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);

  const { createBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError(null);
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "This location is not available! Please choose a location."
          );
        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);

  // form => cityName, CountQueuingStrategy
  // lat and lng => url => fetch api based on lat and lng => get location DAta

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !countryName) return;

    const newBookmark = {
      cityName,
      country: countryName,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + countryName,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark")
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <strong>{geoCodingError}</strong>;

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.value.target)}
            type="text"
            name="cityName"
            id="cityName"
            placeholder="City"
          />
          {/* <span className="flag">{countryCode}</span> */}
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="formControl">
          <label htmlFor="country">City Name</label>
          <input
            value={countryName}
            onChange={(e) => setCountryName(e.value.target)}
            type="text"
            name="country"
            id="country"
            placeholder="Country"
          />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
