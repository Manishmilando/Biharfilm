import React from "react";
import { motion } from "framer-motion";
import Reel from "/src/assets/Reel.svg";
import { CiCoffeeCup } from "react-icons/ci";
import { RiFilmAiFill, RiMovie2Line } from "react-icons/ri";

const FilmClubUI = () => {
  const cards = [
    {
      title: "Coffee With Film",
      description: "Engage in deep discussions about cinema over a cup of coffee.",
      icon: <CiCoffeeCup />,
    },
    {
      title: "Cine Samvad",
      description: "Let's explore engaging content and film industry of Bihar.",
      icon: <RiFilmAiFill />,
    },
    {
      title: "Chatarpatar",
      description: "Brief discussions with clips, presentations, and worksheets.",
      icon: <RiMovie2Line />,
    },
  ];

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-[#190108] overflow-hidden max-w-screen overflow-x-hidden"
      id="FilmClub"
    >
      {/* Background Image with slight movement */}
      <motion.img
        src={Reel}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        animate={{ x: ["-2%", "2%", "-2%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header Description */}
      <div className="absolute top-[clamp(2.5rem,5vw,5rem)] text-white text-center z-10 px-2">
        <h1 className="text-[clamp(1.25rem,3.5vw,2.5rem)] font-serif">Welcome to the Film Club</h1>
        <p className="text-[clamp(0.75rem,1.75vw,1.1rem)] mt-2">
          Discover and explore amazing films with us.
        </p>
      </div>

      {/* Floating Cards using Grid */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 z-10 px-4 w-full max-w-screen
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative 
              w-[clamp(8rem,20vw,13rem)] 
              h-[clamp(11rem,22vw,16rem)] 
              bg-white/20 backdrop-blur-md 
              p-[clamp(0.5rem,1.5vw,1rem)] 
              rounded-xl border border-white/30 shadow-lg 
              transition-transform hover:scale-105 hover:shadow-2xl 
              overflow-hidden"
          >
            {/* Sticker */}
            <div className="absolute top-4 left-4 bg-red-600 text-white text-[clamp(1.25rem,2.5vw,2rem)] p-2 rounded-full shadow-md">
              {card.icon}
            </div>
            {/* Description */}
            <div className="mt-20 text-white text-center px-2 overflow-y-auto scrollbar-hidden">
              <h2 className="text-[clamp(0.9rem,1.5vw,1.2rem)] font-semibold">{card.title}</h2>
              <p className="text-[clamp(0.65rem,1.25vw,0.95rem)] mt-2">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmClubUI;
