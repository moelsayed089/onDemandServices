import { useEffect, useState } from "react";
import { useEstimateOrder } from "../services/createOrder";
import type { EstimateRequest, EstimateResponse } from "../types/orderForm";
import PriceEstimateSkeleton from "../LoadingSkeleton/PriceEstimateSkeleton";

type Props = {
  pickupCoords: [number, number] | null;
  deliveryCoords: [number, number] | null;
  vehicleType: string;
};

const EstimationBox = ({
  pickupCoords,
  deliveryCoords,
  vehicleType,
}: Props) => {
  const { mutate, data, isPending } = useEstimateOrder();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (pickupCoords && deliveryCoords && vehicleType) {
      const payload: EstimateRequest = {
        pickup: {
          address: "Pickup",
          coordinates: { type: "Point", coordinates: pickupCoords },
        },
        delivery: {
          address: "Delivery",
          coordinates: { type: "Point", coordinates: deliveryCoords },
        },
        vehicleType,
      };

      mutate(payload, {
        onSuccess: (res: EstimateResponse) => {
          console.log("Estimate Response:", res);
          setIsReady(true);
        },
        onError: (err: unknown) => {
          if (
            err &&
            typeof err === "object" &&
            "response" in err &&
            err.response &&
            typeof err.response === "object" &&
            "data" in err.response
          ) {
            console.error("Estimate Error:", err.response.data);
          } else if (err instanceof Error) {
            console.error("Estimate Error:", err.message);
          } else {
            console.error("Estimate Error:", err);
          }
          setIsReady(false);
        },
      });
    } else {
      setIsReady(false);
    }
  }, [pickupCoords, deliveryCoords, vehicleType]);

  console.log("Estimate Data:", data?.data);
  const durationInMinutes = data?.data?.duration ?? 0;

  const days = Math.floor(durationInMinutes / 1440);
  const hours = Math.floor((durationInMinutes % 1440) / 60);
  const minutes = Math.floor(durationInMinutes % 60);
  if (isPending) return <PriceEstimateSkeleton />;
  if (!isReady || !data?.data) return null;

  return (
    <>
      <div className="mt-4  grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2 bg-gray-100 border  p-5 rounded-2xl">
          <h1 className="text-xl text-dark-color font-medium">
            Estimated Price:
          </h1>
          <p className="text-lg text-dark-color ">
            {data.data.totalPrice.toFixed(2)} EGP
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 bg-gray-100 border  p-5 rounded-2xl">
          <h1 className="text-xl text-dark-color font-medium">
            Estimated Time:
          </h1>
          <p className="text-lg text-dark-color">
            {days} days {hours} hours {minutes} minutes
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 bg-gray-100 border  p-5 rounded-2xl">
          <h1 className="text-xl text-dark-color font-medium">
            Estimated Base Price:
          </h1>
          <p className="text-lg text-dark-color">
            {data.data.basePrice.toFixed(2)} EGP
          </p>
        </div>
      </div>
    </>
  );
};

export default EstimationBox;
