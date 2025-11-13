import { usePutMutation } from "../../../app/api/usePutMutation";

interface UpdateDriverLocationRequest {
  coordinates: [number, number];
}

interface UpdateDriverLocationResponse {
  success: boolean;
  message: string;
}

export const useUpdateDriverLocation = () =>
  usePutMutation<UpdateDriverLocationResponse, UpdateDriverLocationRequest>(
    "/api/v1/drivers/location",
    {
      onSuccess: (data) => {
        console.log("📍 Driver location updated successfully:", data);
      },
      onError: (error) => {
        console.error("❌ Failed to update driver location:", error);
      },
    }
  );
