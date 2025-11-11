import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import HomePageDriver from "../features/driver/HomePageDriver";
import RedirectByRole from "./RedirectByRole";
import PaymentPage from "../features/moves/pages/PaymentPage";
// import RedirectByRole from "./RedirectByRole";
// import Start from "../pages/Start";
// const StartPage = lazy(() => import("../features/moves/pages/StartPage"));
// const StartLayout = lazy(() => import("./Layout/StartLayout"));
const Insurance = lazy(() => import("../features/moves/pages/Insurance"));
const CreateOrder = lazy(() => import("../features/moves/pages/CreateOrder"));
const GetAllOrderPage = lazy(
  () => import("../features/moves/pages/GetAllOrderPage")
);
const GetOrderDetails = lazy(
  () => import("../features/moves/pages/GetOrderDetails")
);
const AdminNotFound = lazy(
  () => import("../features/dashboard/pages/AdminNotFound")
);
const CustomerPage = lazy(
  () => import("../features/dashboard/pages/CustomerPage")
);
const GetAllOrderPageAdmin = lazy(
  () => import("../features/dashboard/pages/GetAllOrderPageAdmin")
);
const DriversPage = lazy(
  () => import("../features/dashboard/pages/DriversPage")
);

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
// const TokenRefresher = lazy(() => import("../pages/TokenRefresher"));
const ErrorHandler = lazy(() => import("../pages/ErrorHandler"));
const Profile = lazy(() => import("../features/profile/pages/Profile"));
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
  {
    path: "/",
    element: <RedirectByRole />,
    errorElement: <ErrorHandler />,
  },
  // Root Layout
  {
    path: "/",
    element: <RooyLayout />,
    errorElement: <ErrorHandler />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <AboutSection /> },

      { path: "/test", element: <Test /> },

      {
        path: "/profile",
        element: <ProtectedLayout allowedRoles={["customer"]} />,
        children: [
          {
            path: "",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/trips",
        element: <ProtectedLayout allowedRoles={["customer"]} />,
        children: [
          {
            path: "",
            element: <GetAllOrderPage />,
          },
          {
            path: ":id",
            element: <GetOrderDetails />,
          },
        ],
      },

      { path: "/start", element: <Insurance /> },
      { path: "/order", element: <CreateOrder /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "*", element: <ErrorHandler /> },
    ],
  },

  //StartLayout
  // {
  //   path: "/start",
  //   element: <StartLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <StartPage />,
  //     },
  //     {
  //       path: "insurance",
  //       element: <Insurance />,
  //     },
  //     {
  //       path: "order",
  //       element: <CreateOrder />,
  //     },
  //     {
  //       path: "payment",
  //       element: <div>Payment</div>,
  //     },
  //   ],
  // },

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
    element: <ProtectedLayout allowedRoles={["superAdmin"]} />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "", element: <div>Admin</div> },
          { path: "dashboard", element: <div>Admin Dashboard</div> },
          { path: "customers", element: <CustomerPage /> },
          { path: "orders", element: <GetAllOrderPageAdmin /> },
          { path: "drivers", element: <DriversPage /> },
        ],
      },

      { path: "*", element: <AdminNotFound /> },
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
          { path: "", element: <HomePageDriver /> },
          { path: "dashboard", element: <div>Driver Dashboard</div> },
        ],
      },
    ],
  },
]);

export default router;
