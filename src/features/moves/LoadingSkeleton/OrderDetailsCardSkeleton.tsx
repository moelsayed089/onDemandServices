import { Skeleton } from "../../../shared/components/atoms/Skeleton";

const OrderDetailsCardSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* Title */}
            <Skeleton className="h-4 w-full" /> {/* Value */}
            <Skeleton className="h-4 w-2/3" /> {/* Value */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsCardSkeleton;
