import { Button } from "../../../shared/components/atoms/Button";
import Icon from "../../../shared/components/atoms/Icon";

const SavedAddressesUser = () => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full">
          <h2 className="text-body-md md:text-body-lg text-dark-color leading-body-lg mb-4">
            Saved Addresses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-5 ">
            <div className="flex flex-col gap-4">
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <Icon name="location" className="w-5 h-5" />
                    <span className="text-lg font-semibold text-gray-800">
                      Home Address
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    123 Main St, Springfield, IL 62701
                  </p>
                </div>

                <div className="flex justify-end gap-2 w-full md:w-auto md:justify-normal md:self-auto self-end">
                  <Button
                    variant="link"
                    className="text-body-md text-pragraph-color hover:cursor-pointer"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    className="text-body-md text-red-500 hover:cursor-pointer "
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <Icon name="location" className="w-5 h-5" />
                    <span className="text-lg font-semibold text-gray-800">
                      Home Address
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    123 Main St, Springfield, IL 62701
                  </p>
                </div>

                <div className="flex justify-end gap-2 w-full md:w-auto md:justify-normal md:self-auto self-end">
                  <Button
                    variant="link"
                    className="text-body-md text-pragraph-color hover:cursor-pointer"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    className="text-body-md text-red-500 hover:cursor-pointer "
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedAddressesUser;
