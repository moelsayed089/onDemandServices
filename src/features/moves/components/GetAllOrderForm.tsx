import { useEffect, useState } from "react";
import { formatMonthYear, formatTime } from "../../../utils/GetDateAndDayes";
import OrderCardSkeleton from "../LoadingSkeleton/OrderCardSkeleton";
import useGetUserOrders from "../services/GetAllOrdersService";
import type { Order } from "../types/GetAllOrders";
import OrderCard from "./molecules/OrderCard";
import { Pagination } from "../../../shared/components/atoms/Pagination";

const GetAllOrderForm = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetUserOrders(page, limit);
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isLoading)
    return (
      <div className="container mt-5 mb-12">
        <h1 className="text-3xl text-main-color font-semibold mb-7">
          Order History
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <OrderCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  return (
    <>
      <div className="container mt-5 mb-12 ">
        <h1 className="text-3xl text-main-color font-semibold  mb-7">
          Order History
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {data?.data.map((order: Order) => (
            <OrderCard
              _id={order._id}
              key={order._id}
              orderNumber={`Order-${order._id.slice(-4)}`}
              orderDate={formatMonthYear(order.createdAt)}
              orderTime={formatTime(order.createdAt)}
              total={`${order.pricing.totalPrice.toFixed(2)} EGP`}
              vehicleType={`BY ${order.vehicleType}`}
              deliveryStatus={order.status.replace(/_/g, " ")}
            />
          ))}
        </div>

        <div className="  mt-5">
          {totalPages > 1 && (
            <Pagination>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </Pagination.Item>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item key={i}>
                    <Pagination.Link
                      className="cursor-pointer"
                      isActive={page === i + 1}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}

                <Pagination.Item>
                  <Pagination.Next
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={
                      page === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};

export default GetAllOrderForm;
