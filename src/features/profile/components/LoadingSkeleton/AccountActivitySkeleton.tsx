import { Skeleton } from "../../../../shared/components/atoms/Skeleton";

const AccountActivitySkeleton = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full">
        {/* Title */}
        <Skeleton className="h-6 md:h-8 w-[160px] mb-4" />

        <div className="grid grid-cols-1 gap-5">
          <div className="p-5 bg-white rounded-2xl text-center flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Block 1: Member Since */}
            <div className="flex flex-col gap-2 items-center md:items-start">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-5 w-[140px] mt-1" />
            </div>

            {/* Block 2: Last Login */}
            <div className="flex flex-col gap-2 items-center md:items-start">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-5 w-[200px] mt-1" />
            </div>

            {/* Block 3: Shipments Completed */}
            <div className="flex flex-col gap-2 items-center md:items-start">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-5 w-[40px] mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActivitySkeleton;
