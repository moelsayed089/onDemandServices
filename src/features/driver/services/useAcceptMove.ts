import { usePutMutation } from "../../../app/api/usePutMutation";
import { useQueryClient } from "@tanstack/react-query";

const useAcceptMove = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  return usePutMutation(`/api/v1/moves/${id}/accept`, {
    onSuccess: (data) => {
      console.log("Move accepted successfully", data);
      queryClient.invalidateQueries({ queryKey: ["driverMoves"] });
    },
    onError: (error) => {
      console.log("Error accepting move", error);
    },
  });
};

export default useAcceptMove;
