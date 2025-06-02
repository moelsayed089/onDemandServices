import toast from "react-hot-toast";
import { usePostMutation } from "../../../app/api/usePostMutation";

import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import type {
  ForgetPasswordPayload,
  ForgetPasswordResponse,
} from "../types/forgetPassword";

const useForgetPassword = () => {
  const Navigate = useNavigate();
  return usePostMutation<ForgetPasswordResponse, ForgetPasswordPayload>(
    "/api/v1/auth/forgetPassword",
    {
      onSuccess: (data: ForgetPasswordResponse) => {
        console.log("forgetPassword", data);
        toast.success(data.status, {
          position: "bottom-right",
        });
        setTimeout(() => {
          Navigate("/verifycode");
        }, 2000);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message;

        console.log(
          "Forget Password Error:",
          errorMessage || "Something went wrong"
        );
        // console.log(error.response.data.status);
        toast.error(errorMessage || "Something went wrong", {
          position: "bottom-right",
          duration: 1000,
        });
        setTimeout(() => {
          Navigate("/register");
        }, 2000);
      },
    }
  );
};
export default useForgetPassword;
