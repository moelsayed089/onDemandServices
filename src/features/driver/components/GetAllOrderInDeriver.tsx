import useGetAllOrdersInDriver from "../services/GetAllOrderInDriver";
import type { IOrder } from "../types/orders";
import DriverOrderCard from "./DriverOrderCard";

export const GetAllOrdersInDriver = () => {
  const { data } = useGetAllOrdersInDriver(1, 10);

  if (!data || !data.data?.length) return <p>Loading or no orders found...</p>;
  return (
    <div className="flex flex-col items-center mt-4">
      {data.data.map((order: IOrder) => (
        <DriverOrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};
