import { useGetQuery } from "../../../app/api/useGetQuery";
import type { UserDataResponse } from "../types/UserDataResponse";

const useGetUserData = () => {
  return useGetQuery<UserDataResponse>(
    "getUserData",
    "/api/v1/users/getLoggedUser",
    {
      staleTime: 1000 * 60 * 10,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
export default useGetUserData;
