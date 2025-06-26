import { Skeleton } from "../../../shared/components/atoms/Skeleton";

const PersonalInformationSkeleton = () => {
  return (
    <div className="container mt-5">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full">
        {/* Title Skeleton */}
        <Skeleton className="h-6 md:h-8 w-[200px] mb-4 mx-auto md:mx-0" />

        {/* Grid of Form-Field Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Password Dialog Button Skeleton */}
        <div className="mt-6">
          <Skeleton className="h-10 w-[150px] rounded-md" />
        </div>

        {/* Paragraph Skeleton */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationSkeleton;
