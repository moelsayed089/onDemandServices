import { useFormik } from "formik";
import { Button } from "../../../shared/components/atoms/Button";
import FormField from "../../../shared/components/molecules/FormField";
import AuthHeader from "./AuthHeader";
import useRestCode from "../services/ResetCodeApi";
import { ResetCodeSchema } from "../validation/RestCodeSchema";
import MainImageAuth from "./atoms/MainImageAuth";
import Spinner from "../../../shared/components/atoms/Spinner";

const ResetCodeForm = () => {
  const { mutate, isPending } = useRestCode();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: ResetCodeSchema,
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col gap-4 p-10 justify-center ">
        <AuthHeader
          text="Reset Code"
          subTitle="Enter your Verification code to reset your password."
        />
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <FormField
            id="resetCode"
            label="Reset Code"
            type="text"
            placeholder="Reset Code"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.resetCode ? formik.errors.resetCode : undefined
            }
          />

          <Button type="submit" className="w-full " variant="default">
            {isPending ? (
              <>
                <Spinner />
                <span className="ml-1">Verifying...</span>
              </>
            ) : (
              "Verify Code"
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

export default ResetCodeForm;
