import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  role: string | null;
  accessToken: string | null;
  accessTokenExpires: string | null;
}

const initialState: AuthState = {
  role: localStorage.getItem("role"),
  accessToken: localStorage.getItem("accessToken"),
  accessTokenExpires: localStorage.getItem("accessTokenExpires"),
};

const authSlice = createSlice({
  name: "loginAuth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        role: string;
        accessToken: string;
        accessTokenExpires: string;
      }>
    ) => {
      console.log("LOGIN SUCCESS PAYLOAD", action.payload);
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      state.accessTokenExpires = action.payload.accessTokenExpires;

      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem(
        "accessTokenExpires",
        action.payload.accessTokenExpires
      );
    },
    logoutSuccess: (state) => {
      state.role = null;
      state.accessToken = null;
      state.accessTokenExpires = null;
      localStorage.removeItem("role");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpires");
    },
    updateToken: (
      state,
      action: PayloadAction<{ accessToken: string; accessTokenExpires: string }>
    ) => {
      state.accessTokenExpires = action.payload.accessTokenExpires;
      state.accessToken = action.payload.accessToken;
      console.log("UPDATE TOKEN PAYLOAD", action.payload);
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem(
        "accessTokenExpires",
        action.payload.accessTokenExpires
      );
    },
  },
});

export const { loginSuccess, logoutSuccess, updateToken } = authSlice.actions;
export default authSlice.reducer;
