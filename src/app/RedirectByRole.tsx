import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";


const RedirectByRole = () => {
  const role = useSelector((state: RootState) => state.loginAuth.role);

  if (role === "superAdmin") return <Navigate to="/admin" replace />;
  if (role === "driver") return <Navigate to="/driver" replace />;
  if (role === "customer") return <Navigate to="/home" replace />;

  return <Navigate to="/login" replace />;
};

export default RedirectByRole;
