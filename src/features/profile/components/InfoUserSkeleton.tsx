import { Skeleton } from "../../../shared/components/atoms/Skeleton";

const InfoUserSkeleton = () => {
  return (
    <div className="container mt-5">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Avatar Skeleton */}
        <div className="mx-auto md:mx-0">
          <Skeleton className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#3B82F6] to-[#0A2E65]" />
        </div>

        {/* Text Skeletons */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <Skeleton className="h-6 w-[150px] mx-auto md:mx-0" />
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Skeleton className="h-4 w-4" /> {/* Icon Placeholder */}
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </div>

        {/* Edit Button Skeleton */}
        <Skeleton className="h-10 w-[120px] mx-auto md:mx-0" />
      </div>
    </div>
  );
};

export default InfoUserSkeleton;
