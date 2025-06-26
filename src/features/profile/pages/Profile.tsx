import AccountActivity from "../components/AccountActivity";
import DeleteAccount from "../components/DeleteAccount";
import InfoUser from "../components/InfoUser";
import PersonalInformation from "../components/PersonalInformation";
import SavedAddressesUser from "../components/SavedAddressesUser";

const Profile = () => {
  return (
    <>
      <div className="container mx-auto px-4 min-h-screen mb-10">
        <InfoUser />
        <PersonalInformation />
        <SavedAddressesUser />
        <AccountActivity />
        <DeleteAccount />
      </div>
    </>
  );
};

export default Profile;
