import { Link } from "react-router-dom";

const LinksNav = [
  { label: "Home", path: "/" },
  { label: "My Trips", path: "/trips" },
  { label: "About", path: "/about" },
];

interface NavLinksProps {
  onClick?: () => void;
  className?: string;
}
export const NavLinks: React.FC<NavLinksProps> = ({ onClick, className }) => (
  <>
    {LinksNav.map((link, index) => (
      <li key={index}>
        <Link
          className="font-medium text-body-sm"
          to={link.path}
          onClick={onClick}
        >
          <li className={className}>{link.label}</li>
        </Link>
      </li>
    ))}
  </>
);
