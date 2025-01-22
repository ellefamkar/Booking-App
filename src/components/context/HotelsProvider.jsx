import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext();

const BASE_URL = "http://localhost:5000/hotels";

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  //   const {isLoading , data} = useFetch(
  //     "http://localhost:5000/hotels",
  //     `accomodation_like=${destination || ""}&name_like=${destination || ""}&accomodate_gte=${room || ""}`
  //   )

  const [currectHotel, setCurrentHotel] = useState({});
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);

  async function getSingleHotel(id) {
    try {
      setIsCurrentLoading(true);
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsCurrentLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsCurrentLoading(false);
    }
  }

  return (
    <HotelsContext.Provider
      value={{
        isLoading,
        hotels,
        getSingleHotel,
        currectHotel,
        isCurrentLoading,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
