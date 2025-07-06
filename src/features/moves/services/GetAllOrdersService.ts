import { useGetQuery } from "../../../app/api/useGetQuery";
import type { GetAllOrdersResponse } from "../types/GetAllOrders";

const useGetUserOrders = (page: number, limit: number = 10) => {
  return useGetQuery<GetAllOrdersResponse>(
    "getUserOrders",
    `/api/v1/moves/customer?page=${page}&limit=${limit}`,
    {
      staleTime: 1000 * 60 * 10,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
};
export default useGetUserOrders;
