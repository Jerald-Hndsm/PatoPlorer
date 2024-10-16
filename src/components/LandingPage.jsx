import React from "react";
import { scroller } from "react-scroll";
import heropic from '../asset/image/duck.jpg';
import Laptop from '../asset/image/Duckyfier.png';
import pic1 from '../asset/image/farmer.jpg';


const LandingPage = () => {
  React.useEffect(() => {
    // Any necessary side effects can go here
  }, []);

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    scroller.scrollTo(sectionId, {
      duration: 0,
      delay: 0,
      smooth: "",
      offset: -30, // Adjust this based on your navbar height
    });

    const scrollToSection = (sectionId, e) => {
      e.preventDefault();
      scroller.scrollTo(sectionId, {
        duration: 0,
        delay: 0,
        smooth: "",
        offset: -30, // Adjust this based on your navbar height
      });
    };

  };

  return (
    <>
      {/* Landing Section */}
      <section id="home" className="pt-24 pb-10" style={{ userSelect: "none" }}>
        <div className="w-full bg-[#FFFDF2] px-4">
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="md:text-6xl sm:text-3xl text-2xl font-bold py-2">
                Patoplorer Powered by Machine Learning
              </h1>
              <p className="text-[#7b9fb8]">
                Patoplorer Utilize Production using Machine Learning Algorithm  
              </p>
              <p className="text-[#7b9fb8]">Computer Vision Technology.</p>
              <a
                href="#about"
                onClick={(e) => scrollToSection("about", e)}
                className="bg-[#232226] text-[#ffffff] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-center cursor-pointer"
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

      {/* About Section */}
      <section id="about" style={{ userSelect: "none" }}>
        <div className="w-full bg-[#FFFDF2] pt-16 px-6">
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
                  About Patoplorer
                </h1>
                <p className="pb-5 text-[#7b9fb8]">
                PatoPlorer tackleschallenges in duck farming ecosystem through machine learning forecasting andproduction optimization.
                </p>
              </div>
              <div>
                <h1 className="md:text-3xl sm:text-2xl text-xl pb-2 font-medium py-2 text-[#00003C]">
                  Our Mission
                </h1>
                <p className="pb-5 text-[#7b9fb8]">
                Potentially improving production planning, 
                optimize feed andempowering farmers with data-driven insights. 
                PatoPlorer strives to revolutionize thePhilippine duck industry, 
                ensuring its long-term sustainability and profitability..
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="pt-0 pb-10" style={{ userSelect: "none" }}>
        <div className="w-full bg-[#FFFDF2] px-4">
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="md:text-6xl sm:text-3xl text-2xl font-bold py-2">
                Patoplorer Powered by Machine Learning
              </h1>
              <p className="text-[#7b9fb8]">
              Patoplorer Utilize Production using
              </p>
              <p className="text-[#7b9fb8]">Machine Learning Algorithm</p>

              {/* Add a button to scroll to Contact Section */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  // Scroll to the contact section
                  scrollToSection("contact", e);

                  // Send an email
                  const email = "jeraldvertudez22@gmail.com"; // Replace with the recipient's email
                  const subject = "Contact Us"; // Set the subject of the email
                  const body = "Hello, I would like to get in touch."; // Set the body of the email
                  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
                className="bg-[#00003C] text-[#ffffff] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-center cursor-pointer"
              >
                Contact Us
              </a>

            </div>
            <img
              className="w-full my-4 hidden md:block"
              src={pic1}
              alt="Hero Image"
              width="500"
              height="500"
              loading="eager"
            />
          </div>
        </div>
      </section>


    </>

  );
};

export default LandingPage;
