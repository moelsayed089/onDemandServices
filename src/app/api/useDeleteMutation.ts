import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "./axiosConfig";

export const useDeleteMutation = <TData = unknown, TVariables = unknown>(
  endpoint: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (payload: TVariables) => {
      // if you need to pass payload in delete, include it in axios config:
      const res = await axiosInstance.delete(endpoint, { data: payload });
      return res.data as TData;
    },
    ...options,
  });
};
