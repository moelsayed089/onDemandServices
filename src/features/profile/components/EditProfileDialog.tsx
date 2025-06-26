import { useState } from "react";
import { Button } from "../../../shared/components/ui/button";
import { Input } from "../../../shared/components/ui/input";
import useUpdateUserData from "../services/UpdataUserDate";
import Icon from "../../../shared/components/atoms/Icon";
import { Dialog } from "../../../shared/components/molecules/Dialog";

interface Props {
  defaultName: string;
  defaultEmail: string;
  defaultPhone?: string;
}

const EditProfileDialog = ({
  defaultName,
  defaultEmail,
  defaultPhone,
}: Props) => {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState(defaultPhone);

  const { mutate, isPending } = useUpdateUserData();

  const handleSave = () => {
    mutate({ name, email, phone });
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button
          variant="secondary"
          className="flex items-center hover:cursor-pointer"
        >
          <Icon name="square-pen" size={16} className=" text-pragraph-color " />
          Edit Profile
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit Your Profile</Dialog.Title>
        </Dialog.Header>
        <Dialog.Description>
          Update your profile information below.
        </Dialog.Description>
        <div className="flex flex-col gap-4 py-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="phone number"
          />
        </div>

        <Dialog.Footer>
          <Button
            className="hover:cursor-pointer"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>

          <Dialog.Close asChild>
            <Button variant="destructive" className="hover:cursor-pointer">
              Cancel
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default EditProfileDialog;
