import { usePutMutation } from "../../../app/api/usePutMutation";

export const useUpdateOrderStatus = (orderId: string) => {
  return usePutMutation(`/api/v1/moves/${orderId}/progress`);
};
