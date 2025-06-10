import Image from "../atoms/Image";
import image1 from "../../../assets/images/AboutSection/AboutSection.png";
import StarterInfo from "../molecules/StarterInfo";
const AboutSection = () => {
  return (
    <>
      <section className="container min-h-screen mt-10 px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-blue-900 font-bold md:text-heading-4  lg:text-heading-3 text-heading-4  rounded-2xl mb-6 md:mb-10 ">
              <span className="bg-lime-200 box-decoration-clone px-3 rounded-2xl ">
                Information About DeliverCo Company
              </span>
            </h1>

            <p className="text-gray-color font-medium md:text-body-md md:leading-body-md lg:text-body-lg lg:leading-body-lg mb-6 md:mb-12 w-[100%]  ">
              DeliverCo is a leading logistics and technology company founded in
              Egypt with the goal of expanding and empowering the logistics
              industry across the region. Founded in 2024, DeliverCo promises to
              make shipping easy, from small documents and parcels to large and
              heavy items, for all types of businesses, regardless of size
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src={image1}
              alt="AboutSection"
              className="w-[80%] md:w-[70%] lg:w-[70%] "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10  mt-16 text-start">
          <div className=" relative   ">
            <div className="bg-gray-100 rounded-[10px] lg:max-w-[75%] p-7 lg:rounded-tl-4xl lg:rounded-br-[70px] gap-3   ">
              <p className="text-[#035095] text-heading-4 leading-heading-4 font-bold ">
                Today, since 2024, DeliverCo has successfully delivered more
                than
              </p>
            </div>
            <div className="bg-[#A4DE0299] lg:max-w-[30%] rounded-[10px] p-7 lg:rounded-tl-[70px] lg:rounded-tr-[10px]  lg:h-[150px]  flex flex-col items-center justify-center lg:absolute bottom-0 top-[110px] right-[220px] mt-2 ">
              <div className="flex lg:flex-col items-center gap-3  ">
                <p className=" text-[#035095]  text-heading-4 leading-heading-4 font-bold  ">
                  +2000
                </p>
                <p className=" text-[#035095] text-heading-4 leading-heading-4 font-bold ">
                  parcels
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="relative text-[#035095] text-heading-4 leading-heading-4 font-bold text-center mb-3">
              Our vision.
            </h3>
            <p className="font-medium md:text-body-md md:leading-body-md lg:text-body-lg lg:leading-body-lg mb-6 md:mb-12 w-[100%]  ">
              Leveraging our solid expertise and broad vision in the field of
              e-commerce, we believe that technology can provide a definitive
              new definition of the global logistics landscape. Leveraging our
              solid expertise .
            </p>
          </div>
        </div>
        <div className="mt-7 md:mt-16 flex flex-col justify-center items-center  ">
          <StarterInfo />
        </div>
      </section>
    </>
  );
};

export default AboutSection;
