import { usePostMutation } from "../../../app/api/usePostMutation";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  EstimateRequest,
  EstimateResponse,
} from "../types/orderForm";

export const useCreateOrder = () =>
  usePostMutation<CreateOrderResponse, CreateOrderRequest>("/api/v1/moves");

export const useEstimateOrder = () =>
  usePostMutation<EstimateResponse, EstimateRequest>("/api/v1/moves/estimate");
