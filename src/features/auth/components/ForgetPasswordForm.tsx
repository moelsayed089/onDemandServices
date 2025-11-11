import { useFormik } from "formik";
import { Button } from "../../../shared/components/atoms/Button";
import FormField from "../../../shared/components/molecules/FormField";
import AuthHeader from "./AuthHeader";
import { ForgetPasswordSchema } from "../validation/ForgetPasswordSchema";
import useForgetPassword from "../services/ForgetPasswordApi";
import MainImageAuth from "./atoms/MainImageAuth";
import Spinner from "../../../shared/components/atoms/Spinner";

const ForgetPasswordForm = () => {
  const { mutate, isPending } = useForgetPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => mutate(values),
  });
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col gap-4 p-10 justify-center ">
        <AuthHeader
          text="Forget Password"
          subTitle="Enter your email address to resend the verification code to email."
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
            {isPending ? (
              <>
                <Spinner />
                <span className="ml-1">Resending...</span>
              </>
            ) : (
              "Resend Email"
            )}
          </Button>
        </form>
      </div>

      <div className="hidden md:block w-1/2 h-full">
        <MainImageAuth />
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
