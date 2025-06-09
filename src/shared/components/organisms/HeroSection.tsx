import HeroImage from "../../../assets/images/HeroSection/HeroImage.png";
import { Button } from "../atoms/Button";

const HeroSection = () => {
  return (
    <section
      className="relative h-[calc(100vh-86px)] bg-gray-500 bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div className="absolute inset-0 bg-main-color/25 z-0" />

      <div className="absolute z-10 top-[150px] md:top-[200px] px-5">
        <h1 className="text-heading-3 leading-heading-3 md:text-heading-2 md:leading-heading-2 lg:text-heading-1 lg:leading-heading-1 font-bold text-white">
          Find the perfect place
          <br /> to move your supplies.
        </h1>

        <p className="mt-4 text-white text-body-md leading-body-md md:text-body-lg md:leading-body-lg lg:text-body-xl lg:leading-body-xl md:max-w-[80%]">
          Explore transportation operations, types of goods, and transportation
          stations.
        </p>

        <Button
          variant="secondary"
          className="mt-4 py-5 w-[200px] text-body-md hover:cursor-pointer"
        >
          Start Now
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
