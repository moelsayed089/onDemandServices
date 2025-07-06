import { useGetQuery } from "../../../app/api/useGetQuery";
import type { OrderDetailsResponse } from "../types/OrderDetails";

const useGetUserOrdersDetails = (id: string) => {
  return useGetQuery<OrderDetailsResponse>(
    "getUserOrdersDetails",
    `/api/v1/moves/${id}`,
    {
      staleTime: 1000 * 60 * 10,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
export default useGetUserOrdersDetails;
