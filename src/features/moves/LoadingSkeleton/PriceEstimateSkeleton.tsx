import { Skeleton } from "../../../shared/components/ui/skeleton";

const PriceEstimateSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col items-center gap-2 bg-gray-100 border p-5 rounded-2xl">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-24" />
      </div>

      <div className="flex flex-col items-center gap-2 bg-gray-100 border p-5 rounded-2xl">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-28" />
      </div>

      <div className="flex flex-col items-center gap-2 bg-gray-100 border p-5 rounded-2xl">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
};

export default PriceEstimateSkeleton;
