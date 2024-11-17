import React, { useState, useEffect, useCallback } from "react";
import { scroller, scrollSpy } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const sections = ["home", "about", "contact"];

  const handleNav = () => {
    setNav(!nav);
  };

  const handleRefresh = () => {
    navigate("/", { replace: true });
  };

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -30, // Adjust for fixed navbar height
    });
    setActiveSection(section);
  };

  useEffect(() => {
    // Remove unnecessary event registrations
    scrollSpy.update();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 80 && rect.bottom >= 80;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    if (section) {
      scrollToSection(section);
    } else {
      setActiveSection("home");
    }
  }, [location]);

  const handleSectionClick = (section) => {
    navigate(`/?section=${section}`, { replace: true });
    setNav(false);
  };

  useEffect(() => {
    if (nav) {
      document.body.classList.add("lock-scroll");
    } else {
      document.body.classList.remove("lock-scroll");
    }
  }, [nav]);

  return (
    <nav
      className="fixed top-0 left-0 w-full py-6 z-50 bg-[#FFF0C4]"
      style={{ userSelect: "none" }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold cursor-pointer text-[#424242] px-2">
            <NavLink to="/" onClick={handleRefresh}>
              <span style={{ color: "#222426" }}>Pato</span>
              <span style={{ color: "#FCFBFA" }}>Plorer</span>
            </NavLink>
          </h1>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {sections.map((section) => (
              <li key={section}>
                <button
                  onClick={() => handleSectionClick(section)}
                  className={`cursor-pointer ${
                    activeSection === section
                      ? "text-[#7b9fb8] font-semibold"
                      : "text-[#4e4e4e] font-semibold"
                  } `}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
            {/* Marketplace Button */}
            <li>
              <NavLink
                to="/marketplace"
                className="text-gray-600 py-2 px-4 rounded-full hover:bg-[#7b9fb8] hover:text-[#00003C] font-bold"
              >
                Marketplace
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signin"
                className="bg-[#00003C] text-white py-2 px-4 rounded-full hover:bg-[#7b9fb8] hover:text-[#00003C] font-bold"
              >
                Sign In
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Mobile Navigation Toggle */}
        <button onClick={handleNav} className="block px-2 md:hidden" aria-label="Toggle menu">
          {nav ? (
            <AiOutlineClose className="text-2xl" aria-hidden="true" />
          ) : (
            <AiOutlineMenu className="text-2xl" aria-hidden="true" />
          )}
        </button>
        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? "fixed inset-x-0 top-0 h-full bg-white ease-in-out duration-500 z-40 flex flex-col"
              : "ease-in-out duration-500 fixed left-[-100%]"
          }
        >
          <li className="flex justify-between items-center p-6">
            <h1 className="text-3xl font-bold text-[#424242]">
              <NavLink to="/" onClick={handleRefresh}>
                <span style={{ color: "#00003C" }}>Pato</span>
                <span style={{ color: "#7b9fb8" }}>Plorer</span>
              </NavLink>
            </h1>
            <button onClick={handleNav} aria-label="Close menu">
              <AiOutlineClose className="text-2xl" aria-hidden="true" />
            </button>
          </li>
          {sections.map((section) => (
            <li
              key={section}
              className={`p-4 border-b border-gray-600 cursor-pointer ${
                activeSection === section
                  ? "text-[#7b9fb8] font-bold"
                  : "text-[#424242] font-medium"
              }`}
            >
              <button
                onClick={() => handleSectionClick(section)}
                className="block w-full text-left"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
          {/* Marketplace */}
          <li
            className="p-4 border-b border-gray-600 cursor-pointer"
            onClick={() => setNav(false)}
          >
            <NavLink
              to="/marketplace"
              className="block text-[#424242] hover:text-[#7b9fb8]"
            >
              Marketplace
            </NavLink>
          </li>
          {/* Sign In */}
          <li className="p-4 border-b border-gray-600 cursor-pointer">
            <NavLink
              to="/signin"
              className="block text-[#424242] hover:text-[#7b9fb8] font-medium"
              onClick={() => setNav(false)}
            >
              Sign In
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
