import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";

interface FormFieldProps extends React.ComponentProps<"input"> {
  id: string;
  label: string;
  error?: string;
  noSpaces?: boolean;
}
const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  error,
  noSpaces,
  ...props
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor={id} className="mb-1">
          {label}
        </Label>
        <Input
          className="bg-gray-100 border-0"
          id={id}
          type={type}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (noSpaces && e.key === " ") {
              e.preventDefault();
            }
            props.onKeyDown?.(e);
          }}
          {...props}
        />
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default FormField;
