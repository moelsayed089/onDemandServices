import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import axiosInstance from "../app/api/axiosConfig";
// import Cookies from "js-cookie";

const Profile = () => {
  const accessToken = useSelector(
    (state: RootState) => state.loginAuth.accessToken
  );
  console.log(accessToken);

  // const tokenFromCookie = Cookies.get("refreshToken");
  // console.log("refresh Token from Cookie:", tokenFromCookie);
  const handleRefreshToken = async () => {
    try {
      // const accessToken = Cookies.get("refreshToken");

      // if (!accessToken) {
      //   console.error("No refresh token found!");
      //   return;
      // }

      const response = await axiosInstance.post("/api/v1/auth/refresh-token", {
        withCredentials: true,
      });

      console.log(" Token refreshed:", response.data);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return (
    <div>
      <button onClick={handleRefreshToken}>Refresh Token</button>
    </div>
  );
};

export default Profile;
