import { createBrowserRouter } from "react-router-dom";
import RooyLayout from "./Layout/RooyLayout";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ConfirmEmail from "../features/auth/pages/ConfirmEmail";
import ResendEmail from "../features/auth/pages/ResendEmail";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RooyLayout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/user",
        element: <div>User</div>,
      },
      {
        path: "/driver",
        element: <div>Driver</div>,
      },
      {
        path: "/admin",
        element: <div>Admin</div>,
      },
      {
        path: "/confirmemail",
        element: <ConfirmEmail />,
      },
      {
        path: "/resendemail",
        element: <ResendEmail />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
