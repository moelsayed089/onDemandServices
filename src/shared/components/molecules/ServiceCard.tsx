import Image from "../atoms/Image";
import Icon, { type IconName } from "../atoms/Icon";
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const ServiceCard = ({
  icon,
  title,
  description,
  image,
  reverse = false,
}: ServiceCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-7 items-center p-3 mb-10 ">
      <div
        className={`flex flex-col gap-4 ${
          reverse ? "order-2 md:order-1" : "order-2 md:order-2"
        }`}
      >
        <Icon name={icon as IconName} size={35} className="text-main-color" />
        <h4 className="text-heading-4 leading-heading-4 font-medium">
          {title}
        </h4>
        <p className="text-body-md leading-body-text-body-md">{description}</p>
      </div>

      <div
        className={`${reverse ? "order-1 md:order-2" : "order-1 md:order-1"}`}
      >
        <Image
          src={image}
          alt={title}
          className="w-full rounded-3xl md:h-[250px]"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
