import * as Yup from "yup";

export const CheckoutSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name too short").required("Full name is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),

  paymentMethod: Yup.string().oneOf(["credit", "paypal"]).required(),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "credit",
    then: (schema) => schema.required("Card number required"),
  }),
  expiryDate: Yup.string().when("paymentMethod", {
    is: "credit",
    then: (schema) => schema.required("Expiry date required"),
  }),
  cardHolder: Yup.string().when("paymentMethod", {
    is: "credit",
    then: (schema) => schema.required("Card holder required"),
  }),
  cvc: Yup.string().when("paymentMethod", {
    is: "credit",
    then: (schema) => schema.required("CVC required"),
  }),
  paypalEmail: Yup.string().when("paymentMethod", {
    is: "paypal",
    then: (schema) =>
      schema.email("Invalid email").required("PayPal email required"),
  }),
});
