import { useParams } from "react-router-dom";
import useGetUserOrdersDetails from "../services/GetOrdersDetailsService";
import { formatFullDate, formatTime } from "../../../utils/GetDateAndDayes";
import OrderDetailsCardSkeleton from "../LoadingSkeleton/OrderDetailsCardSkeleton";

const OrderDetailsForm = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetUserOrdersDetails(id!);

  if (isLoading)
    return (
      <>
        <div className="container mt-5 mb-12">
          <h2 className="text-2xl font-semibold text-main-color">
            Order Details
          </h2>
          <OrderDetailsCardSkeleton />
        </div>
      </>
    );
  return (
    <>
      <div className="container mt-5 mb-12">
        <h2 className="text-2xl font-semibold text-main-color">
          Order Details
        </h2>

        {data?.data && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700">Customer:</h3>
                <p className="text-sm text-pragraph-color">
                  {data?.data.customer.name}
                </p>
                <p className="text-sm text-pragraph-color">
                  {data?.data.customer.email}
                </p>
                <p className="text-sm text-pragraph-color">
                  {data?.data.customer.phone}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Order ID:</h3>
                <p className="text-sm text-pragraph-color">{data?.data._id}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Pickup Address:</h3>
                <p className="text-sm text-pragraph-color">
                  {data?.data.pickup.address}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">
                  Delivery Address:
                </h3>
                <p className="text-sm text-pragraph-color">
                  {data?.data.delivery.address}
                </p>
              </div>

              <div className="flex items-center">
                <h3 className="font-semibold text-gray-700">Vehicle Type:</h3>
                <p className="text-body-sm text-pragraph-color capitalize ml-2">
                  {data?.data.vehicleType}
                </p>
              </div>

              <div className="flex items-center">
                <h3 className="font-semibold text-gray-700">Status:</h3>
                <p className="text-sm text-yellow-600 capitalize ml-2">
                  {data?.data.status}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">
                  Items:{" "}
                  <span className="text-main-color">
                    {data?.data.items[0].name}
                  </span>
                </h3>
                <h3 className="font-semibold text-gray-700">
                  Quantity: <span>{data?.data.items[0].quantity}</span>
                </h3>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Pricing:</h3>
                <p className="text-sm text-pragraph-color">
                  {data?.data.pricing.basePrice} EGP
                </p>
                <p className="text-sm text-pragraph-color">
                  Distance: {data?.data.pricing.distancePrice.toFixed(2)} EGP
                </p>
                <p className="text-sm font-medium text-main-color">
                  Total: {data?.data.pricing.totalPrice.toFixed(2)} EGP
                </p>
              </div>

              <div className="flex items-center">
                <h3 className="font-semibold text-gray-700">Payment Status:</h3>
                <p className="text-body-sm capitalize text-pragraph-color ml-2">
                  {data?.data.payment.status}
                </p>
              </div>

              <div className="flex items-center">
                <h3 className="font-semibold text-gray-700">Created At:</h3>
                <div className="flex items-center ml-2">
                  <p className="text-sm text-pragraph-color">
                    {formatFullDate(data?.data.createdAt)}
                  </p>
                  <p className="text-sm text-pragraph-color ml-2">
                    {formatTime(data?.data.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetailsForm;
