import axios from "axios";
import { store } from "../store";
import { logoutSuccess, updateToken } from "../../features/auth/authSlice";
// import { store } from "../store";
// import { logoutSuccess, updateToken } from "../../features/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.loginAuth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // لو حصل Unauthorized ومحاولناش نعمل refresh قبل كده
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosInstance.post(
          "/api/v1/auth/refresh-token",
          {
            withCredentials: true,
          }
        );

        const { accessToken, accessTokenExpires } = refreshResponse.data;

        // Update Redux store
        store.dispatch(updateToken({ accessToken, accessTokenExpires }));

        // ضيف التوكن الجديد للريكويست اللي فشل وأعيد إرساله
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutSuccess());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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
