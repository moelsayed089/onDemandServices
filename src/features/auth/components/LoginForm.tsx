import FormField from "../../../shared/components/molecules/FormField";
import Image from "../../../shared/components/atoms/Image";
import image from "../../../assets/images/mainlogin.png";
import { Button } from "../../../shared/components/atoms/Button";
import { useFormik } from "formik";
import useLoginAuth from "../services/loginAuth";

import AuthHeader from "./AuthHeader";
import { LoginSchema } from "../validation/LoginSchema";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { mutate, isPending } = useLoginAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col gap-4 p-10 justify-center ">
        <AuthHeader
          text="Login to your account"
          subTitle="Don't have an account?"
          link="Sign up"
          to="/register"
        />
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email : undefined}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password ? formik.errors.password : undefined}
          />
          <Link
            to="/forgetpassword"
            className="text-main-color underline text-end text-sm font-medium"
          >
            Forgot Password
          </Link>
          <Button type="submit" className="w-full " variant="default">
            {isPending ? "Loading..." : "Login"}
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

export default LoginForm;
