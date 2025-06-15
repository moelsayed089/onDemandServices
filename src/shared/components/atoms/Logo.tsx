import logo from "../../../assets/icons/logo.webp";
interface ILogo {
  width?: "w-12" | "w-16" | "w-32" | "w-44" | "w-64";
}
const Logo: React.FC<ILogo> = ({ width }) => {
  return (
    <>
      <img src={logo} alt="logo image" className={width} />
    </>
  );
};

export default Logo;
