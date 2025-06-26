import DeleteDialog from "./DeleteDialog";

const DeleteAccount = () => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full">
          <h2 className="text-body-md md:text-body-lg text-dark-color leading-body-lg mb-4">
            Delete Account
          </h2>
          <p className="text-body-sm text-gray-600 mb-4">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-4">
            <DeleteDialog />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
