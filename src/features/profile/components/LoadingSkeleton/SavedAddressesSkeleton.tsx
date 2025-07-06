import { Skeleton } from "../../../../shared/components/ui/skeleton";

export function SavedAddressesSkeleton() {
  return (
    <div className="container mt-5 mb-5">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full">
        <Skeleton className="h-6 md:h-8 w-[180px] mb-4" />

        <div className="grid grid-cols-1 gap-5">
          {[1, 2].map((_, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="h-5 w-[120px]" />
                  </div>
                  <Skeleton className="h-4 w-[250px] mt-1" />
                </div>

                <div className="flex justify-end gap-2 w-full md:w-auto self-end md:self-auto">
                  <Skeleton className="h-4 w-[50px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
