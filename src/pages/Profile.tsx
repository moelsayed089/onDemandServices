import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../app/api/axiosConfig";
import { updateToken } from "../features/auth/authSlice";

const TokenRefresher = () => {
  const dispatch = useDispatch();

  const handleRefreshToken = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/refresh-token",
        null,
        {
          withCredentials: true,
        }
      );

      const { accessToken, accessTokenExpires } = response.data;

      console.log("Token refreshed:", response.data);

      // Update the token in Redux
      dispatch(updateToken({ accessToken, accessTokenExpires }));
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefreshToken();
    }, 60000); // 60000ms = 1 دقيقة

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return null; // هذا الكمبوننت فقط للتحديث، مش بيعرض حاجة
};

export default TokenRefresher;
