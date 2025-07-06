import {
  formatFullDate,
  formatMonthYear,
  formatTime,
} from "../../../utils/GetDateAndDayes";
import useGetUserData from "../services/GetUserData";
import AccountActivitySkeleton from "./LoadingSkeleton/AccountActivitySkeleton";

const AccountActivity = () => {
  const { data, isLoading } = useGetUserData();

  if (isLoading)
    return (
      <div>
        <AccountActivitySkeleton />
      </div>
    );

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full">
          <h2 className="text-body-md md:text-body-lg text-dark-color leading-body-lg mb-4">
            Account Activity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-5 ">
            <div className="p-5 bg-white rounded-2xl text-center   flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-body-sm font-semibold text-pragraph-color">
                  Member Since
                </span>
                <p className="text-body-lg text-gray-600 mt-1">
                  {formatMonthYear(data?.data.createdAt)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-body-sm font-semibold text-pragraph-color">
                  Last Login
                </span>
                <p className="text-body-lg text-gray-600 mt-1">
                  {formatFullDate(data?.data.updatedAt)} at{" "}
                  {formatTime(data?.data.updatedAt)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-body-sm font-semibold text-pragraph-color">
                  Shipments Completed
                </span>
                <p className="text-body-lg text-gray-600 mt-1">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountActivity;
