import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkProvider from "./components/context/BookmarkProvider";
import Bookmark from "./components/Bookmark/Bookmark";

function App() {
  return (
    <BookmarkProvider>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout />}>
            <Route index element={<Bookmark />} />
            <Route path=":id" element={<div>Bookmarks id</div>} />
            <Route path="add" element={<div>Bookmarks one</div>} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookmarkProvider>
  );
}
export default App;

/*-- list of bookmark
---- bookmark/add --> add new bookamrk(location which is a form) */
