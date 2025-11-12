import { useDispatch } from "react-redux";
import axiosInstance from "../app/api/axiosConfig";
import { updateToken } from "../features/auth/authSlice";

const Test = () => {
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
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("accessTokenExpires", accessTokenExpires);
      dispatch(updateToken({ accessToken, accessTokenExpires }));
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };
  return (
    <>
      <button onClick={handleRefreshToken}>TokenRefresher</button>
    </>
  );
};

export default Test;
