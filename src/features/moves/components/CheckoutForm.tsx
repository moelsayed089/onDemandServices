import { useFormik } from "formik";
import { Button } from "../../../shared/components/atoms/Button";
import BillingSection from "./BillingSection";
import PaymentSection from "./PaymentMethodSection";
import { CheckoutSchema } from "../validation/CheckoutSchema";
import { useState } from "react";
import Spinner from "../../../shared/components/atoms/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      paymentMethod: "credit",
      cardNumber: "",
      expiryDate: "",
      cardHolder: "",
      cvc: "",
      paypalEmail: "",
    },
    validationSchema: CheckoutSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        console.log("✅ Final Data:", values);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success("Order submitted successfully!", {
          position: "bottom-right",
        });
        navigate("/trips");
      } catch (error) {
        toast.error("Failed to submit order", { position: "bottom-right" });
        return error;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <h1 className="text-body-xl text-main-color font-semibold ">
        Checkout Order
      </h1>
      <p className="mb-2 text-body-md text-gray-500">
        Please fill out the form below to complete your order
      </p>
      <p className="mb-6 text-sm text-red-600">
        This is a fake checkout form for demo purposes
      </p>
      <form onSubmit={formik.handleSubmit}>
        <BillingSection formik={formik} />
        <PaymentSection formik={formik} />

        <div className="flex justify-start">
          <Button type="submit">
            {isLoading ? (
              <>
                <Spinner />
                <span className="ml-1">Processing...</span>
              </>
            ) : (
              "Checkout Now"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
