import { usePutMutation } from "../../../app/api/usePutMutation";
import { useNavigate } from "react-router-dom";

const useUpdatePasswordProfile = () => {
  const navigate = useNavigate();
  return usePutMutation("/api/v1/users/updateLoggedUserPassword", {
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });
};
export default useUpdatePasswordProfile;
