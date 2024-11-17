import React from "react";
import { scroller } from "react-scroll";
import heropic from '../asset/image/duck.jpg';
import Laptop from '../asset/image/Duckyfier.png';
import pic1 from '../asset/image/farmer.jpg';

const LandingPage = () => {
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    scroller.scrollTo(sectionId, {
      duration: 0,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -30,
    });
  };

  return (
    <>
      {/* Landing Section */}
      <section id="home" className="pt-24 pb-10" style={{ userSelect: "none" }}>
        <div className="w-full bg-[#FFFDF2] px-4">
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="md:text-6xl sm:text-3xl text-2xl font-bold py-2">
                PatoPlorer Powered by Machine Learning
              </h1>
              <p className="text-[#7b9fb8]">
                PatoPlorer utilizes production using Machine Learning Algorithm and Computer Vision Technology.
              </p>
              <button
                onClick={(e) => scrollToSection("about", e)}
                className="bg-[#232226] text-[#ffffff] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-center cursor-pointer"
              >
                Learn More
              </button>
            </div>
            <img
              className="w-full my-4"
              src={heropic}
              alt="Duck farming illustration"
              width="500"
              height="500"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ userSelect: "none" }}>
        <div className="w-full bg-[#FFFDF2] pt-16 px-6">
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">
            <img
              className="w-full my-4"
              src={Laptop}
              alt="PatoPlorer dashboard on a laptop"
              width="500"
              height="500"
              loading="lazy"
            />
            <div className="flex flex-col justify-center space-y-8">
              <p className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-[#00003C]">
                About
              </p>
              <div>
                <h1 className="md:text-3xl sm:text-2xl text-xl pb-2 font-medium py-2 text-[#00003C]">
                  About PatoPlorer
                </h1>
                <p className="pb-5 text-[#7b9fb8]">
                  PatoPlorer tackles challenges in the duck farming ecosystem through machine learning forecasting and production optimization.
                </p>
              </div>
              <div>
                <h1 className="md:text-3xl sm:text-2xl text-xl pb-2 font-medium py-2 text-[#00003C]">
                  Our Mission
                </h1>
                <p className="pb-5 text-[#7b9fb8]">
                  We aim to improve production planning, optimize feed, and empower farmers with data-driven insights. PatoPlorer strives to revolutionize the Philippine duck industry, ensuring its long-term sustainability and profitability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-16 pb-10" style={{ userSelect: "none" }}>
        <div className="w-full bg-[#FFFDF2] px-4">
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="md:text-6xl sm:text-3xl text-2xl font-bold py-2">
                Get in Touch with PatoPlorer
              </h1>
              <p className="text-[#7b9fb8]">
                We're here to assist you with optimizing your duck farming operations.
              </p>
              <button
                onClick={(e) => scrollToSection("contact-form", e)}
                className="bg-[#00003C] text-[#ffffff] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-center cursor-pointer"
              >
                Contact Us
              </button>
            </div>
            <img
              className="w-full my-4"
              src={pic1}
              alt="Farmer with ducks"
              width="500"
              height="500"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="pt-16 pb-10 bg-[#FFFDF2]" style={{ userSelect: "none" }}>
        <div className="max-w-[600px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
          <form action="/send-message" method="POST" className="space-y-4">
            <div>
              <label className="block text-[#00003C] font-medium">Name</label>
              <input type="text" name="name" required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-[#00003C] font-medium">Email</label>
              <input type="email" name="email" required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-[#00003C] font-medium">Message</label>
              <textarea name="message" rows="4" required className="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" className="bg-[#232226] text-[#ffffff] w-full rounded-md font-medium py-3">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
