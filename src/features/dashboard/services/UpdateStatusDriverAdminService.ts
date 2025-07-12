import { useQueryClient } from "@tanstack/react-query";
import { usePutMutation } from "../../../app/api/usePutMutation";
import toast from "react-hot-toast";
import type { DriverResponseDetails } from "../types/GetDriverAdmin";

const useUpdateDriverStatusAdmin = (id: string) => {
  const queryClient = useQueryClient();
  return usePutMutation<DriverResponseDetails>(`/api/v1/drivers/${id}/status`, {
    onSuccess: () => {
      toast.success("Driver status updated successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllDrivers"] });
    },
    onError: () => {
      toast.error("Failed to update driver status", {
        position: "bottom-right",
      });
    },
  });
};

export default useUpdateDriverStatusAdmin;
