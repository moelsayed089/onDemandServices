import { Link, useNavigate } from "react-router-dom";
import Logo from "../atoms/Logo";
import { Menu, X } from "lucide-react";
import { Button } from "../atoms/Button";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "../atoms/Avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu } from "../molecules/DropdownMenu";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../features/auth/authSlice";
import { isAccessTokenValid } from "../../../utils/isAccessTokenValid";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isLoggedIn = isAccessTokenValid();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center relative z-10 justify-between p-4 bg-white shadow-md">
        <div className="flex items-center gap-8">
          <Logo width="w-16" />
          <ul className="md:flex gap-4 hidden">
            <li>
              <Link className="font-medium text-body-sm" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="font-medium text-body-sm" to="/trips">
                My Trips
              </Link>
            </li>
            <li>
              <Link className="font-medium text-body-sm" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex gap-4 items-center">
            {!isLoggedIn && (
              <>
                <Button asChild className="hidden md:block">
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="secondary" asChild className="hidden md:block">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}

            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenu.Trigger>
                  <Avatar className="hover:cursor-pointer bg-gray-200 flex items-center justify-center">
                    <AvatarImage
                      src="https://www.gravatar.com/avatar/"
                      alt="@shadcn.png"
                    />
                    <AvatarFallback>MP</AvatarFallback>
                  </Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={handleLogout}>
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            )}

            <button onClick={toggleOpen} className="font-medium md:hidden">
              <Menu size={30} />
            </button>
          </ul>
        </div>
      </nav>

      {/* Sidebar mobile menu */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-md p-6 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <nav>
          <ul className="flex flex-col gap-4">
            <Button
              onClick={closeMenu}
              variant="destructive"
              className="px-4 py-2 text-white rounded w-1/4 self-end"
            >
              <X />
            </Button>

            {["Home", "My Trips", "About"].map((label, i) => (
              <Link
                key={i}
                to={
                  label === "Home"
                    ? "/"
                    : `/${label.toLowerCase().replace(" ", "")}`
                }
                onClick={closeMenu}
                className="font-medium text-body-sm"
              >
                <li className="bg-gray-200 py-3 px-2 rounded-md">{label}</li>
              </Link>
            ))}

            {!isLoggedIn && (
              <>
                <Button asChild className="w-full" onClick={closeMenu}>
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                  className="w-full"
                  onClick={closeMenu}
                >
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
