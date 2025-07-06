import * as Yup from "yup";

export const EditPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),

  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/^\S*$/, "Password must not contain spaces")
    .required("Password is required"),

  cNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm password is required"),
});
