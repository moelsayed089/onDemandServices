import { useGetQuery } from "../../../app/api/useGetQuery";
import type { UsersResponse } from "../types/AllUser";

const useGetAllUsers = (page: number, limit: number = 10) => {
  return useGetQuery<UsersResponse>(
    "getAllUsers",
    `/api/v1/users?page=${page}&limit=${limit}`,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );
};

export default useGetAllUsers;
