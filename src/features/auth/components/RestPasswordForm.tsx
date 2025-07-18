import { useFormik } from "formik";
import AuthHeader from "./AuthHeader";
import FormField from "../../../shared/components/molecules/FormField";
import { Button } from "../../../shared/components/atoms/Button";
import useRestPassword from "../services/RestPasswordApi";
import { RestPasswordSchema } from "../validation/RestPasswordSchema";
import MainImageAuth from "./atoms/MainImageAuth";

const RestPasswordForm = () => {
  const fields: {
    id: keyof typeof formik.values;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    { id: "email", label: "Email", type: "email", placeholder: "Email" },
    {
      id: "newPassword",
      label: "newPassword",
      type: "password",
      placeholder: "newPassword",
    },
    {
      id: "cNewPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  const { mutate, isPending } = useRestPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      cNewPassword: "",
    },
    validationSchema: RestPasswordSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col gap-4 p-10 justify-center ">
        <AuthHeader
          text="Reset Password"
          subTitle="Enter your email address to reset your password."
        />
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          {fields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={formik.values[field.id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field.id] ? formik.errors[field.id] : undefined
              }
              noSpaces={
                field.id === "newPassword" || field.id === "cNewPassword"
                  ? true
                  : false
              }
            />
          ))}
          <Button type="submit" className="w-full " variant="default">
            {isPending ? "Loading..." : "Reset Password"}
          </Button>
        </form>
      </div>

      <div className="hidden md:block w-1/2 h-full">
        <MainImageAuth />
      </div>
    </div>
  );
};

export default RestPasswordForm;
