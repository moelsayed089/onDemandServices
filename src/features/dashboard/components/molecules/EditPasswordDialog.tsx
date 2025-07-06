import { useFormik } from "formik";
import { Dialog } from "../../../../shared/components/molecules/Dialog";
import FormField from "../../../../shared/components/molecules/FormField";
import { Button } from "../../../../shared/components/atoms/Button";
import { EditPasswordSchema } from "../../validation/EditPassword";
import useUpdatePassword from "../../services/EditPassword";
import Icon from "../../../../shared/components/atoms/Icon";

interface Props {
  defaultpassword: string;
  defaultnewpassword: string;
  userId: string;
}
const EditPasswordDialog = ({
  defaultpassword,
  defaultnewpassword,
  userId,
}: Props) => {
  const fields: {
    id: keyof typeof formObject.values;
    placeholder: string;
    name: string;
  }[] = [
    {
      id: "password",
      name: "password",
      placeholder: "Old Password",
    },
    { id: "cPassword", name: "cPassword", placeholder: "New Password" },
  ];
  const { mutate, isPending } = useUpdatePassword(userId);
  const formObject = useFormik({
    initialValues: {
      password: defaultpassword || "",
      cPassword: defaultnewpassword || "",
    },
    validationSchema: EditPasswordSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <Dialog>
        <Dialog.Trigger asChild>
          <div className="">
            <Button variant="outline" className="flex items-center gap-1">
              <Icon
                name="square-pen"
                size={16}
                className=" text-pragraph-color "
              />
              Edit Password
            </Button>
          </div>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit Your Password</Dialog.Title>
          </Dialog.Header>
          <Dialog.Description>
            Please enter your current password and the new password you want to
            set.
          </Dialog.Description>
          <div className="flex flex-col gap-4 py-4">
            <form onSubmit={formObject.handleSubmit}>
              <div className="flex flex-col gap-4">
                {fields.map((field) => (
                  <FormField
                    id={field.id}
                    label={field.placeholder}
                    key={field.name}
                    type="password"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formObject.values[field.id]}
                    onChange={formObject.handleChange}
                    onBlur={formObject.handleBlur}
                    error={
                      formObject.touched[field.id]
                        ? formObject.errors[field.id]
                        : undefined
                    }
                    noSpaces={
                      field.name === "password" || field.name === "cPassword"
                    }
                  />
                ))}

                <div className="flex justify-end gap-2">
                  <Button
                    className="hover:cursor-pointer"
                    onClick={formObject.submitForm}
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save"}
                  </Button>

                  <Dialog.Close asChild>
                    <Button
                      variant="destructive"
                      className="hover:cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </Dialog.Close>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default EditPasswordDialog;
