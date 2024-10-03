import React, { useState, useEffect } from "react";
import { Events, scrollSpy, scroller } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const sections = ["home", "about", "download", "articles", "contact"];

  const handleNav = () => {
    setNav(!nav);
  };

  const handleRefresh = () => {
    navigate("/", { replace: true });
    window.location.reload();
  };

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "",
      offset: -30, // Adjust for fixed navbar height
    });
    setActiveSection(section);
  };

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
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
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    if (section) {
      scrollToSection(section);
    } else {
      const currentSection = location.pathname.replace("/", "") || "home";
      setActiveSection(currentSection);
    }
  }, [location]);

  const handleSectionClick = (section) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        scrollToSection(section);
      }, 100); // Add a slight delay to ensure the page navigates before scrolling
    } else {
      scrollToSection(section);
    }
    setNav(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full py-6 z-50 bg-white"
      style={{ userSelect: "none" }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold cursor-pointer text-[#424242] px-2">
            <NavLink to="/" onClick={handleRefresh}>
              <span style={{ color: "#00003C" }}>Fish</span>
              <span style={{ color: "#ADD1E9" }}>Lens</span>
            </NavLink>
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {sections.map((section) => (
              <li key={section}>
                <NavLink
                  to="/"
                  onClick={() => handleSectionClick(section)}
                  className={`cursor-pointer ${
                    activeSection === section
                      ? "text-[#7b9fb8] font-semibold"
                      : "text-[#4e4e4e] font-semibold"
                  } `}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/register"
                className="bg-[#00003C] text-white py-2 px-4 rounded-full hover:bg-[#7b9fb8] hover:text-[#00003C] font-bold"
              >
                REGISTER
              </NavLink>
            </li>
          </ul>
        </div>

        <div onClick={handleNav} className="block px-2 md:hidden">
          {nav ? (
            <AiOutlineClose className="text-2xl" />
          ) : (
            <AiOutlineMenu className="text-2xl" />
          )}
        </div>

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
                <span style={{ color: "#00003C" }}>Fish</span>
                <span style={{ color: "#7b9fb8" }}>Lens</span>
              </NavLink>
            </h1>
            <div onClick={handleNav}>
              <AiOutlineClose className="text-2xl" />
            </div>
          </li>
          {sections.map((section) => (
            <li
              key={section}
              className={`p-4 border-b border-gray-600 cursor-pointer ${
                activeSection === section
                  ? "text-[#7b9fb8] font-bold"
                  : "text-[#424242] font-medium"
              }`}
              onClick={() => handleSectionClick(section)}
            >
              <NavLink
                to="/"
                className="block"
                onClick={() => handleSectionClick(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </NavLink>
            </li>
          ))}
          <li className="p-4 border-b border-gray-600 cursor-pointer">
            <NavLink
              to="/register"
              className={`block text-[#424242] hover:text-[#7b9fb8] ${
                activeSection === "register" ? "font-bold" : "font-medium"
              }`}
              onClick={() => setNav(false)}
            >
              REGISTER
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
