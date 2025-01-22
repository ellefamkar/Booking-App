import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getSingleHotel, currectHotel, isCurrentLoading } = useHotels();

  useEffect(() => {
    getSingleHotel(id);
  }, [id]);

  if (isCurrentLoading || !currectHotel) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currectHotel.name}</h2>
        <div>
          {currectHotel.number_of_reviews} reviews &bull; {currectHotel.smart_location}
        </div>
        <img src={currectHotel.xl_picture_url} alt={currectHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
