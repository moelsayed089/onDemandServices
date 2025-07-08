import { useGetQuery } from "../../../app/api/useGetQuery";
import type { DriverResponseDetails } from "../types/GetDriverAdmin";

const useGetDriverDetailsAdmin = (id: string) => {
  return useGetQuery<DriverResponseDetails>(
    "getAllDrivers",
    `/api/v1/drivers/${id}`,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );
};

export default useGetDriverDetailsAdmin;
