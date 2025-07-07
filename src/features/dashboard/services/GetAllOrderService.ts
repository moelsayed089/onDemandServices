import { useGetQuery } from "../../../app/api/useGetQuery";
import type { GetAllOrdersResponse } from "../types/AllOrdersAdmin";

const useGetUserOrdersAdmin = (page: number, limit: number = 10) => {
  return useGetQuery<GetAllOrdersResponse>(
    "getUserOrdersAdmin",
    `/api/v1/moves?page=${page}&limit=${limit}`,
    {
      staleTime: 1000 * 60 * 10,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
};
export default useGetUserOrdersAdmin;
