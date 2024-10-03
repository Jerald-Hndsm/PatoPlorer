import React from "react";
import heropic from "../../assets/img/1.webp";
import { scroller } from "react-scroll";

const Hero = () => {


  React.useEffect(() => {
 
  }, []);

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    scroller.scrollTo(sectionId, {
      duration: 0,
      delay: 0,
      smooth: "",
      offset: -30, // Adjust this based on your navbar height
    });
  };

  return (
    <section id="home" className="pt-52 pb-10" style={{ userSelect: "none" }}>
      <div className="w-full bg-white py-15 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="md:text-6xl sm:text-3xl text-2xl font-bold py-2">
              Transforming Aquaculture with FishLens
            </h1>
            <p className="text-[#7b9fb8]">
              FishLens helps to detect diseases in freshwater fishes using
            </p>
            <p className="text-[#7b9fb8]">Computer Vision Technology.</p>
            <a
              href="#about"
              onClick={(e) => scrollToSection("about", e)}
              className="bg-[#00003C] text-[#ffffff] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-center cursor-pointer"
            >
              Learn More
            </a>
          </div>
          <img
            className="w-full my-4 hidden md:block"
            src={heropic}
            alt="Hero Image"
            width="500" // Set appropriate width
            height="500" // Set appropriate height
            loading="eager" // Ensure it's loaded as a priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
