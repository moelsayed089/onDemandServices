import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";

interface Option {
  label: string;
  value: string;
}

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  noSpaces?: boolean;
  options?: Option[];
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>;

const FormField: React.FC<BaseProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  noSpaces,
  options = [],
  ...props
}) => {
  const isSelect = type === "select";

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className="mb-1">
        {label}
      </Label>

      {isSelect ? (
        <select
          id={id}
          name={id}
          className="bg-gray-100 border-0 p-2 rounded"
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <option value="" disabled>
            Select a vehicle
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (noSpaces && e.key === " ") {
              e.preventDefault();
            }
            props.onKeyDown?.(e);
          }}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default FormField;
