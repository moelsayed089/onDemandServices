import { Dialog } from "../../../shared/components/molecules/Dialog";

const TermsAndConditionsModal = () => {
  return (
    <>
      <Dialog>
        <Dialog.Trigger asChild>
          <button className="text-blue-600 underline hover:text-blue-800 hover:cursor-pointer text-xs">
            Terms and conditions apply.
          </button>
        </Dialog.Trigger>

        <Dialog.Content className="">
          <Dialog.Header>
            <Dialog.Title className="text-2xl font-semibold">
              Terms And Conditions
            </Dialog.Title>
          </Dialog.Header>

          <div className="space-y-6 text-sm text-gray-700 mt-4">
            <Dialog.Description>
              You can request compensation in case of shipment damage or any
              other problem by following the following terms and conditions:
            </Dialog.Description>

            <div className="border-t pt-4">
              <p className="font-medium mb-2">
                1- The damage must be reported within the permitted time:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>In case of delivery: within 24 hours of delivery.</li>
                <li>
                  In case of return: The shipment must be refused from the
                  representative and the complaint must be filed on the same
                  day.
                </li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <p className="font-medium mb-2">
                2- Shipment packaging must follow DeliverCo’s steps, especially
                for:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Food or beverages</li>
                <li>Fragile items (glass, ceramics, etc.)</li>
                <li>Liquids</li>
                <li>Large items over 20kg or 120x105cm</li>
                <li>Checks, guarantee letters, or original documents</li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <p className="font-medium">
                3- The product value must be clearly stated when creating the
                order.
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="font-medium">
                4- The product description and number of pieces must be added
                when creating the order.
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default TermsAndConditionsModal;
