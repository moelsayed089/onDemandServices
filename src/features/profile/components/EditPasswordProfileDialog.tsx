import { Button } from "../../../shared/components/atoms/Button";
import Icon from "../../../shared/components/atoms/Icon";
import useUpdatePasswordProfile from "../services/UpdatePasswordProfile";
import { Dialog } from "../../../shared/components/molecules/Dialog";
import { useFormik } from "formik";
import { EditPasswordSchema } from "../validation/EditPasswordProfile";
import FormField from "../../../shared/components/molecules/FormField";
import Spinner from "../../../shared/components/atoms/Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  defaultpassword: string;
  defaultnewpassword: string;
  defaultcnewpassword: string;
}
const EditPasswordProfileDialog = ({
  defaultpassword,
  defaultnewpassword,
  defaultcnewpassword,
}: Props) => {
  const fields: {
    id: keyof typeof formObject.values;
    placeholder: string;
    name: string;
  }[] = [
    {
      id: "currentPassword",
      name: "currentPassword",
      placeholder: "Old Password",
    },
    { id: "newPassword", name: "newPassword", placeholder: "New Password" },
    {
      id: "cNewPassword",
      name: "cNewPassword",
      placeholder: "Confirm New Password",
    },
  ];
  const { mutate, isPending } = useUpdatePasswordProfile();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const formObject = useFormik({
    initialValues: {
      currentPassword: defaultpassword || "",
      newPassword: defaultnewpassword || "",
      cNewPassword: defaultcnewpassword || "",
    },
    validationSchema: EditPasswordSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          toast.success("Password updated successfully", {
            position: "bottom-right",
          });
          setIsOpen(false);
          setTimeout(() => navigate("/login"), 2000);
        },
        onError: () => {
          toast.error("Error updating password", { position: "bottom-right" });
        },
      });
    },
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <div className="w-fit">
            <Button
              variant="secondary"
              className="flex items-center hover:cursor-pointer mt-5"
            >
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
                      field.id === "currentPassword" ||
                      field.id === "newPassword" ||
                      field.id === "cNewPassword"
                    }
                  />
                ))}

                <div className="flex justify-end gap-2">
                  <Dialog.Close asChild>
                    <Button
                      variant="destructive"
                      className="hover:cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </Dialog.Close>

                  <Button
                    className="hover:cursor-pointer px-5"
                    onClick={formObject.submitForm}
                  >
                    {isPending ? (
                      <>
                        <Spinner />
                        <span className="ml-1">Saving...</span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default EditPasswordProfileDialog;
