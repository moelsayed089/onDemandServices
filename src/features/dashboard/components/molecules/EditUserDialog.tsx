import { useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import Icon from "../../../../shared/components/atoms/Icon";
import { Input } from "../../../../shared/components/atoms/Input";
import { Dialog } from "../../../../shared/components/molecules/Dialog";
import useUpdateUserData from "../../services/UpdateUserInfo";

interface Props {
  defaultName: string;
  defaultEmail: string;
  defaultPhone: string;
  defaultRole: string;
  defaultActive: boolean;
  defaultEnabledControls: string[];
  userId: string;
}

const EditUserDialog: React.FC<Props> = ({
  defaultName,
  defaultEmail,
  defaultPhone,
  defaultRole,
  defaultActive,
  defaultEnabledControls,
  userId,
}) => {
  const { mutate, isPending } = useUpdateUserData(userId);

  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState(defaultPhone);
  const [role, setRole] = useState(defaultRole);
  const [active, setActive] = useState(defaultActive);
  const [enabledControls, setEnabledControls] = useState(
    defaultEnabledControls
  );

  const handleSave = () => {
    const updatedControls =
      role === "admin" || role === "superAdmin" ? enabledControls : [];

    mutate({
      name,
      email,
      phone,
      role,
      active,
      enabledControls: updatedControls,
    });
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          <Icon name="square-pen" size={16} className="text-blue-600" />
          Edit User
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit User Details</Dialog.Title>
        </Dialog.Header>
        <Dialog.Description>
          <p className="text-sm text-muted-foreground">
            Edit user details and manage their account.
          </p>
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
            placeholder="Phone Number"
          />
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />

          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active
          </label>

          {(role === "admin" || role === "superAdmin") && (
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={enabledControls.includes("users")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setEnabledControls([...enabledControls, "users"]);
                  } else {
                    setEnabledControls(
                      enabledControls.filter((c) => c !== "users")
                    );
                  }
                }}
              />
              Enable Users Control
            </label>
          )}
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

export default EditUserDialog;
