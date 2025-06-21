import { DropdownMenu } from "../molecules/DropdownMenu";
import { Avatar } from "../atoms/Avatar";
import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../features/auth/authSlice";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
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
        <DropdownMenu.Item onClick={handleLogout}>Logout</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
