import { Button } from "../../../shared/components/atoms/Button";
import TermsAndConditionsModal from "./TermsAndConditionsModal";

interface InsuranceCardProps {
  title: string;
  label?: string;
  price: string;
  min?: string;
  compensationLost: string;
  compensationDamaged: string;
  buttonText: string;
  variant: "default" | "outline";
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({
  title,
  label,
  price,
  min,
  compensationLost,
  compensationDamaged,
  buttonText,
  variant,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md w-full max-w-full border border-gray-200 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row justify-between items-start md:items-center gap-2 mb-5 sm:mb-7">
        <p className="font-semibold text-xl md:text-base text-dark-color">
          {title}
        </p>
        {label && (
          <span className="text-xs sm:text-sm text-gray-600 bg-secondary-color rounded-md px-2 py-1">
            {label}
          </span>
        )}
      </div>

      <p className="text-body-xs sm:text-body-sm text-gray-700 mb-4 sm:mb-5">
        <span className="font-medium text-primary-color">You will pay</span>
        <br />
        <span className="text-lg sm:text-xl font-bold text-dark-color">
          {price}
        </span>{" "}
        of the product value {min && <span>(Minimum {min})</span>}
      </p>

      <p className="font-semibold text-sm sm:text-md text-dark-color mt-2">
        Package benefits
      </p>
      <ul className="list-disc list-inside text-gray-600 text-left space-y-2 px-2 text-xs sm:text-sm">
        <li>
          In case of lost order, DeliverCo will compensate you up to{" "}
          <span className="font-medium">{compensationLost}</span>.
        </li>
        <li>
          In case of damaged order,{" "}
          <span className="font-medium">
            {compensationDamaged === "Terms and conditions apply." ? (
              <TermsAndConditionsModal />
            ) : (
              compensationDamaged
            )}
          </span>
        </li>
      </ul>

      <Button
        variant={variant}
        className="text-body-xs sm:text-body-sm hover:text-main-color/90 text-main-color hover:cursor-pointer"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default InsuranceCard;
