import { usePutMutation } from "../../../app/api/usePutMutation";

const useUpdatePasswordProfile = () => {
  return usePutMutation("/api/v1/users/updateLoggedUserPassword", {
    onSuccess: (data) => {
      console.log("Password updated successfully", data);
    },
    onError: (error) => {
      console.log("Error updating password", error);
    },
  });
};

export default useUpdatePasswordProfile;
