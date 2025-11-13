import { useEffect, useState, useRef } from "react";
import { usePutMutation } from "../../../app/api/usePutMutation";
import toast from "react-hot-toast";

const DriverStatusManager = () => {
  const { mutate: updateAvailability } = usePutMutation(
    "/api/v1/drivers/availability"
  );
  const { mutate: updateLocation } = usePutMutation("/api/v1/drivers/location");

  const [isOnline, setIsOnline] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<[number, number] | null>(
    null
  );
  const watchIdRef = useRef<number | null>(null);

  const goOnline = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setCurrentCoords(coords);

        updateAvailability(
          { isAvailable: true, coordinates: coords },
          {
            onSuccess: () => {
              toast.success("Driver is now online", {
                position: "bottom-right",
              });
              setIsOnline(true);
              watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                  const newCoords: [number, number] = [
                    position.coords.latitude,
                    position.coords.longitude,
                  ];
                  setCurrentCoords(newCoords);
                  updateLocation({ coordinates: newCoords });
                  console.log("📍 Updated location:", newCoords);
                },
                (err) => console.error("❌ Location watch error:", err),
                { enableHighAccuracy: true, maximumAge: 0 }
              );
            },
          }
        );
      },
      (error) => console.error("❌ Geolocation error:", error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const goOffline = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    updateAvailability(
      { isAvailable: false },
      {
        onSuccess: () => {
          toast.success("Driver is now offline", { position: "bottom-right" });
          setIsOnline(false);
          setCurrentCoords(null);
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white shadow-lg rounded-2xl w-[400px] mx-auto mt-10">
      <h2 className="text-2xl font-medium">Driver Dashboard</h2>

      <div className="flex items-center gap-3">
        <span
          className={`w-3 h-3 rounded-full ${
            isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"
          }`}
        ></span>
        <span className="text-lg font-medium">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {currentCoords && (
        <div className="text-sm text-gray-600 flex items-center justify-between gap-2">
          📍 Lat: {currentCoords[0].toFixed(6)} <br />
          📍 Lng: {currentCoords[1].toFixed(6)}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={goOnline}
          disabled={isOnline}
          className={`px-5 py-2 rounded-lg font-semibold ${
            isOnline
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Go Online
        </button>

        <button
          onClick={goOffline}
          disabled={!isOnline}
          className={`px-5 py-2 rounded-lg font-semibold ${
            !isOnline
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Go Offline
        </button>
      </div>
    </div>
  );
};

export default DriverStatusManager;
