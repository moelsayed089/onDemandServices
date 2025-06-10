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
      dispatch(
        loginSuccess({
          role: data.data.role,
          accessToken: data.accessToken,
          accessTokenExpires: data.accessTokenExpires,
        })
      );
      if (data.data.role === "superAdmin") navigate("/admin");
      else if (data.data.role === "driver") navigate("/driver");
      else navigate("/");
    },
    onError: (error) => {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message;

      console.log("login Error:", errorMessage || "Something went wrong");
      toast.error(errorMessage || "Something went wrong", {
        position: "bottom-right",
        duration: 2000,
      });
    },
  });
};
export default useLoginAuth;
