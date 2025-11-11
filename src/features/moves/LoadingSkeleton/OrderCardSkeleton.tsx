import { Skeleton } from "../../../shared/components/atoms/Skeleton";

const OrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-md border shadow-sm border-gray-100 p-3">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-28 mt-3" />
    </div>
  );
};

export default OrderCardSkeleton;
