import React, { useState, useEffect } from "react";
import Logo1 from "/src/assets/Logo1.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowNavbar(true), 2000); // Show navbar after 2 seconds
  }, []);

  const handleLocationClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-500 z-30 ${
        showNavbar ? "opacity-100" : "opacity-0"
      }`}
    >
      <ul className="flex items-center gap-28  py-4 px-20 text-white text-lg bg-transparent transition-colors duration-300 hover:bg-white hover:text-black">
        {/* Logo */}
        <li className="flex items-center cursor-pointer hover:text-red-600 text-2xl">
          <img src={Logo1} alt="logo" className="h-16 w-24  " />
        </li>

        {/* Menu Items */}
        <button
          onClick={() => handleLocationClick("home")}
          className="cursor-pointer hover:text-red-600 text-xl font-semibold"
        >
          Home
        </button>
        <button
          onClick={() => handleLocationClick("shooting-location")}
          className="cursor-pointer hover:text-red-600 text-xl font-semibold"
        >
          Shooting Location
        </button>
        <button
          onClick={() => handleLocationClick("FilmClub")}
          className="cursor-pointer hover:text-red-600 text-xl font-semibold"
        >
          Film Club
        </button>
        <button
          onClick={() => handleLocationClick("Vr")}
          className="cursor-pointer hover:text-red-600 text-xl font-semibold"
        >
          VR
        </button>
        <button
          onClick={() => handleLocationClick("GoverningBody")}
          className="cursor-pointer hover:text-red-600 text-xl font-semibold"
        >
          Governing Body
        </button>
        <button
          onClick={() => handleLocationClick("about")}
          className="cursor-pointer hover:text-red-600 text-xl font-semibold"
        >
          About Us
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
