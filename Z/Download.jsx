import React from "react";
import FLimg1 from "../../assets/img/fishl3.webp";

const Download = () => {


  React.useEffect(() => {
 
  }, []);

  return (
    <section id="download">
      <div
        className="w-full bg-white pt-20 pb-7 px-4"
        style={{ userSelect: "none" }}
      >
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold py-2">
              Download FishLens now! Detect, Learn, and Help BFAR with your
              reports!
            </h1>
            <p className="text-[#7b9fb8] ">
              Learn about fish diseases and support the Bureau of Fisheries and
              Aquatic Resources (BFAR) by sharing your findings.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1xoHnJszKdpd_kWaa_Vcrdqf40r7sjVhg"
              download="fishlens-1.0.0.apk"
              target="blank"
              className="bg-[#00003C] text-[#ffffff] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-center"
            >
              Download
            </a>
          </div>
          <img
            className="w-[430px] ml-[190px] my-4 hidden md:block"
            src={FLimg1}
            alt="FishLens App Preview"
            width="430" // Set appropriate width
            height="auto" // Maintain aspect ratio
          />
        </div>
      </div>
    </section>
  );
};

export default Download;
