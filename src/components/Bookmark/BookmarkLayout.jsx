import Map from "../Map/Map";

function BookmarkLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        {/* <Outlet /> */}
        <p>Bookmark list</p>
      </div>
      <Map markerLocations={[]}/>
    </div>
  );
}

export default BookmarkLayout;

// [] ==> bookmark list ==> global state 