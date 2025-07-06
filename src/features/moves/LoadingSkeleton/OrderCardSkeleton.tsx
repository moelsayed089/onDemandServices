import { Skeleton } from "../../../shared/components/atoms/Skeleton";

const OrderCardSkeleton = () => {
  return (
    <div className="container ">
      <div className=" ">
        <div className="bg-white rounded-md border shadow-sm border-gray-100 p-5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-28" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-32 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
