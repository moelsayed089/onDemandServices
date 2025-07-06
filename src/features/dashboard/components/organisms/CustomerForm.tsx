import { useEffect, useState } from "react";
import { Badge } from "../../../../shared/components/ui/badge";
import { Input } from "../../../../shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../shared/components/ui/table";
import { Search } from "lucide-react";
import useGetAllUsers from "../../services/GetAllUserService";
import type { User } from "../../types/AllUser";
import { formatFullDate } from "../../../../utils/GetDateAndDayes";
import { Pagination } from "../../../../shared/components/atoms/Pagination";
import UserTableSkeleton from "../loadingSkeleton/UserTableSkeleton";
import ViewUserDialog from "../molecules/ViewUserDialog";
import EditUserDialog from "../molecules/EditUserDialog";
import DeleteUser from "../molecules/DeleteUser";
import EditPasswordDialog from "../molecules/EditPasswordDialog";
const CustomerForm = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data, isLoading } = useGetAllUsers(page, limit);
  const users = data?.data || [];

  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && user.active) ||
      (statusFilter === "Suspended" && !user.active);

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (active: boolean) => (
    <Badge variant={active ? "default" : "destructive"}>
      {active ? "Active" : "Suspended"}
    </Badge>
  );

  return (
    <div className="space-y-2">
      <h1 className="text-3xl text-main-color font-semibold ">
        User Management
      </h1>
      <p className="text-pragraph-color">
        Manage customers and drivers on the platform
      </p>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-7 mt-5 bg-white p-6 rounded-md shadow-sm">
        <div className="relative flex-1 ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search by name or email"
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
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <UserTableSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div>
                    <div className="font-medium capitalize">{user.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {user.email}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>{getStatusBadge(user.active)}</TableCell>
                <TableCell>{formatFullDate(user.createdAt)}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  {/* View Button */}

                  <ViewUserDialog userId={user._id} />

                  {/* Edit Button */}

                  <EditUserDialog
                    defaultName={user.name}
                    defaultEmail={user.email}
                    defaultPhone={user.phone}
                    defaultRole={user.role}
                    defaultActive={user.active}
                    defaultEnabledControls={user.enabledControls || []}
                    userId={user._id}
                  />

                  {/* Edit Password */}

                  <EditPasswordDialog
                    defaultpassword=""
                    defaultnewpassword=""
                    userId={user._id}
                  />

                  {/* Delete Button */}
                  <DeleteUser />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

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
  );
};

export default CustomerForm;
