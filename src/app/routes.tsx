import { createBrowserRouter } from "react-router-dom";
import RooyLayout from "./Layout/RooyLayout";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ConfirmEmail from "../features/auth/pages/ConfirmEmail";
import ResendEmail from "../features/auth/pages/ResendEmail";
import { ForgetPassword } from "../features/auth/pages/ForgetPassword";
import ResetCode from "../features/auth/pages/ResetCode";
import RestPassword from "../features/auth/pages/RestPassword";
import AdminLayout from "./Layout/AdminLayout";
import DriverLayout from "./Layout/DriverLayout";
import AuthLayout from "./Layout/AuthLayout";
import Home from "../pages/Home";
import AboutSection from "../shared/components/organisms/AboutSection";
import ErrorHandler from "../pages/ErrorHandler";
import ProtectedLayout from "./Layout/ProtectedLayout";
import Test from "../pages/Test";
import TokenRefresher from "../pages/TokenRefresher";

const router = createBrowserRouter([
  // Root Layout
  {
    path: "/",
    element: <RooyLayout />,
    errorElement: <ErrorHandler />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutSection />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/profile",
        element: <TokenRefresher />,
      },

      {
        path: "*",
        element: <ErrorHandler />,
      },
    ],
  },

  // Auth Layout
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { path: "/confirmemail", element: <ConfirmEmail /> },
      { path: "/resendemail", element: <ResendEmail /> },
      { path: "/forgetpassword", element: <ForgetPassword /> },
      { path: "/verifycode", element: <ResetCode /> },
      { path: "/restpassword", element: <RestPassword /> },
    ],
  },

  // Admin Layout
  {
    path: "/admin",
    element: <ProtectedLayout allowedRoles={["admin"]} />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "", element: <div>Admin</div> },
          { path: "dashboard", element: <div>Admin Dashboard qqqq</div> },
        ],
      },
    ],
  },

  // Driver Layout
  {
    path: "/driver",
    element: <ProtectedLayout allowedRoles={["driver"]} />,
    children: [
      {
        path: "",
        element: <DriverLayout />,
        children: [
          { path: "", element: <div>Driver</div> },
          { path: "dashboard", element: <div>Driver Dashboard</div> },
        ],
      },
    ],
  },
]);

export default router;
