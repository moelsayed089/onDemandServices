import Image from "../atoms/Image";
import shap1 from "../../../assets/images/PricingInfo/shape1.webp";
import shap2 from "../../../assets/images/PricingInfo/shape2.webp";

const PricingInfoSection = () => {
  return (
    <>
      <section className=" relative  mt-16   overflow-hidden">
        <div className="container  flex flex-col items-center justify-center min-h-[500px] ">
          <h2 className="text-heading-4  leading-heading-4  md:text-heading-3 md:leading-heading-3 lg:text-heading-2 lg:leading-heading-2 font-medium text-center mb-7">
            Flexible prices for everyone
          </h2>

          <p className="text-body-md leading-body-md  md:max-w-[55%] text-center">
            You can customize a pricing plan based on your needs. Customize your
            plan with the DeliverCo sales team, and we can guarantee the best
            shipping experience and higher sales.
          </p>
          <Image
            src={shap1}
            alt="pricing-info"
            className="absolute right-[-25px] w-[300px] blur-[10px] md:blur-[0px] "
          />
          <Image
            src={shap2}
            alt="pricing-info"
            className="absolute left-[-25px] w-[300px] blur-[10px] md:blur-[0px] "
          />
        </div>
      </section>
    </>
  );
};

export default PricingInfoSection;
