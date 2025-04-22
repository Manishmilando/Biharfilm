import React, { useState, useEffect } from "react";
import Logo1 from "/src/assets/Logo1.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowNavbar(true), 2000); // Delay show

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setNavbarVisible(true); // Scrolling down
      } else {
        setNavbarVisible(false); // Scrolling up
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleLocationClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu on selection
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-500 ${
        showNavbar ? "opacity-100" : "opacity-0"
      } ${navbarVisible ? "transform-none" : "-translate-y-full"} group`}
    >
      <div className="bg-transparent px-4 sm:px-6 lg:px-16 py-3 relative">
        {/* White bar behind logo and text */}
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>

        <div className="flex justify-between items-center relative z-10">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo1} alt="logo" className="h-16 w-24" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-white text-lg group-hover:text-black relative z-10">
            {[
              { id: "home", label: "Home" },
              { id: "Shooting-location", label: "Shooting Location" },
              { id: "FilmClub", label: "Film Club" },
              { id: "Vr", label: "VR" },
              { id: "GoverningBody", label: "Governing Body" },
              { id: "FilmPolicy", label: "Film Policy" },
              { id: "about", label: "About Us" },
            ].map((item) => (
              <li
                key={item.id}
                onClick={() => handleLocationClick(item.id)}
                className="cursor-pointer hover:text-red-600 font-semibold transition"
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <ul className="md:hidden mt-4 flex flex-col items-start gap-4 bg-black bg-opacity-80 text-white p-4 rounded-lg backdrop-blur-md">
            {[
              { id: "home", label: "Home" },
              { id: "Shooting-location", label: "Shooting Location" },
              { id: "FilmClub", label: "Film Club" },
              { id: "Vr", label: "VR" },
              { id: "GoverningBody", label: "Governing Body" },
              { id: "FilmPolicy", label: "Film Policy" },
              { id: "about", label: "About Us" },
            ].map((item) => (
              <li
                key={item.id}
                onClick={() => handleLocationClick(item.id)}
                className="cursor-pointer hover:bg-white hover:text-black font-semibold transition w-full"
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
