import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptors

export default axiosInstance;
