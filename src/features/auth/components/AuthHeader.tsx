import { Link } from "react-router-dom";
import Logo from "../../../shared/components/atoms/Logo";

interface ILoginHeader {
  text: string;
  subTitle?: string;
  link?: string;
  to?: string;
}

const AuthHeader: React.FC<ILoginHeader> = ({ text, subTitle, link, to }) => (
  <div className="flex flex-col gap-2 justify-center items-center">
    <Logo width="w-64" />
    <p className="text-heading-4 font-medium">{text}</p>
    {(subTitle || (link && to)) && (
      <p className="text-body-1 text-gray-500 font-medium">
        {subTitle && <>{subTitle} </>}
        {link && to && (
          <Link to={to} className="text-primary underline">
            {link}
          </Link>
        )}
      </p>
    )}
  </div>
);

export default AuthHeader;
