import Map from "../Map/Map";

function Bookmark() {
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

export default Bookmark;

// [] ==> bookmark list ==> global state 