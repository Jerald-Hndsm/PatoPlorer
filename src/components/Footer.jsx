import React, { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiGovernmentLine } from "react-icons/ri";
import { scroller } from "react-scroll";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());



  useEffect(() => {
 
  }, []);

  // Scroll to a section without changing the URL
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
    <div
      className="max-w-[1240px] mx-auto px-8 mt-96 grid gap-8 text-[#424242]"
      style={{ userSelect: "none" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#424242]">
            <a href="/" aria-label="Home">
              <span style={{ color: "#FFB9BF" }}>Pato</span>
              <span style={{ color: "#262322" }}>Plorer</span>
            </a>
          </h1>
          <p className="py-4 w-4/5">
            Patoplorer helps to improve duck farming providing insights
            powered by machine learning.
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <a
              href="https://bfar4a.da.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BFAR Region 4A Government Site"
            >
              <RiGovernmentLine size={30} />
            </a>
            <a
              href="https://www.facebook.com/BFARRegion4A"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BFAR Region 4A Facebook"
            >
              <FaFacebookSquare size={30} />
            </a>
            <a
              href="https://www.instagram.com/bfar4a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BFAR Region 4A Instagram"
            >
              <FaInstagramSquare size={30} />
            </a>
            <a
              href="https://x.com/bfar4a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BFAR Region 4A Twitter"
            >
              <FaSquareXTwitter size={30} />
            </a>
            <a
              href="https://www.linkedin.com/company/bfarph"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BFAR Philippines LinkedIn"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col lg:flex-row justify-between mt-6">
          <div className="mb-6 lg:mb-0">
            <h2 className="font-medium text-[#424242]">General</h2>
            <ul>
              <li className="py-2 text-sm">
                <a
                  href="/all-articles"
                  className="cursor-pointer"
                  aria-label="Articles"
                >
                  Articles
                </a>
              </li>
              <li className="py-2 text-sm">
                <a
                  href="/register"
                  className="cursor-pointer"
                  aria-label="Register"
                >
                  Register
                </a>
              </li>
              <li className="py-2 text-sm">
                <a
                  href="/"
                  className="cursor-pointer text-white"
                  aria-label="Palikpik Portal"
                >
                  Palikpik Portal
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 lg:mb-0">
            <h2 className="font-medium text-[#424242]">Support</h2>
            <ul>
              <li className="py-2 text-sm">
                <a
                  href="#contact"
                  className="cursor-pointer"
                  onClick={(e) => scrollToSection("contact", e)}
                  aria-label="Contact"
                >
                  Contact
                </a>
              </li>
              <li className="py-2 text-sm">
                <a href="/publicMap" className="cursor-pointer" aria-label="Public Map">
                   
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 lg:mb-0">
            <h2 className="font-medium text-[#424242]">Company</h2>
            <ul>
              <li className="py-2 text-sm">
                <a
                  href="#about"
                  className="cursor-pointer"
                  onClick={(e) => scrollToSection("about", e)}
                  aria-label="About"
                >
                  About
                </a>
              </li>
              <li className="py-2 text-sm">
                <a href="/team" className="cursor-pointer" aria-label="Team">
                  Team
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 lg:mb-0">
            <h2 className="font-medium text-[#424242]">Legal</h2>
            <ul>
              <li className="py-2 text-sm">
                <a
                  href="/privacy-policy"
                  className="cursor-pointer"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="py-2 text-sm">
                <a
                  href="/terms-n-condition"
                  className="cursor-pointer"
                  aria-label="Terms & Conditions"
                >
                  Terms & Conditions
                </a>
              </li>
              <li className="py-2 text-sm">
                <a
                  href="/disclaimer"
                  className="cursor-pointer"
                  aria-label="Disclaimer"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <hr className="border-t border-[#00003C] mb-1" />
        <div className="flex justify-end">
          <p className="text-base font-semibold py-4">
            &copy; {currentYear} Patoplorer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
