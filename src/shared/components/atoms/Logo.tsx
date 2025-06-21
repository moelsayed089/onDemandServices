import logoH from "../../../assets/icons/NewlogoH.webp";
import logoV from "../../../assets/icons/NewlogoV.webp";

interface ILogo {
  width?: "w-12" | "w-16" | "w-24" | "w-32" | "w-44" | "w-64";
  logo?: "logoH" | "logoV";
}

const Logo: React.FC<ILogo> = ({ width, logo = "logoH" }) => {
  const selectedLogo = logo === "logoH" ? logoH : logoV;

  return <img src={selectedLogo} alt="logo image" className={width} />;
};

export default Logo;
