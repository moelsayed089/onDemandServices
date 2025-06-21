import { useEffect, useRef, useState } from "react";
import { isAccessTokenValid } from "../../../utils/isAccessTokenValid";
import Logo from "../atoms/Logo";
import { NavLinks } from "../molecules/NavLinks";
import { AuthButtons } from "../molecules/AuthButtons";
import { Button } from "../atoms/Button";
import { UserMenu } from "../molecules/UserMenu";
import { Menu } from "lucide-react";
import { MobileSidebar } from "../molecules/MobileSidebar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = isAccessTokenValid();

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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

  return (
    <>
      <nav className="flex items-center relative z-10 justify-between p-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <Logo width="w-32" />
          <ul className="md:flex gap-4 hidden ">
            <NavLinks />
          </ul>
        </div>

        <div>
          <ul className="flex gap-4 items-center">
            {!isLoggedIn && <AuthButtons className="hidden md:block" />}
            {isLoggedIn && <UserMenu />}
            <Button
              variant={"ghost"}
              onClick={toggleOpen}
              className="font-medium md:hidden"
            >
              <Menu size={30} />
            </Button>
          </ul>
        </div>
      </nav>

      <MobileSidebar
        isOpen={isOpen}
        closeMenu={closeMenu}
        isLoggedIn={isLoggedIn}
        sidebarRef={sidebarRef}
      />
    </>
  );
};

export default Navbar;
