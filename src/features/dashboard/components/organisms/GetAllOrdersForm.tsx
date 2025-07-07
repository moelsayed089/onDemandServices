import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../shared/components/ui/table";
import { formatFullDate } from "../../../../utils/GetDateAndDayes";
import useGetUserOrdersAdmin from "../../services/GetAllOrderService";
import UserTableSkeleton from "../loadingSkeleton/UserTableSkeleton";
import { Search } from "lucide-react";
import { Input } from "../../../../shared/components/atoms/Input";
import { Pagination } from "../../../../shared/components/atoms/Pagination";

const GetAllOrdersForm = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetUserOrdersAdmin(page, limit);
  console.log("data", data?.data);

  const users = data?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      user.vehicleType.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl md:leading-10  font-medium ">
          Booking Management
        </h1>
        <p className="text-sm text-pragraph-color">
          Monitor and manage all delivery bookings
        </p>
        {/* statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div className="flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-2xl md:text-3xl md:leading-10  font-medium ">
              250
            </h2>
            <p className="text-sm text-pragraph-color">Total Bookings</p>
          </div>
          <div className="flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-2xl md:text-3xl md:leading-10 text-main-color font-medium ">
              18
            </h2>
            <p className="text-sm text-pragraph-color">In Progress</p>
          </div>
          <div className="flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-2xl md:text-3xl md:leading-10 text-yellow-600  font-medium ">
              12
            </h2>
            <p className="text-sm text-pragraph-color">Pending</p>
          </div>
          <div className="flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-2xl md:text-3xl md:leading-10 text-green-600  font-medium ">
              215
            </h2>
            <p className="text-sm text-pragraph-color">Completed</p>
          </div>
        </div>

        {/* search */}

        <div className="flex items-center justify-between gap-4 flex-wrap mb-7 mt-5 bg-white p-6 rounded-md shadow-sm">
          <div className="relative flex-1 ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              className="pl-10"
              placeholder="Search by name or email or phone or order id"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="All">All Status</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        {/* Table */}
        <div className="mt-5">
          {isLoading ? (
            <UserTableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {`Order-${order._id.slice(-4)}`}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {order.customer.name}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="capitalize">
                      {order.status.replace(/_/g, " ")}
                    </TableCell>

                    <TableCell className="capitalize">
                      from {order.pickup.address}` <br /> to{" "}
                      {order.delivery.address}
                    </TableCell>

                    <TableCell className="uppercase">
                      BY {order.vehicleType}
                    </TableCell>

                    <TableCell>{order.pricing.totalPrice} EGP</TableCell>
                    <TableCell>{order.payment.status}</TableCell>

                    <TableCell>{formatFullDate(order.createdAt)}</TableCell>

                    <TableCell>{order.customer.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="mt-5">
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

export default GetAllOrdersForm;
