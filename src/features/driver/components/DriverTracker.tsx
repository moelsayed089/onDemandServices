// import { useEffect } from "react";

// const DriverTracker = () => {
//   const { mutate: updateLocation } = useUpdateDriverLocation();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             console.log("✅ Got location:", latitude, longitude);
//             updateLocation({ coordinates: [latitude, longitude] });
//           },
//           (error) => {
//             console.error("❌ Error getting location:", error);

//             if (error.code === 2) {
//               const fallback = { latitude: 30.0444, longitude: 31.2357 };
//               console.warn("⚠️ Using fallback location:", fallback);
//               updateLocation({
//                 coordinates: [fallback.latitude, fallback.longitude],
//               });
//             }
//           },
//           { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//         );
//       } else {
//         console.warn("⚠️ Geolocation not supported in this browser");
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [updateLocation]);

//   return <div>Tracking driver location...</div>;
// };

// export default DriverTracker;
