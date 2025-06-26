import FormField from "../../../shared/components/molecules/FormField";
// import Loading from "../../../shared/components/molecules/Loading";
import CapitalizeEachWord from "../../../utils/capitalizeEachWord";
import useGetUserData from "../services/GetUserData";
import EditPasswordProfileDialog from "./EditPasswordProfileDialog";
import PersonalInformationSkeleton from "./PersonalInformationSkeleton";

const PersonalInformation = () => {
  const { data, isLoading, isError } = useGetUserData();

  if (isLoading)
    return (
      <div>
        <PersonalInformationSkeleton />
      </div>
    );
  if (isError) return <div>Error loading user data</div>;
  return (
    <>
      <div className="container mt-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full">
          <h2 className="text-body-md md:text-body-lg text-dark-color leading-body-lg mb-4">
            Personal Information
          </h2>
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              <FormField
                id="firstName"
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                readOnly
                value={
                  CapitalizeEachWord(data.data.name.split(" ")[0]) ||
                  "Not provided"
                }
              />
              <FormField
                id="lastName"
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
                readOnly
                value={
                  data.data.name.split(" ")[1]
                    ? CapitalizeEachWord(data.data.name.split(" ")[1])
                    : "Not provided"
                }
              />
              <FormField
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                readOnly
                value={data.data.email || "Not provided"}
              />
              <FormField
                id="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                readOnly
                value={data.data.phone || "Not provided"}
              />
            </div>
          )}

          <EditPasswordProfileDialog
            defaultpassword=""
            defaultnewpassword=""
            defaultcnewpassword=""
          />

          <p className="text-pragraph-color text-body-sm mt-4">
            You can update your personal information at any time by clicking the
            "Edit Profile" button in your profile section.
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
