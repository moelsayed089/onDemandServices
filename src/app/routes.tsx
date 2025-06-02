import { createBrowserRouter } from "react-router-dom";
import RooyLayout from "./Layout/RooyLayout";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ConfirmEmail from "../features/auth/pages/ConfirmEmail";
import ResendEmail from "../features/auth/pages/ResendEmail";
import Profile from "../pages/Profile";
import { ForgetPassword } from "../features/auth/pages/ForgetPassword";
import ResetCode from "../features/auth/pages/ResetCode";
import RestPassword from "../features/auth/pages/RestPassword";

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
      {
        path: "/forgetpassword",
        element: <ForgetPassword />,
      },
      {
        path: "/verifycode",
        element: <ResetCode />,
      },
      {
        path: "/restpassword",
        element: <RestPassword />,
      },
    ],
  },
]);

export default router;
