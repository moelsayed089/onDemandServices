import { useFormik } from "formik";
import AuthHeader from "./AuthHeader";
import FormField from "../../../shared/components/molecules/FormField";
import { Button } from "../../../shared/components/atoms/Button";
import { ResendEmailSchema } from "../validation/ResendEmailSchema";
import useConfirmEmail from "../services/confirmEmail";
import MainImageAuth from "./atoms/MainImageAuth";

const ResendEmailForm = () => {
  const { mutate, isPending } = useConfirmEmail();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResendEmailSchema,
    onSubmit: (values) => mutate(values),
  });
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col gap-4 p-10 justify-center ">
        <AuthHeader
          text="Resend Email"
          subTitle="Enter your email address to resend the confirmation email."
        />
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <FormField
            id="email"
            label="Resend Email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email : undefined}
          />

          <Button type="submit" className="w-full " variant="default">
            {isPending ? "Loading..." : "Resend Email"}
          </Button>
        </form>
      </div>

      <div className="hidden md:block w-1/2 h-full">
        <MainImageAuth />
      </div>
    </div>
  );
};

export default ResendEmailForm;
