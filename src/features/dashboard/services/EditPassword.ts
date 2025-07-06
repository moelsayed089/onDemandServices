import toast from "react-hot-toast";
import { usePutMutation } from "../../../app/api/usePutMutation";

const useUpdatePassword = (id: string) => {
  return usePutMutation(`/api/v1/users/changePassword/${id}`, {
    onSuccess: () => {
      toast.success("Password updated successfully", {
        position: "bottom-right",
      });
    },
    onError: () => {
      toast.error("Error updating password", {
        position: "bottom-right",
      });
    },
  });
};

export default useUpdatePassword;
