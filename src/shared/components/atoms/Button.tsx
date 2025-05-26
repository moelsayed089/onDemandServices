import { Button as ShadButton } from "../ui/button";
export const Button = ({
  ...props
}: React.ComponentProps<typeof ShadButton>) => {
  return <ShadButton {...props}  />;
};
