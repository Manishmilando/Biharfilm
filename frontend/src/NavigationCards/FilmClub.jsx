import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Filmclub from "/Filmclub.mp4";
import { CiCoffeeCup } from "react-icons/ci";
import { RiFilmAiFill, RiMovie2Line } from "react-icons/ri";
import "../App.css"; // Ensure you have the correct path to your CSS file

const FilmClubUI = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Coffee With Film",
      description: "Let's think critically to improve the young peoples' imagination and creativity skills",
      icon: <CiCoffeeCup className="text-white text-3xl" />,
      slug: "coffee-with-film",
    },
    {
      title: "Cine Samvad",
      description: "Let's explore engaging content and film industry of Bihar.",
      icon: <RiFilmAiFill className="text-white text-3xl" />,
      slug: "cine-samvad",
    },
    {
      title: "Film Festival",
      description: "Let's have a brief discussion over movies with resource like powerpoint presentation with embedded clip and worksheets.",
      icon: <RiMovie2Line className="text-white text-3xl" />,
      slug: "chatarpatar",
    },
  ];

  return (
    <div
      id="FilmClub"
      className="relative w-full min-h-screen bg-[#190108] flex items-center justify-center px-4 py-16 overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
        src="https://res.cloudinary.com/dgra109xv/video/upload/v1755760928/Filmclub_xrdco0.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Header */}
      <div className="absolute top-10 text-center text-white z-10 px-4">

        <h1 className="text-6xl sm:text-5xl md:text-7xl lg:text-9xl great-vibes-regular mt-8">
          FilmClub
        </h1>


        <p className=" text-sm sm:text-base max-w-xl mx-auto">
          Discover and explore amazing films with us.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-32 w-full max-w-6xl">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ translateY: 10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 w-full h-80 shadow-lg hover:shadow-2xl flex flex-col justify-between"
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center rounded-full shadow-md">
              {card.icon}
            </div>

            {/* Content */}
            <div className="text-white text-center mt-6 flex-1">
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm">{card.description}</p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/filmclub/${card.slug}`)}
              className="mt-4 bg-[#a92b43] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#891737] transition"
            >
              Learn More
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FilmClubUI;
