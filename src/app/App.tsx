import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import TokenRefresher from "../pages/TokenRefresher";
import { Suspense } from "react";
function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TokenRefresher />
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <RouterProvider router={router} />
          </Suspense>
          <Toaster />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
