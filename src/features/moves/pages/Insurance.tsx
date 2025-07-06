import ChosePackage from "../components/ChosePackage";

const Insurance = () => {
  return (
    <>
      <div className="  min-h-[75vh]  ">
        <h1 className="text-2xl  md:max-w-[50%] md:text-3xl md:leading-10 text-main-color font-medium ">
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
