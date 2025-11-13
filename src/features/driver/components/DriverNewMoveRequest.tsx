import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { Button } from "../../../shared/components/ui/button";
import { clearMove } from "../driverMoveSlice";
import axiosInstance from "../../../app/api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../../shared/components/atoms/Spinner";
import toast from "react-hot-toast";

const DriverNewMoveRequest = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const dispatch = useDispatch();
  const move = useSelector((state: RootState) => state.driverMove.currentMove);
  if (!move) return null;
  const handleAccept = async () => {
    setIsLoading(true);

    try {
      await axiosInstance.put(`/api/v1/moves/${move.move._id}/accept`, {});

      setTimeout(() => {
        navigate("/driver/allTrips");
      }, 2000);
      setIsLoading(false);
    } catch (err) {
      console.error("Error accepting move:", err);
      setIsLoading(false);
    }
    dispatch(clearMove());
  };

  const handleReject = async () => {
    setIsLoadingReject(true);

    try {
      await axiosInstance.put(`/api/v1/moves/${move.move._id}/reject`, {});
      toast.success("Move rejected successfully!", {
        position: "bottom-right",
      });
      setTimeout(() => {
        navigate("/driver/allTrips");
      }, 2000);
      setIsLoadingReject(false);
    } catch (err) {
      console.error("Error rejecting move:", err);
      toast.error("Failed to reject move. Please try again.", {
        position: "bottom-right",
      });
      setIsLoadingReject(false);
    }
    dispatch(clearMove());
  };

  return (
    <div className=" bg-white shadow-xl rounded-2xl p-6 mt-10 border max-w-3xl mx-auto border-gray-200 ">
      <h2 className="text-lg font-medium mb-3">New Delivery Request</h2>

      <p className="text-sm text-gray-700 mb-1">
        <strong>Pickup:</strong> {move.pickupLocation.address}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Delivery:</strong> {move.deliveryLocation.address}
      </p>

      <p className="text-sm text-gray-700 mb-1">
        <strong>Vehicle Type:</strong> {move.vehicleType}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Status:</strong> {move.move.status}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Insurance:</strong>{" "}
        {move.move.insurance.isSelected
          ? move.move.insurance.type
          : "Not selected"}
      </p>

      <p className="text-sm text-gray-900 font-medium mb-2">
        Total Price: {move.move.pricing.totalPrice} EGP
      </p>

      <div className="mt-3 flex-col flex justify-between gap-2">
        <Button
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-600 text-white w-full"
        >
          {isLoading ? (
            <>
              <Spinner />
              <span className="ml-1">Accepting..</span>
            </>
          ) : (
            "Accept"
          )}
        </Button>
        <Button
          onClick={handleReject}
          className="bg-red-500 hover:bg-red-600 text-white w-full"
        >
          {isLoadingReject ? (
            <>
              <Spinner />
              <span className="ml-1">Rejecting..</span>
            </>
          ) : (
            "Reject"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DriverNewMoveRequest;
