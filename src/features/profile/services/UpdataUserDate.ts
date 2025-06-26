import { useQueryClient } from "@tanstack/react-query";
import { usePutMutation } from "../../../app/api/usePutMutation";

const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  return usePutMutation("/api/v1/users/updateLoggedUserData", {
    onSuccess: (data) => {
      console.log("User data updated successfully", data);
      queryClient.invalidateQueries({ queryKey: ["getUserData"] });
    },
    onError: (error) => {
      console.log("Error updating user data", error);
    },
  });
};

export default useUpdateUserData;
