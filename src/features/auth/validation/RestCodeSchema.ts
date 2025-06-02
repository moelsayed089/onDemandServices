import * as Yup from "yup";

export const ResetCodeSchema = Yup.object().shape({
  resetCode: Yup.string()
    .matches(/^\d{6}$/, "Code must be exactly 6 digits")
    .required("Code is required"),
});
