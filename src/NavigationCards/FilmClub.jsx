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
      className="relative w-full h-screen flex items-center justify-center bg-[#190108] overflow-hidden"
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
      <div className="absolute top-20 text-white text-center z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-serif">Welcome to the Film Club</h1>
        <p className="text-lg md:text-xl mt-2">Discover and explore amazing films with us.</p>
      </div>

      {/* Floating Cards */}
      <div
        
       
        className="absolute top-1/2 transform -translate-y-1/2 flex flex-col md:flex-row items-center gap-16 z-10 pt-10 px-4"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative w-64 h-86 bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Sticker */}
            <div className="absolute top-6 left-6 bg-red-600 text-white text-4xl p-2 rounded-full shadow-md">
              {card.icon}
            </div>
            {/* Description */}
            <div className="mt-24 text-white text-center">
              <h2 className="text-2xl font-semibold">{card.title}</h2>
              <p className="text-md mt-3">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmClubUI;
