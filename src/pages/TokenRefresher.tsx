import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { socketManager } from "../app/api/socketManager";

const TokenRefresher = () => {
  const accessToken = useSelector(
    (state: RootState) => state.loginAuth.accessToken
  );

  useEffect(() => {
    if (accessToken && socketManager.isConnected()) {
      console.log("🔄 Updating socket authentication token...");
      socketManager.updateToken(accessToken);
    }
  }, [accessToken]);

  return null;
};

export default TokenRefresher;
