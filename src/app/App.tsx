// src/app/App.tsx
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { Toaster } from "react-hot-toast";
import TokenRefresher from "../pages/TokenRefresher";
import { Suspense, useEffect } from "react";
import Loading from "../shared/components/molecules/Loading";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { socketManager } from "./api/socketManager";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, role } = useSelector(
    (state: RootState) => state.loginAuth
  );

  useEffect(() => {
    if (accessToken && role) {
      console.log("🔌 Initializing socket for role:", role);
      socketManager.initialize(
        accessToken,
        dispatch,
        role as "customer" | "driver"
      );
    }

    return () => {
      if (!accessToken) {
        console.log("🔌 Disconnecting socket on logout");
        socketManager.disconnect();
      }
    };
  }, [accessToken, role, dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="text-center min-h-screen">
            <Loading />
          </div>
        }
      >
        <TokenRefresher />
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
