import { NotepadText } from "lucide-react";
import InsuranceCard from "./InsuranceCard";
import { packages } from "../../../shared/data/InsuranceData";

const ChosePackage = () => {
  return (
    <div className="mt-5  ">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-full border border-gray-200/80 text-center">
        <div className="bg-secondary-color mb-4 w-12 h-12 sm:w-12 sm:h-12 mx-auto rounded-full flex items-center justify-center">
          <NotepadText size={25} />
        </div>
        <h2 className="text-body-sm sm:text-body-md md:text-body-lg text-dark-color leading-body-md md:leading-body-lg mb-4">
          Before we create an order, let's choose an insurance package first.
        </h2>
        <p className="w-full sm:w-3/4 mx-auto text-body-xs sm:text-body-sm leading-body-sm text-gray-600 mb-4">
          DeliverCo insurance packages will guarantee you adequate compensation
          in the event of loss or damage to any order.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {packages.map((pkg, index) => (
          <InsuranceCard
            key={index}
            title={pkg.title}
            label={pkg.label}
            price={pkg.price}
            min={pkg.min}
            compensationLost={pkg.compensationLost}
            compensationDamaged={pkg.compensationDamaged}
            buttonText={pkg.buttonText}
            variant={pkg.variant}
            pathLink={pkg.pathLink}
          />
        ))}
      </div>
    </div>
  );
};

export default ChosePackage;
