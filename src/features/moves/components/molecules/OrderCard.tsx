import { Link } from "react-router-dom";

interface OrderCardProps {
  _id: string;
  orderNumber: string;
  orderDate: string;
  orderTime: string;
  total: string;
  vehicleType: string;
  deliveryStatus: string;
}

const OrderCard = ({
  _id,
  orderNumber,
  orderDate,
  orderTime,
  total,
  vehicleType,
  deliveryStatus,
}: OrderCardProps) => {
  return (
    <Link to={`/trips/${_id}`}>
      <div className="bg-white rounded-md border shadow-sm border-gray-100 p-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-body-lg">{orderNumber}</h2>
            <div className="flex text-pragraph-color">
              <p>{orderDate}</p>
              <p className="ml-2">{orderTime}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className=" lg:text-body-lg md:text-body-md text-main-color">
              {total}
            </p>
            <p className="text-body-md">{vehicleType}</p>
          </div>
        </div>
        <p className="text-pragraph-color mt-2">{deliveryStatus}</p>
      </div>
    </Link>
  );
};

export default OrderCard;
