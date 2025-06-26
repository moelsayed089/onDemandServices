import { Skeleton as ShadcnSkeleton } from "../ui/skeleton";
export const Skeleton = (
  props: React.ComponentProps<typeof ShadcnSkeleton>
) => {
  return <ShadcnSkeleton {...props} />;
};
