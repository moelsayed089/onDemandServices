import Image from "../../../../shared/components/atoms/Image";
import image from "..//../../../assets/images/mainlogin.webp";
const MainImageAuth = () => {
  return (
    <>
      <Image
        src={image}
        alt="login illustration"
        className="w-full h-full object-cover"
      />
    </>
  );
};

export default MainImageAuth;
