import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

const ProtectedLayout = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = useSelector((state: RootState) => state.loginAuth.accessToken);
  const role = useSelector((state: RootState) => state.loginAuth.role);

  if (!token) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role || ""))
    return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
