import Image from "../atoms/Image";
import Startnow from "../../../assets/images/StarterSection/Frame.png";
import StarterInfo from "../molecules/StarterInfo";

const StarterSection = () => {
  return (
    <>
      <section className=" min-h-[350px]  mt-10 flex flex-col items-center justify-center ">
        <Image src={Startnow} alt="Startnow" className=" w-full mb-10" />
        <StarterInfo />
      </section>
    </>
  );
};

export default StarterSection;
