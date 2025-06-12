import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import TokenRefresher from "../pages/TokenRefresher";
function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TokenRefresher />
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
