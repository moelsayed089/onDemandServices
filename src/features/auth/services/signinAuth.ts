import toast from "react-hot-toast";
import { usePostMutation } from "../../../app/api/usePostMutation";
import type { signupPayload, SignupResponse } from "../types/signup";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const useSigninAuth = () => {
  const navigate = useNavigate();
  return usePostMutation<SignupResponse, signupPayload>("/api/v1/auth/signup", {
    onSuccess: (data: SignupResponse) => {
      toast.success(data.message, {
        position: "bottom-right",
      });
      navigate("/confirmemail");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message;

      console.log("signup Error:", errorMessage || "Something went wrong");
      toast.error(errorMessage || "Something went wrong", {
        position: "bottom-right",
        duration: 1000,
      });

      if (errorMessage === "User Already Exist") {
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      }
    },
  });
};
export default useSigninAuth;
