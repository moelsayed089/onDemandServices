import { Link } from "react-router-dom";
import Logo from "../atoms/Logo";
import { Menu, X } from "lucide-react";
import { Button } from "../atoms/Button";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "../atoms/Avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <>
      <nav className="flex items-center relative z-10 justify-between p-4 bg-white shadow-md">
        <div className="flex items-center gap-8">
          <Logo width="w-16" />
          <ul className="md:flex gap-4 hidden ">
            <li>
              <Link className="font-medium text-body-sm  " to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="font-medium text-body-sm " to="/trips">
                My Trips
              </Link>
            </li>
            <li>
              <Link className="font-medium text-body-sm " to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex gap-4">
            <Link className="font-medium text-body-sm" to="/login">
              <Button
                variant="default"
                className="hidden md:block hover:cursor-pointer"
              >
                Login
              </Button>
            </Link>

            <Link className="font-medium text-body-sm " to="/register">
              <Button
                variant="secondary"
                className="hidden md:block hover:cursor-pointer"
              >
                Register
              </Button>
            </Link>

            {/* <Button variant="secondary" className="hidden lg:block">
            <Link className="font-medium text-body-sm " to="/register">
              Register
            </Link>
          </Button> */}

            <button onClick={toggleOpen} className="font-medium md:hidden">
              <Menu size={30} />
            </button>

            <Link to="/profile">
              <Avatar className="hover:cursor-pointer bg-amber-300 flex items-center justify-center">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn.png"
                />
                <AvatarFallback>MP</AvatarFallback>
              </Avatar>
            </Link>
          </ul>
        </div>
      </nav>

      {/* sidebar responsive nav */}
      {/* <MobileNav isOpen={isOpen} closeMenu={closeMenu} /> */}
      <div
        ref={menuRef}
        className={`fixed inset-y-0 right-0 z-50 w-64  bg-white shadow-md p-6 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0 " : "translate-x-full "
        } lg:hidden`}
      >
        <nav>
          <ul className="flex flex-col gap-4">
            <Button
              onClick={closeMenu}
              variant="destructive"
              className="px-4 py-2 hover:cursor-pointer text-white rounded w-1/4 self-end"
            >
              <X />
            </Button>
            <Link className="font-medium text-body-sm  " to="/">
              <li className="bg-gray-200 py-3 px-2 rounded-md">Home</li>
            </Link>
            <Link className="font-medium text-body-sm  " to="/trips">
              <li className="bg-gray-200 py-3 px-2 rounded-md">My Trips</li>
            </Link>
            <Link className="font-medium text-body-sm " to="/about">
              <li className="bg-gray-200 py-3 px-2 rounded-md">About</li>
            </Link>

            <Link className="font-medium text-body-sm" to="/login">
              <Button variant="default" className="w-full">
                Login
              </Button>
            </Link>
            <Link className="font-medium text-body-sm " to="/register">
              <Button variant="secondary" className="w-full">
                Register
              </Button>
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
