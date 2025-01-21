import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer"></div>
    </div>
  )
}

export default AppLayout
