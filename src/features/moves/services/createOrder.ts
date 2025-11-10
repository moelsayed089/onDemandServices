import { usePostMutation } from "../../../app/api/usePostMutation";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  EstimateRequest,
  EstimateResponse,
} from "../types/orderForm";
import { queryClient } from "../../../app/api/queryClient";

export const useCreateOrder = () =>
  usePostMutation<CreateOrderResponse, CreateOrderRequest>("/api/v1/moves", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserOrders"] });
    },
  });
export const useEstimateOrder = () =>
  usePostMutation<EstimateResponse, EstimateRequest>("/api/v1/moves/estimate");
