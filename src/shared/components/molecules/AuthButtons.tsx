import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

interface AuthButtonsProps {
  onClick?: () => void;
  className?: string;
}
export const AuthButtons: React.FC<AuthButtonsProps> = ({
  onClick,
  className,
}) => (
  <>
    <Button asChild className={className} onClick={onClick}>
      <Link to="/login">Login</Link>
    </Button>
    <Button variant="secondary" asChild className={className} onClick={onClick}>
      <Link to="/register">Register</Link>
    </Button>
  </>
);
