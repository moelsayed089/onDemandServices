import FormField from "../../../shared/components/molecules/FormField";
import Image from "../../../shared/components/atoms/Image";
import image from "../../../assets/images/mainlogin.png";
import { Button } from "../../../shared/components/atoms/Button";
import LoginHeader from "./LoginHeader";
import { useFormik } from "formik";
import useLoginAuth from "../services/loginAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../authSlice";

const LoginForm = () => {
  const { mutate, isPending } = useLoginAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: LoginSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (data) => {
          dispatch(
            loginSuccess({
              role: data.data.role,
              accessToken: data.accessToken,
            })
          );
          if (data.data.role === "superAdmin") navigate("/admin");
          else if (data.data.role === "driver") navigate("/driver");
          else navigate("/user");
        },
        onError: (error) => {
          console.error("Login Error:", error.message);
        },
      });
    },
  });
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col gap-4 p-10 justify-center ">
        <LoginHeader
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
