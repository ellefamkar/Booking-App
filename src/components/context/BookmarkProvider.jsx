import { createContext, useContext, useEffect, useState } from "react";
// import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();

const BASE_URL = "http://localhost:5000";

function BookmarkProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  //   const {isLoading , data} = useFetch(
  //     "http://localhost:5000/hotels",
  //     `accomodation_like=${destination || ""}&name_like=${destination || ""}&accomodate_gte=${room || ""}`
  //   )

  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    try {
      setIsLoading(true);
      setCurrentBookmark(null);
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createBookmark(newBookmark) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      setCurrentBookmark(data);
      setBookmarks(prev => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBookmark(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks(prev => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
        createBookmark,
        deleteBookmark
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}


// reducer function is a pure function 