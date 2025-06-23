import StarterCheckIsLoggin from "./StarterCheckIsLoggin";

const StarterInfo = () => {
  return (
    <>
      <h2 className="text-heading-4  leading-heading-4  md:text-heading-3 md:leading-heading-3  font-medium text-center mb-7">
        Register now and start shipping today.
      </h2>
      <StarterCheckIsLoggin className="!text-white" />
    </>
  );
};

export default StarterInfo;
