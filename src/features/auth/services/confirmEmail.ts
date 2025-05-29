import toast from "react-hot-toast";
import { usePostMutation } from "../../../app/api/usePostMutation";
import type {
  ConfirmEmailPayload,
  ConfirmEmailResponse,
} from "../types/confirmEmail";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

const useConfirmEmail = () => {
  const Navigate = useNavigate();
  return usePostMutation<ConfirmEmailResponse, ConfirmEmailPayload>(
    "/api/v1/auth/resend-confirmation",
    {
      onSuccess: (data: ConfirmEmailResponse) => {
        toast.success(data.message, {
          position: "bottom-right",
        });
        Navigate("/confirmemail");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message;

        console.log(
          "Confirm Email Error:",
          errorMessage || "Something went wrong"
        );
        toast.error(errorMessage || "Something went wrong", {
          position: "bottom-right",
          duration: 1000,
        });
        if (errorMessage === "Email already confirmed") {
          setTimeout(() => {
            Navigate("/login");
          }, 2000);
        }
        if (errorMessage === "User not found") {
          setTimeout(() => {
            Navigate("/register");
          }, 2000);
        }
      },
    }
  );
};
export default useConfirmEmail;
