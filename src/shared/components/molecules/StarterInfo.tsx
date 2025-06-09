import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

const StarterInfo = () => {
  return (
    <>
      <h2 className="text-heading-4  leading-heading-4  md:text-heading-3 md:leading-heading-3  font-medium text-center mb-7">
        Register now and start shipping today.
      </h2>

      <Link to="/start">
        <Button
          variant="default"
          className="py-5 w-[200px] mx-auto !text-white text-body-md hover:cursor-pointer mb-[50px]"
        >
          Start Now
        </Button>
      </Link>
    </>
  );
};

export default StarterInfo;
