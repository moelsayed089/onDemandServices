import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

interface StarterCheckIsLogginProps {
  variant?:
    | "default"
    | "outline"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}
const StarterCheckIsLoggin: React.FC<StarterCheckIsLogginProps> = ({
  variant = "default",
  className,
}) => {
  const accessToken = localStorage.getItem("accessToken");
  const accessTokenExpires = localStorage.getItem("accessTokenExpires");

  const isAccessTokenValid = () => {
    if (!accessToken || !accessTokenExpires) return false;
    return new Date() < new Date(accessTokenExpires);
  };

  const isLoggedIn = isAccessTokenValid();

  return (
    <Link to={isLoggedIn ? "/start" : "/register"}>
      <Button
        variant={variant}
        className={`py-5 w-[200px] mx-auto ${className} text-body-md hover:cursor-pointer mb-[50px]`}
      >
        Start Now
      </Button>
    </Link>
  );
};

export default StarterCheckIsLoggin;
