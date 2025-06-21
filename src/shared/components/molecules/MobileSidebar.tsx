import { Button } from "../atoms/Button";
import { X } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";

interface MobileSidebarProps {
  isOpen: boolean;
  closeMenu: () => void;
  isLoggedIn: boolean;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
}
export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  closeMenu,
  isLoggedIn,
  sidebarRef,
}) => (
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

        <NavLinks
          onClick={closeMenu}
          className="bg-gray-200 py-3 px-2 rounded-md"
        />

        {!isLoggedIn && <AuthButtons onClick={closeMenu} />}
      </ul>
    </nav>
  </div>
);
