import { useState } from "react"

export default function useGeoLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState([]);
    const [error, setError] = useState(null);

    function getPosition(){

        if(!navigator.geolocation) return setError("Your browser does not support Geolocation")
        
            setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lng : position.coords.longitude
                });
                setIsLoading(false);
                            },
             (error) => {
                setError(error.message);
                setIsLoading(false);
             })
    }

    return {isLoading, error, position, getPosition}
}