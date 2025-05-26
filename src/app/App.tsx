import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
