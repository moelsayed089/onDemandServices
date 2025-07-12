import useGetALLDrivers from "../../services/GetAllDriverAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../shared/components/ui/table";
import { Badge } from "../../../../shared/components/ui/badge";
import { formatFullDate } from "../../../../utils/GetDateAndDayes";
import { Search } from "lucide-react";
import { Input } from "../../../../shared/components/atoms/Input";
import { useEffect, useState } from "react";
import UserTableSkeleton from "../loadingSkeleton/UserTableSkeleton";
import { Pagination } from "../../../../shared/components/atoms/Pagination";
import ViewDriverAdminDialog from "../molecules/ViewDriverAdminDialog";
import UpdateStatusDriverAdminDialog from "../molecules/UpdateStatusDriverAdminDialog";
const DriverFormAdmin = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetALLDrivers(page, limit);
  const drivers = data?.data;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredUsers = drivers?.filter((user) => {
    const matchesSearch =
      user.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      user.vehicle.type.toLowerCase() === statusFilter.toLowerCase();
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
          Drivers Mangement
        </h1>
        <p className="text-pragraph-color">
          Manage your drivers here on DeliverCo
        </p>

        {/*        <SearchBar setSearchTerm={setSearchTerm} /> */}
        <div>
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
        </div>

        <div className="mt-5">
          {isLoading ? (
            <UserTableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>License Plate</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Created At</TableHead>

                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers?.map((driver) => (
                  <TableRow key={driver._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium capitalize">
                          {driver.user.name}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {driver.user.email}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="capitalize">
                      {driver.status}
                    </TableCell>

                    <TableCell className="uppercase">
                      {driver.vehicle.type}
                    </TableCell>

                    <TableCell>{driver.vehicle.licensePlate}</TableCell>

                    <TableCell className="capitalize">
                      {driver.vehicle.color}
                    </TableCell>

                    <TableCell className="capitalize">
                      {driver.vehicle.model}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={driver.isAvailable ? "default" : "destructive"}
                      >
                        {driver.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>

                    <TableCell>{formatFullDate(driver.createdAt)}</TableCell>

                    <TableCell className="flex items-center gap-2">
                      <ViewDriverAdminDialog userId={driver._id} />
                      <UpdateStatusDriverAdminDialog user_id={driver._id} />
                    </TableCell>
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

export default DriverFormAdmin;
