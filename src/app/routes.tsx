import { createBrowserRouter } from "react-router-dom";
import RooyLayout from "./Layout/RooyLayout";
import Login from "../features/auth/pages/Login";

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
        element: <div>Register</div>,
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
    ],
  },
]);

export default router;
