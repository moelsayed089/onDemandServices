import { Avatar as ShadAvatar } from "../ui/avatar";
export const Avatar = ({
  ...props
}: React.ComponentProps<typeof ShadAvatar>) => {
  return <ShadAvatar {...props} />;
};
