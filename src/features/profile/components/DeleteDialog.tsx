import { Button } from "../../../shared/components/atoms/Button";
import Icon from "../../../shared/components/atoms/Icon";
import { Dialog } from "../../../shared/components/molecules/Dialog";

const DeleteDialog = () => {
  return (
    <>
      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="destructive" className=" hover:cursor-pointer">
            <Icon name="square-pen" size={16} className=" text-white" />
            Delete Account
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

export default DeleteDialog;
