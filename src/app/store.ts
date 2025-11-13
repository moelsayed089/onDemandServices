import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import messageReducer from "./slice/messageSlice";
import driverMoveReducer from "../features/driver/driverMoveSlice";

export const store = configureStore({
  reducer: {
    loginAuth: authReducer,
    messages: messageReducer,
    driverMove: driverMoveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
