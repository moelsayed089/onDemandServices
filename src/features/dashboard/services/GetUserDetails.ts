import { useGetQuery } from "../../../app/api/useGetQuery";
import type { UserInfo } from "../types/UserInfo";

const useGetUserDetails = (id: string) => {
  return useGetQuery<UserInfo>("getAllUsers", `/api/v1/users/${id}`, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetUserDetails;
