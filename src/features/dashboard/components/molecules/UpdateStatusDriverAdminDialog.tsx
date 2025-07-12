import { Button } from "../../../../shared/components/atoms/Button";
import { Dialog } from "../../../../shared/components/molecules/Dialog";
import { useFormik } from "formik";
import useUpdateDriverStatusAdmin from "../../services/UpdateStatusDriverAdminService";
import Icon from "../../../../shared/components/atoms/Icon";

const UpdateStatusDriverAdminDialog = ({ user_id }: { user_id: string }) => {
  const { mutate, isPending } = useUpdateDriverStatusAdmin(user_id);
  const formObj = useFormik({
    initialValues: {
      status: "",
      reason: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      mutate(values);
    },
  });
  return (
    <>
      <Dialog>
        <Dialog.Trigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <Icon name="square-pen" size={16} className="text-blue-600" />
            Update Status
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Update Driver Status</Dialog.Title>
          </Dialog.Header>

          <Dialog.Description asChild>
            <p className="text-sm text-muted-foreground">
              Update the status of the driver.
            </p>
          </Dialog.Description>

          <form className="space-y-4" onSubmit={formObj.handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="border rounded p-2 w-full"
                value={formObj.values.status}
                onChange={formObj.handleChange}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="pending">pending</option>
                <option value="accepted">accepted</option>
                <option value="rejected">rejected</option>
                <option value="suspended">suspended</option>
              </select>

              <div className="flex flex-col gap-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Reason
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  className="border rounded p-2 w-full"
                  placeholder="Please Enter reason for status update (if a rejection or suspension)"
                  value={formObj.values.reason}
                  onChange={formObj.handleChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Updating..." : "Update Status"}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default UpdateStatusDriverAdminDialog;
