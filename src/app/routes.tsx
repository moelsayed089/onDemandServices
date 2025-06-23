import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Start from "../pages/Start";

// Layouts
const RooyLayout = lazy(() => import("./Layout/RooyLayout"));
const AdminLayout = lazy(() => import("./Layout/AdminLayout"));
const DriverLayout = lazy(() => import("./Layout/DriverLayout"));
const AuthLayout = lazy(() => import("./Layout/AuthLayout"));
const ProtectedLayout = lazy(() => import("./Layout/ProtectedLayout"));

// Pages
const Home = lazy(() => import("../pages/Home"));
const AboutSection = lazy(
  () => import("../shared/components/organisms/AboutSection")
);
const Test = lazy(() => import("../pages/Test"));
const TokenRefresher = lazy(() => import("../pages/TokenRefresher"));
const ErrorHandler = lazy(() => import("../pages/ErrorHandler"));

// Auth Pages
const Login = lazy(() => import("../features/auth/pages/Login"));
const Signup = lazy(() => import("../features/auth/pages/Signup"));
const ConfirmEmail = lazy(() => import("../features/auth/pages/ConfirmEmail"));
const ForgetPassword = lazy(
  () => import("../features/auth/pages/ForgetPassword")
);
const ResendEmail = lazy(() => import("../features/auth/pages/ResendEmail"));
const ResetCode = lazy(() => import("../features/auth/pages/ResetCode"));
const RestPassword = lazy(() => import("../features/auth/pages/RestPassword"));

const router = createBrowserRouter([
  // Root Layout
  {
    path: "/",
    element: <RooyLayout />,
    errorElement: <ErrorHandler />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <AboutSection /> },
      { path: "/test", element: <Test /> },
      { path: "/start", element: <Start /> },
      { path: "/profile", element: <TokenRefresher /> },
      { path: "*", element: <ErrorHandler /> },
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
          { path: "dashboard", element: <div>Admin Dashboard</div> },
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
