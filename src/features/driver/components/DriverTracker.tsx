import { useEffect } from "react";
import { useUpdateDriverLocation } from "../hooks/useUpdateDriverLocation";

const DriverTracker = () => {
  const { mutate: updateLocation } = useUpdateDriverLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("📍 Current location:", latitude, longitude);
            updateLocation({ coordinates: [latitude, longitude] });
          },
          (error) => {
            console.error("❌ Error getting location:", error);
          }
        );
      } else {
        console.warn("⚠️ Geolocation not supported in this browser");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [updateLocation]);

  return <div>Tracking driver location...</div>;
};

export default DriverTracker;
