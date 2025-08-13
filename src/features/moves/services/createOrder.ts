import { usePostMutation } from "../../../app/api/usePostMutation";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  EstimateRequest,
  EstimateResponse,
} from "../types/orderForm";

import { queryClient } from "../../../app/api/queryClient";

import socket from "../../../app/api/socket";
export const useCreateOrder = () =>
  usePostMutation<CreateOrderResponse, CreateOrderRequest>("/api/v1/moves", {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getUserOrders"] });

      socket.emit("orderCreated", data);
    },
  });
export const useEstimateOrder = () =>
  usePostMutation<EstimateResponse, EstimateRequest>("/api/v1/moves/estimate");
