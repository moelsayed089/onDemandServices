import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import TokenRefresher from "../pages/TokenRefresher";
import { Suspense } from "react";
import Loading from "../shared/components/molecules/Loading";
function App() {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default App;
