import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../../shared/components/atoms/Logo";

const RooyLayout = () => {
  const location = useLocation();
  const isLogin =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!isLogin && (
        <nav className="flex items-center p-4 bg-gray-200">
          <div className="mr-5">
            <Logo width="w-16" />
          </div>
          <ul className="flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      )}
      <Outlet />
    </>
  );
};

export default RooyLayout;
