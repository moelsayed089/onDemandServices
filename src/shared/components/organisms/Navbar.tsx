import { Link } from "react-router-dom";
import Logo from "../atoms/Logo";
import { Menu, X } from "lucide-react";
import { Button } from "../atoms/Button";
import { useEffect, useRef, useState } from "react";
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
      <nav className="flex items-center justify-between p-4 bg-gray-200">
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
            <Button variant="default" className="hidden md:block">
              <Link className="font-medium text-body-sm" to="/login">
                Login
              </Link>
            </Button>
            <Button variant="secondary" className="hidden md:block">
              <Link className="font-medium text-body-sm " to="/register">
                Register
              </Link>
            </Button>

            {/* <Button variant="secondary" className="hidden lg:block">
            <Link className="font-medium text-body-sm " to="/register">
              Register
            </Link>
          </Button> */}

            <button onClick={toggleOpen} className="font-medium md:hidden">
              <Menu />
            </button>
          </ul>
        </div>

        {/* sidebar responsive nav */}
      </nav>
      <div
        ref={menuRef}
        className={`fixed inset-y-0 right-0 z-50 w-64  bg-[#f1f1f1] p-6 transition-transform duration-300 ease-in-out transform ${
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
            <li className="bg-gray-200 py-3 px-2 rounded-md">
              <Link className="font-medium text-body-sm  " to="/">
                Home
              </Link>
            </li>
            <li className="bg-gray-200 py-3 px-2 rounded-md">
              <Link className="font-medium text-body-sm  " to="/trips">
                My Trips
              </Link>
            </li>
            <li className="bg-gray-200 py-3 px-2 rounded-md">
              <Link className="font-medium text-body-sm " to="/about">
                About
              </Link>
            </li>
            <Button variant="default" className="">
              <Link className="font-medium text-body-sm" to="/login">
                Login
              </Link>
            </Button>
            <Button variant="secondary" className="">
              <Link className="font-medium text-body-sm " to="/register">
                Register
              </Link>
            </Button>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
