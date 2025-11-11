/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "../../../shared/components/atoms/Input";

interface PaymentSectionProps {
  formik: any;
}

export default function PaymentSection({ formik }: PaymentSectionProps) {
  const [method, setMethod] = useState<"credit" | "paypal">(
    formik.values.paymentMethod || "credit"
  );

  const creditFields = [
    {
      id: "cardNumber",
      label: "Card Number",
      placeholder: "1234 5678 9012 3456",
    },
    { id: "expiryDate", label: "Expiry Date", placeholder: "MM/YY" },
    { id: "cardHolder", label: "Card Holder", placeholder: "John Doe" },
    { id: "cvc", label: "CVC", placeholder: "123" },
  ];

  return (
    <section className="mb-6 space-y-8 bg-white p-5 rounded-sm border border-gray-200/80 ">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

      <div className="flex gap-6 mb-5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="credit"
            checked={formik.values.paymentMethod === "credit"}
            onChange={(e) => {
              formik.handleChange(e);
              setMethod("credit");
            }}
            className="accent-blue-600"
          />
          Credit Card
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={formik.values.paymentMethod === "paypal"}
            onChange={(e) => {
              formik.handleChange(e);
              setMethod("paypal");
            }}
            className="accent-blue-600"
          />
          PayPal
        </label>
      </div>

      {method === "credit" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creditFields.map((field) => (
            <div className="flex flex-col gap-2" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <Input
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                value={formik.values[field.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[field.id] && formik.errors[field.id] && (
                <p className="text-sm text-destructive">
                  {formik.errors[field.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label htmlFor="paypalEmail">PayPal Email</label>
          <Input
            id="paypalEmail"
            name="paypalEmail"
            placeholder="you@example.com"
            value={formik.values.paypalEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.paypalEmail && formik.errors.paypalEmail && (
            <p className="text-sm text-destructive">
              {formik.errors.paypalEmail}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
