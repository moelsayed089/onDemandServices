import { Eye } from "lucide-react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Dialog } from "../../../../shared/components/molecules/Dialog";
import useGetUserDetails from "../../services/GetUserDetails";
import FormField from "../../../../shared/components/molecules/FormField";

const ViewUserDialog = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError } = useGetUserDetails(userId!);
  const user = data?.data;
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <Eye className="w-4 h-4 mr-1" />
          View User
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>User Details</Dialog.Title>
        </Dialog.Header>

        <Dialog.Description asChild>
          <p className="text-sm text-muted-foreground">
            View user details and manage their account.
          </p>
        </Dialog.Description>

        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Failed to load user.</p>}

        {user && (
          <div className="flex flex-col gap-2 py-4 text-sm">
            <div>
              <FormField id="name" label="Name" readOnly value={user.name} />
            </div>

            <div>
              <FormField id="email" label="Email" readOnly value={user.email} />
            </div>

            <div>
              <FormField id="phone" label="Phone" readOnly value={user.phone} />
            </div>

            <div>
              <FormField id="role" label="Role" readOnly value={user.role} />
            </div>

            <div>
              <FormField
                id="account_status"
                label="Account Status"
                readOnly
                value={user.account_status}
              />
            </div>

            <div>
              <FormField
                id="active"
                label="Active"
                readOnly
                value={user.active ? "Active" : "Suspended"}
              />
            </div>
          </div>
        )}

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button className="hover:cursor-pointer" variant="secondary">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default ViewUserDialog;
