//post

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "./axiosConfig";

export const usePostMutation = <TData = unknown, TVariables = unknown>(
  endpoint: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (payload: TVariables) => {
      const res = await axiosInstance.post(endpoint, payload);
      return res.data as TData;
    },
    ...options,
  });
};
