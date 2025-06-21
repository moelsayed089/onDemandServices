const accessToken = localStorage.getItem("accessToken");
const accessTokenExpires = localStorage.getItem("accessTokenExpires");

export const isAccessTokenValid = () => {
  if (!accessToken || !accessTokenExpires) return false;
  return new Date() < new Date(accessTokenExpires);
};
