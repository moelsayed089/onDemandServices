import { Link } from "react-router-dom";
import Logo from "../atoms/Logo";
import { Menu } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-200">
      <div className="flex items-center gap-8">
        <Logo width="w-16" />
        <ul className="flex gap-4">
          <li>
            <Link className="font-medium" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="font-medium" to="/trips">
              My Trips
            </Link>
          </li>
          <li>
            <Link className="font-medium" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <ul className="flex gap-4">
          <li>
            <Link className="font-medium hidden lg:block" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="font-medium hidden lg:block" to="/register">
              Register
            </Link>
          </li>
          <button className="font-medium lg:hidden">
            <Menu />
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
