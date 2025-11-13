/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { usePutMutation } from "../../../app/api/usePutMutation";
import toast from "react-hot-toast";

const DriverStatusManager = () => {
  const { mutate: updateAvailability, isPending: isUpdatingStatus } =
    usePutMutation("/api/v1/drivers/availability");
  const { mutate: updateLocation } = usePutMutation("/api/v1/drivers/location");

  const [isOnline, setIsOnline] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<[number, number] | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Default fallback location (Cairo, Egypt)
  const DEFAULT_LOCATION: [number, number] = [30.0444, 31.2357]; // [lat, lng]

  const goOnline = () => {
    setLocationError(null);

    // ✅ Check if geolocation is supported
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser", {
        position: "bottom-right",
      });
      setLocationError("Geolocation not supported");
      return;
    }

    // ✅ Try to get current location
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setCurrentCoords(coords);
        console.log("✅ Got GPS location:", coords);

        // Update availability with real GPS coordinates
        updateDriverAvailability(coords, true);
      },
      // Error callback
      (error) => {
        console.warn("⚠️ GPS Error:", error.message);

        let errorMessage = "Failed to get location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Using default location.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable. Using default location.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timeout. Using default location.";
            break;
        }

        setLocationError(errorMessage);

        toast.error(errorMessage, {
          position: "bottom-right",
          duration: 4000,
        });

        // ✅ Use default location as fallback
        setCurrentCoords(DEFAULT_LOCATION);
        console.log("📍 Using default location:", DEFAULT_LOCATION);
        updateDriverAvailability(DEFAULT_LOCATION, false);
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const updateDriverAvailability = (
    coords: [number, number],
    startTracking: boolean
  ) => {
    updateAvailability(
      { isAvailable: true, coordinates: coords },
      {
        onSuccess: () => {
          console.log("✅ Driver is now online with location:", coords);
          setIsOnline(true);
          toast.success("You are now online!", {
            position: "bottom-right",
          });

          // ✅ Start location tracking only if GPS is available
          if (startTracking) {
            startLocationTracking();
          } else {
            // Use interval for fallback location updates
            startFallbackLocationUpdates();
          }
        },
        onError: (error: any) => {
          console.error("❌ Failed to go online:", error);
          const errorMsg =
            error?.response?.data?.message ||
            "Failed to go online. Please try again.";
          toast.error(errorMsg, {
            position: "bottom-right",
          });
        },
      }
    );
  };

  const startLocationTracking = () => {
    console.log("📍 Starting GPS tracking...");

    // ✅ Watch position for real-time updates
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newCoords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setCurrentCoords(newCoords);
        console.log("📍 GPS Location updated:", newCoords);
      },
      (err) => {
        console.error("❌ Watch position error:", err);
        // Fallback to default location
        setCurrentCoords(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    // ✅ Send location to server every 10 seconds
    locationIntervalRef.current = setInterval(() => {
      if (currentCoords) {
        sendLocationToServer(currentCoords);
      }
    }, 10000);
  };

  const startFallbackLocationUpdates = () => {
    console.log("📍 Using fallback location updates...");

    // Send default location every 10 seconds
    locationIntervalRef.current = setInterval(() => {
      if (currentCoords) {
        sendLocationToServer(currentCoords);
      }
    }, 10000);
  };

  const sendLocationToServer = (coords: [number, number]) => {
    updateLocation(
      { coordinates: coords },
      {
        onSuccess: () => {
          console.log("✅ Location sent to server:", coords);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          console.error("❌ Failed to send location:", error);
        },
      }
    );
  };

  const goOffline = () => {
    // ✅ Stop location tracking
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
      locationIntervalRef.current = null;
    }

    // ✅ Update availability to offline
    updateAvailability(
      { isAvailable: false },
      {
        onSuccess: () => {
          console.log("🛑 Driver is now offline");
          setIsOnline(false);
          setCurrentCoords(null);
          setLocationError(null);
          toast.success("You are now offline", {
            position: "bottom-right",
          });
        },
        onError: (error: any) => {
          console.error("❌ Failed to go offline:", error);
          toast.error("Failed to go offline. Please try again.", {
            position: "bottom-right",
          });
        },
      }
    );
  };

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, []);

  // ✅ Send location when coords change
  useEffect(() => {
    if (isOnline && currentCoords) {
      sendLocationToServer(currentCoords);
    }
  }, [currentCoords, isOnline]);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white shadow-lg rounded-2xl max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold">🚗 Driver Dashboard</h2>

      {/* Status Indicator */}
      <div className="flex items-center gap-3">
        <span
          className={`w-4 h-4 rounded-full ${
            isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"
          }`}
        ></span>
        <span className="text-lg font-medium">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Location Error */}
      {locationError && (
        <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">⚠️ {locationError}</p>
        </div>
      )}

      {/* Current Location */}
      {currentCoords && (
        <div className="text-sm text-gray-600 bg-gray-100 p-4 rounded-lg w-full">
          <p className="font-semibold mb-2">📍 Current Location:</p>
          <p>Latitude: {currentCoords[0].toFixed(6)}</p>
          <p>Longitude: {currentCoords[1].toFixed(6)}</p>
          {locationError && (
            <p className="text-xs text-yellow-600 mt-2">
              (Using default location)
            </p>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4 w-full">
        <button
          onClick={goOnline}
          disabled={isOnline || isUpdatingStatus}
          className={`flex-1 px-5 py-3 rounded-lg font-semibold transition-all ${
            isOnline || isUpdatingStatus
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 active:scale-95"
          }`}
        >
          {isUpdatingStatus ? "⏳ Loading..." : "Go Online 🚀"}
        </button>

        <button
          onClick={goOffline}
          disabled={!isOnline || isUpdatingStatus}
          className={`flex-1 px-5 py-3 rounded-lg font-semibold transition-all ${
            !isOnline || isUpdatingStatus
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600 active:scale-95"
          }`}
        >
          {isUpdatingStatus ? "⏳ Loading..." : "Go Offline 💤"}
        </button>
      </div>

      {/* Status Info */}
      {isOnline && (
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>📡 Location updates every 10 seconds</p>
          {!locationError && (
            <p className="text-green-600">✅ GPS tracking active</p>
          )}
        </div>
      )}

      {/* Instructions */}
      {!isOnline && (
        <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800 font-medium mb-2">
            📱 To enable GPS:
          </p>
          <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
            <li>Allow location access in your browser</li>
            <li>Enable location services on your device</li>
            <li>Refresh the page if needed</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DriverStatusManager;
