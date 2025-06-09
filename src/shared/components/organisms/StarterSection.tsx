import Image from "../atoms/Image";
import Startnow from "../../../assets/images/StarterSection/Frame.png";
import { Button } from "../atoms/Button";
import { Link } from "react-router-dom";

const StarterSection = () => {
  return (
    <>
      <section className=" min-h-[350px]  mt-10 flex flex-col items-center justify-center ">
        <Image src={Startnow} alt="Startnow" className=" w-full mb-10" />
        <h2 className="text-heading-4  leading-heading-4  md:text-heading-3 md:leading-heading-3  font-medium text-center mb-7">
          Register now and start shipping today.
        </h2>

        <Link to="/start">
          <Button
            variant="default"
            className="py-5 w-[200px] mx-auto !text-white text-body-md hover:cursor-pointer"
          >
            Start Now
          </Button>
        </Link>
      </section>
    </>
  );
};

export default StarterSection;
