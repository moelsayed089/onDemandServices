/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye } from "lucide-react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Dialog } from "../../../../shared/components/molecules/Dialog";
import FormField from "../../../../shared/components/molecules/FormField";
import useGetDriverDetailsAdmin from "../../services/GetDriverDetailsServiceAdmin";
const ViewDriverAdminDialog = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError } = useGetDriverDetailsAdmin(userId!);

  const driver = data?.data;

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
          <Dialog.Title>Driver Details</Dialog.Title>
        </Dialog.Header>

        <Dialog.Description asChild>
          <p className="text-sm text-muted-foreground">
            View Driver details and manage their account.
          </p>
        </Dialog.Description>

        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Failed to load user.</p>}

        {driver && (
          <div className="flex flex-col gap-2 py-4 text-sm">
            <FormField
              id="name"
              label="Name"
              readOnly
              value={driver.user.name}
            />
            <FormField
              id="isAvailable"
              label="Is Available"
              readOnly
              value={driver.isAvailable ? "Yes" : "No"}
            />
            <FormField
              id="history"
              label="History"
              readOnly
              value={driver.history[0]}
            />
            <FormField
              id="phone"
              label="Phone"
              readOnly
              value={driver.user.phone}
            />
            {driver.documents && (
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-sm mb-1">Documents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(driver.documents).map(
                    ([key, doc]: [string, any]) => (
                      <div
                        key={key}
                        className="flex flex-col items-center p-2 border rounded shadow-sm bg-white"
                      >
                        <img
                          src={doc.url}
                          alt={key}
                          className="max-h-32 w-auto rounded object-contain border mb-2"
                        />
                        <span className="text-xs text-gray-600 capitalize">
                          {key}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
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
export default ViewDriverAdminDialog;
