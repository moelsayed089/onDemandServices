import { useGetQuery } from "../../../app/api/useGetQuery";
import type { DriversResponse } from "../types/GetDriverAdmin";

const useGetALLDrivers = (page: number, limit: number = 10) => {
  return useGetQuery<DriversResponse>(
    "getAllDrivers",
    `/api/v1/drivers?page=${page}&limit=${limit}`,
    {
      staleTime: 1000 * 60 * 10,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
};
export default useGetALLDrivers;
