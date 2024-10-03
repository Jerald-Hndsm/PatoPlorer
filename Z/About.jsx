import React from "react";
import Laptop from "../../assets/img/2.webp";

const About = () => {


  React.useEffect(() => {
 
  }, []);

  return (
    <section id="about" className="pt-16" style={{ userSelect: "none" }}>
      <div className="w-full bg-white pt-16 px-6">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">
          <img
            className="w-full my-4 hidden md:block"
            src={Laptop}
            alt="Laptop"
            width="500" // Set appropriate width
            height="500" // Set appropriate height
          />
          <div className="flex flex-col justify-center space-y-8">
            <p className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-[#00003C]">
              About
            </p>
            <div>
              <h1 className="md:text-3xl sm:text-2xl text-xl pb-2 font-medium py-2 text-[#00003C]">
                About FishLens
              </h1>
              <p className="pb-5 text-[#7b9fb8]">
                FishLens is a revolutionary mobile application that utilizes the
                power of computer vision technology to identify diseases in
                freshwater fish. Developed with the goal of supporting the
                sustainability of the freshwater fish industry, FishLens
                empowers fish farmers, consumers, and industry professionals
                with a user-friendly tool for early and accurate disease
                detection.
              </p>
            </div>
            <div>
              <h1 className="md:text-3xl sm:text-2xl text-xl pb-2 font-medium py-2 text-[#00003C]">
                Our Mission
              </h1>
              <p className="pb-5 text-[#7b9fb8]">
                At FishLens, our mission is to protect freshwater fish by using
                computer vision technology to quickly find and identify level 1
                disease diagnosis. We aim to make it easier for fishfolks and
                experts to be aware and reduce losses. By providing a simple,
                effective tool, we hope to support better fish management,
                improve aquaculture, and contribute to the well-being of aquatic
                ecosystems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
