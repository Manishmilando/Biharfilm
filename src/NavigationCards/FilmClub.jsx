import React from "react";
import { motion } from "framer-motion";
import Reel from "/src/assets/Reel.svg";
import { CiCoffeeCup } from "react-icons/ci";
import { RiFilmAiFill } from "react-icons/ri";
import { RiMovie2Line } from "react-icons/ri";

const FilmClubUI = () => {
  const cards = [
    {
      title: "Coffee With Film",
      description: "Engage in deep discussions about cinema over a cup of coffee.",
      icons: <CiCoffeeCup />
    },
    {
      title: "Cine Samvad",
      description: "Let's explore engaging content and film industry of Bihar.",
      icons:<RiFilmAiFill />
    },
    {
      title: "Chatarpatar",
      description: "Let's have a brief discussion over movies with resource like powerpoint presentation with embedded clip and worksheets.",
      icons:<RiMovie2Line />
    },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#190108] overflow-hidden" id="FilmClub">
      {/* Background Image with slight movement */}
      <motion.img
        src={Reel}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        animate={{ x: ["-2%", "2%", "-2%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header Description */}
      <div className="absolute top-20 text-white text-center z-10">
        <h1 className="text-5xl font-bold">Welcome to the Film Club</h1>
        <p className="text-xl mt-4">Discover and explore amazing films with us.</p>
      </div>

      {/* Floating Cards */}
      <div className="absolute mt-16 flex space-x-8 z-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative w-64 h-80 bg-black/40 backdrop-blur-lg p-6 rounded-lg shadow-lg transition transform hover:scale-110 hover:shadow-2xl"
          >
            {/* Sticker */}
            <div className="absolute top-6 left-6 bg-red-500 text-white text-4xl px-3 py-2 rounded-full">
            {card.icons}
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
