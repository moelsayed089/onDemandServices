import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "../../../shared/components/atoms/Avatar";
import SplitName from "../../../utils/SplitName";
import useGetUserData from "../services/GetUserData";
import Icon from "../../../shared/components/atoms/Icon";
// import { Button } from "../../../shared/components/atoms/Button";
// import Loading from "../../../shared/components/molecules/Loading";
import CapitalizeEachWord from "../../../utils/capitalizeEachWord";
import EditProfileDialog from "./EditProfileDialog";
import InfoUserSkeleton from "./InfoUserSkeleton";

const InfoUser = () => {
  const { data, isLoading, isError } = useGetUserData();

  if (isLoading)
    return (
      <div>
        <InfoUserSkeleton />
      </div>
    );
  if (isError) return <div>Error loading user data</div>;

  const nameImage = SplitName(data?.data.name || "");
  const userName = CapitalizeEachWord(data?.data.name || "");

  return (
    <div className="container mt-5">
      {data && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <Avatar className="mx-auto md:mx-0 bg-gradient-to-br from-[#3B82F6] to-[#0A2E65] w-[100px] h-[100px] flex items-center justify-center">
            <AvatarFallback className="text-3xl text-white">
              {nameImage}
            </AvatarFallback>
          </Avatar>

          <div className="text-center md:text-left flex-1">
            <p className="text-dark-color text-body-lg mb-2">{userName}</p>
            <p className="text-pragraph-color text-body-sm mb-2 flex items-center justify-center md:justify-start">
              <Icon
                name="mail"
                size={16}
                className="mr-2 text-pragraph-color"
              />
              {data.data.email}
            </p>
          </div>

          <EditProfileDialog
            defaultName={data.data.name}
            defaultEmail={data.data.email}
            defaultPhone={data.data.phone}
          />
        </div>
      )}
    </div>
  );
};

export default InfoUser;
