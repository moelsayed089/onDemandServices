import axiosInstance from "../app/api/axiosConfig";
// import Cookies from "js-cookie";

const Profile = () => {
  const handleRefreshToken = async () => {
    try {
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
