import HeroSection from "../shared/components/organisms/HeroSection";
import PricingInfoSection from "../shared/components/organisms/PricingInfoSection";
import Services from "../shared/components/organisms/Services";
import StarterSection from "../shared/components/organisms/StarterSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Services />
      <PricingInfoSection />
      <StarterSection />
    </>
  );
};

export default Home;
