import React, { useState } from "react";
import { Button } from "../../../shared/components/ui/button";
import { useUpdateOrderStatus } from "../services/useUpdateOrderStatus";
import type { IOrder } from "../types/orders";
import Spinner from "../../../shared/components/atoms/Spinner";
import toast from "react-hot-toast";

const statusOptions = [
  "arrived_at_pickup",
  "picked_up",
  "arrived_at_delivery",
  "delivered",
];

const DriverOrderCard: React.FC<{ order: IOrder }> = ({ order }) => {
  const [status, setStatus] = useState(order.status);

  const [isLoading, setIsLoading] = useState(false);
  const updateStatusMutation = useUpdateOrderStatus(order._id);

  const handleUpdate = () => {
    setIsLoading(true);
    updateStatusMutation.mutate(
      { status },
      {
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Status updated successfully!", {
            position: "bottom-right",
          });
        },
        onError: (err) => {
          setIsLoading(false);
          toast.error("Error updating status", { position: "bottom-right" });
          return err;
        },
      }
    );
  };

  return (
    <div className="bg-white border   border-gray-200  rounded-2xl p-4 mb-4 w-full max-w-3xl ">
      <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>

      <p>
        <strong>Pickup:</strong> {order.pickup.address}
      </p>
      <p>
        <strong>Delivery:</strong> {order.delivery.address}
      </p>
      <p>Total Price: {order.pricing.totalPrice} EGP</p>
      {order.items.map((item, index) => (
        <div key={index} className="mt-2">
          <p className="text-main-color text-body-md">
            Item {index + 1}: {item.name}
          </p>
          <p>
            Quantity: <span className="font-semibold">{item.quantity}</span>
          </p>
        </div>
      ))}

      <div className="mt-3 mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <Button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-600 text-white w-full mt-2"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span className="ml-1">Updating..</span>
          </>
        ) : (
          "Update Status"
        )}
      </Button>
    </div>
  );
};

export default DriverOrderCard;
