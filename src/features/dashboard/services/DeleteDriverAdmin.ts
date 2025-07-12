import toast from "react-hot-toast";
import { useDeleteMutation } from "../../../app/api/useDeleteMutation";
import { useQueryClient } from "@tanstack/react-query";

const useDeleteDriverAdmin = (id: string) => {
  const queryClient = useQueryClient();
  return useDeleteMutation(`/api/v1/drivers/${id}`, {
    onSuccess: () => {
      toast.success("Driver deleted successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllDrivers"] });
    },
    onError: () => {
      toast.error("Error deleting driver", {
        position: "bottom-right",
      });
    },
  });
};

export default useDeleteDriverAdmin;
