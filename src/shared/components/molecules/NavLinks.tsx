import { Link } from "react-router-dom";

const LinksNav = [
  { label: "Home", path: "/" },
  { label: "My Trips", path: "/trips", requiresAuth: true },
  { label: "About", path: "/about" },
];

interface NavLinksProps {
  onClick?: () => void;
  className?: string;
  isLoggedIn?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  onClick,
  className,
  isLoggedIn,
}) => {
  const filteredLinks = LinksNav.filter(
    (link) => !link.requiresAuth || isLoggedIn
  );

  return (
    <>
      {filteredLinks.map((link, index) => (
        <li key={index} className={className}>
          <Link
            className="font-medium text-body-md hover:text-main-color "
            to={link.path}
            onClick={onClick}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
};
