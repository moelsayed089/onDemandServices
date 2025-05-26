import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";

interface FormFieldProps extends React.ComponentProps<"input"> {
  id: string;
  label: string;
  error?: string;
}
const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  error,
  ...props
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type={type} placeholder={placeholder} {...props} />
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default FormField;
