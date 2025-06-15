import image1 from "../../assets/images/ServicesSection/image1.webp";
import image2 from "../../assets/images/ServicesSection/image2 .webp";
import image3 from "../../assets/images/ServicesSection/image3.webp";
import image4 from "../../assets/images/ServicesSection/image4.webp";

interface ServiceDataProps {
  icon: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}
export const serviceData: ServiceDataProps[] = [
  {
    icon: "moon-star",
    title: "Delivery between one day and one night",
    description:
      "Get next-day delivery for orders with a 96% success rate, one of the highest rates in the logistics market.",
    image: image1,
    reverse: true,
  },
  {
    icon: "map-pin-minus",
    title: "Delivery to all over Egypt",
    description:
      "Bosta provides comprehensive coverage throughout the country, with more than 25 distribution centers covering all governorates of Egypt, and the number is still growing.",
    image: image2,
    reverse: false,
  },
  {
    icon: "plane",
    title: "Shipping from all over the world",
    description:
      "Bosta enables you to import any type of goods and supplies from anywhere in the world and receive them at the location you wish to deliver to within Egypt through DeliverCo.",
    image: image3,
    reverse: true,
  },
  {
    icon: "shield",
    title: "Excellent fulfillment service",
    description:
      "Store, sell, and ship! It's simple and easy, just a few steps away from delivering your orders.",
    image: image4,
    reverse: false,
  },
];
