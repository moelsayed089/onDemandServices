import toast from "react-hot-toast";
import { usePutMutation } from "../../../app/api/usePutMutation";
import { useNavigate } from "react-router-dom";
import type { UpdatePasswordProfileResponse } from "../types/UpdatePasswordProfile";

const useUpdatePasswordProfile = () => {
  const navigate = useNavigate();
  return usePutMutation("/api/v1/users/updateLoggedUserPassword", {
    onSuccess: (data: UpdatePasswordProfileResponse) => {
      toast.success("Password updated successfully", {
        position: "bottom-right",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log("Password updated successfully", data);
    },
    onError: (error) => {
      console.log("Error updating password", error);
    },
  });
};

export default useUpdatePasswordProfile;
