import FormField from "../../../shared/components/molecules/FormField";
import Image from "../../../shared/components/atoms/Image";
import image from "../../../assets/images/mainlogin.png";
import { Button } from "../../../shared/components/atoms/Button";
import { useFormik } from "formik";
import useSigninAuth from "../services/signinAuth";

import AuthHeader from "./AuthHeader";
import { SignupSchema } from "../validation/SignupSchema";

const SignupForm = () => {
  const fields: {
    id: keyof typeof formik.values;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    { id: "name", label: "Name", type: "text", placeholder: "Name" },
    { id: "email", label: "Email", type: "email", placeholder: "Email" },
    { id: "phone", label: "Phone", type: "phone", placeholder: "Phone" },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
    },
    {
      id: "cPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  const { mutate, isPending } = useSigninAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      cPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col gap-4 p-10 justify-center ">
        <AuthHeader
          text="Sign Up to your account"
          subTitle="Already have an account?"
          link="Sign In"
          to="/login"
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
            />
          ))}
          <Button type="submit" className="w-full " variant="default">
            {isPending ? "Loading..." : "Sign up"}
          </Button>
        </form>
      </div>

      <div className="hidden md:block w-1/2 h-full">
        <Image
          src={image}
          alt="login illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignupForm;
