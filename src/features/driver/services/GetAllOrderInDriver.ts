import { useGetQuery } from "../../../app/api/useGetQuery";
import type { IGetAllOrdersResponse } from "../types/orders";

const useGetAllOrdersInDriver = (page: number, limit: number = 10) => {
  return useGetQuery<IGetAllOrdersResponse>(
    "getAllOrdersInDriver",
    `/api/v1/moves/driver?page=${page}&limit=${limit}`,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );
};

export default useGetAllOrdersInDriver;
