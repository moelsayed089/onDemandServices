import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { usePostMutation } from "../../../app/api/usePostMutation";
import type { ResetCodePayload, ResetCodeResponse } from "../types/ResetCode";
import toast from "react-hot-toast";

const useRestCode = () => {
  const Navigate = useNavigate();
  return usePostMutation<ResetCodeResponse, ResetCodePayload>(
    "/api/v1/auth/verifyResetcode",
    {
      onSuccess: () => {
        // console.log("VerifyCode", data.message);
        toast.success("VerifyCode Success", {
          position: "bottom-right",
          duration: 1000,
        });
        setTimeout(() => {
          Navigate("/restpassword");
        }, 2000);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message;

        // console.log(
        //   "Forget Password Error:",
        //   errorMessage || "Something went wrong"
        // );
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

export default useRestCode;
