import { useQueryClient } from "@tanstack/react-query";
import { usePutMutation } from "../../../app/api/usePutMutation";

const useUpdateUserData = (id: string) => {
  const queryClient = useQueryClient();
  return usePutMutation(`/api/v1/users/${id}`, {
    onSuccess: (data) => {
      console.log("User data updated successfully", data);
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
    onError: (error) => {
      console.log("Error updating user data", error);
    },
  });
};

export default useUpdateUserData;
