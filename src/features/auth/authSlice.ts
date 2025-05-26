import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  role: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  role: localStorage.getItem("role"),
  accessToken: localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "loginAuth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ role: string; accessToken: string }>
    ) => {
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logoutSuccess: (state) => {
      state.role = null;
      state.accessToken = null;
      localStorage.removeItem("role");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
