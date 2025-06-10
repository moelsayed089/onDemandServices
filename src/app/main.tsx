import { createRoot } from "react-dom/client";
import App from "./App";

import "../index.css";
import TokenRefresher from "../pages/Profile";

createRoot(document.getElementById("root")!).render(
  <>
    <TokenRefresher />
    <App />
  </>
);
