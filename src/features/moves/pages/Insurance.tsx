import ChosePackage from "../components/ChosePackage";

const Insurance = () => {
  return (
    <>
      <div className="container  min-h-screen mt-5 mb-10  ">
        <h1 className="text-2xl  md:max-w-[60%] md:text-3xl md:leading-10 text-main-color font-medium ">
          Follow the shipping steps with DeliverCo to get started.
        </h1>
        <div>
          <ChosePackage />
        </div>
      </div>
    </>
  );
};

export default Insurance;
