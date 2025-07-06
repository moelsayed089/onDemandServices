import { UserX } from "lucide-react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Dialog } from "../../../../shared/components/molecules/Dialog";

const DeleteUser = () => {
  return (
    <>
      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="destructive" className=" hover:cursor-pointer">
            <UserX size={16} className="w-4 h-4 text-white" />
            Delete
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Delete Account</Dialog.Title>
          </Dialog.Header>
          <Dialog.Description>
            Are you sure you want to delete your account? This action cannot be
            undone. All your data will be permanently removed.
          </Dialog.Description>

          <Dialog.Footer>
            <Button className="hover:cursor-pointer" variant="secondary">
              Save
            </Button>

            <Dialog.Close asChild>
              <Button variant="destructive" className="hover:cursor-pointer">
                Cancel
              </Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default DeleteUser;
