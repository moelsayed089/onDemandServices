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

export default axiosInstance;
