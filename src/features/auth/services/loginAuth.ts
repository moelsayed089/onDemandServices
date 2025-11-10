// src/features/auth/services/loginAuth.ts
import { useDispatch } from "react-redux";
import { usePostMutation } from "../../../app/api/usePostMutation";
import type { LoginPayload, LoginResponse } from "../types/login";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../authSlice";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const useLoginAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return usePostMutation<LoginResponse, LoginPayload>("/api/v1/auth/login", {
    onSuccess: (data) => {
      toast.success("Login Success", {
        position: "bottom-right",
        duration: 2000,
      });

      // Update auth state (socket will be initialized automatically by App.tsx)
      dispatch(
        loginSuccess({
          role: data.data.role,
          accessToken: data.accessToken,
          accessTokenExpires: data.accessTokenExpires,
        })
      );

      // Navigate based on role
      if (data.data.role === "superAdmin") {
        navigate("/admin");
      } else if (data.data.role === "driver") {
        navigate("/driver");
      } else {
        navigate("/");
      }
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Something went wrong";

      console.error("Login Error:", errorMessage);

      toast.error(errorMessage, {
        position: "bottom-right",
        duration: 2000,
      });
    },
  });
};

export default useLoginAuth;
