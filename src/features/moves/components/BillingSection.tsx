/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "../../../shared/components/atoms/Input";

interface BillingSectionProps {
  formik: any;
}

export default function BillingSection({ formik }: BillingSectionProps) {
  const fields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "+20 123 456 789",
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: "Street, Building",
    },
    { id: "city", label: "City", type: "text", placeholder: "Cairo" },
  ];

  return (
    <section className="mb-6 space-y-8 bg-white p-5 rounded-sm border border-gray-200/80 ">
      <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => (
          <div className="flex flex-col gap-2" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <Input
              id={field.id}
              name={field.id}
              type={field.type}
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
    </section>
  );
}
