import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import axiosInstance from "../app/api/axiosConfig";
import { updateToken } from "../features/auth/authSlice";

const TokenRefresher = () => {
  const dispatch = useDispatch();

  const accessTokenExpires = useSelector(
    (state: RootState) => state.loginAuth.accessTokenExpires
  );

  const handleRefreshToken = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/refresh-token",
        null,
        { withCredentials: true }
      );

      const { accessToken, accessTokenExpires } = response.data;

      console.log("Token refreshed:", response.data);

      dispatch(updateToken({ accessToken, accessTokenExpires }));
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    if (!accessTokenExpires) return;

    const expiresAt = new Date(accessTokenExpires).getTime();
    const now = new Date().getTime();

    const timeRemaining = expiresAt - now;
    const refreshBefore = 2 * 60 * 1000; // دقيقتين = 120000ms

    const refreshIn = timeRemaining - refreshBefore;

    const totalSeconds = Math.floor(timeRemaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    console.log(
      `⌛ الوقت المتبقي لانتهاء التوكن: ${minutes} دقيقة و ${seconds} ثانية`
    );

    if (refreshIn <= 0) {
      // التوكن قرب يخلص أو خلص بالفعل
      handleRefreshToken();
      return;
    }

    const timer = setTimeout(() => {
      handleRefreshToken();
    }, refreshIn);

    return () => clearTimeout(timer);
  }, [accessTokenExpires]);

  return null;
};

export default TokenRefresher;
