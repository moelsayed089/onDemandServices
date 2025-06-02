import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
// import toast from "react-hot-toast";
import type {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../types/RestPassword";
import { usePutMutation } from "../../../app/api/usePutMutation";
import { useDispatch } from "react-redux";
import { updateToken } from "../authSlice";
import toast from "react-hot-toast";

const useRestPassword = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  return usePutMutation<ResetPasswordResponse, ResetPasswordPayload>(
    "/api/v1/auth/resetPassword",
    {
      onSuccess: (data: ResetPasswordResponse) => {
        console.log("Reset Password", data);
        toast.success("Reset Password Success", {
          position: "bottom-right",
        });
        dispatch(
          updateToken({
            accessToken: data.accessToken,
            accessTokenExpires: data.accessTokenExpires,
          })
        );

        setTimeout(() => {
          Navigate("/");
        }, 2000);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message;

        console.log(
          "Reset Password Error:",
          errorMessage || "Something went wrong"
        );
        toast.error(errorMessage || "Something went wrong", {
          position: "bottom-right",
          duration: 1000,
        });
        setTimeout(() => {
          Navigate("/forgetpassword");
        }, 2000);
      },
    }
  );
};

export default useRestPassword;
