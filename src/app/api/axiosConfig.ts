import axios from "axios";
// import { store } from "../store";
// import { logoutSuccess, updateToken } from "../../features/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem("accessToken");
//     const tokenExpires = localStorage.getItem("accessTokenExpires");
//     const now = new Date();

//     if (token && tokenExpires && new Date(tokenExpires) <= now) {
//       try {
//         // هنا نستخدم axios العادي مش instance عشان منضفش interceptor عليه
//         const response = await axios.post(
//           "/api/v1/auth/refresh-token",
//           {},
//           {
//             baseURL: import.meta.env.VITE_BASE_URL,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const newAccessToken = response.data.accessToken;
//         const newExpires = response.data.accessTokenExpires;

//         console.log("Refreshing token...");
//         console.log("New Access Token:", newAccessToken);
//         console.log("New Access Token Expires:", newExpires);

//         store.dispatch(
//           updateToken({
//             accessToken: newAccessToken,
//             accessTokenExpires: newExpires,
//           })
//         );

//         config.headers.Authorization = `Bearer ${newAccessToken}`;
//       } catch (err) {
//         store.dispatch(logoutSuccess());
//         return Promise.reject(err);
//       }
//     } else if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
