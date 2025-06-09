import { serviceData } from "../../data/ServiceData";
import ServiceCard from "../molecules/ServiceCard";

const Services = () => {
  return (
    <>
      <section className="container h-screen mt-16 ">
        <h2 className="text-heading-4  leading-heading-4  md:text-heading-3 md:leading-heading-3 lg:text-heading-2 lg:leading-heading-2 font-medium text-center mb-12">
          Empowering businesses through DeliverCo services and solutions.
        </h2>

        {serviceData.map(({ icon, title, description, image, reverse }) => (
          <ServiceCard
            key={title}
            icon={icon}
            title={title}
            description={description}
            image={image}
            reverse={reverse}
          />
        ))}
      </section>
    </>
  );
};

export default Services;
