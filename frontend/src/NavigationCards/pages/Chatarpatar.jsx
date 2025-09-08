import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filmclub from "/Filmclub.mp4";
import NavbarB from "../../Components/NavbarB";

const tabData = {
  "IFFI Film Festival": [
    {
      src: "",
      title: "IFFI Participation A",
      description: "Bihar's delegates at the International Film Festival of India.",
    },
    {
      src: "",
      title: "IFFI Awards",
      description: "Showcasing award-winning entries from Bihar.",
    },
     {
      src: "",
      title: "IFFI Awards",
      description: "Showcasing award-winning entries from Bihar.",
    },
  ],
  "Children Film Festival": [
    {
      src: "",
      title: "Child Artist Workshop",
      description: "Workshops designed for children on filmmaking basics.",
    },
    {
      src: "",
      title: "Young Talents",
      description: "Screenings of children's films made by school students.",
    },
     {
      src: "",
      title: "Young Talents",
      description: "Screenings of children's films made by school students.",
    },
  ],
  "Women Film Festival": [
    {
      src: "",
      title: "Women Directors",
      description: "Celebrating women behind the camera in Bihar.",
    },
    {
      src: "",
      title: "Voices of Women",
      description: "Films highlighting women-centric narratives.",
    },
      {
      src: "",
      title: "Voices of Women",
      description: "Films highlighting women-centric narratives.",
    },
  ],
};

const Chatarpatar = () => {
  const [activeTab, setActiveTab] = useState("IFFI Film Festival");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden pt-20">
      <NavbarB />

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
        src={Filmclub}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2 bg-[#a92b43] text-white rounded-md hover:bg-[#891737] transition duration-300"
        >
          ← Back to Film Club
        </button>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent tracking-wide drop-shadow-md">
          Film Festival
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-10 flex-wrap gap-4">
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full border ${
                activeTab === tab
                  ? "bg-[#a92b43] text-white border-[#a92b43]"
                  : "bg-white/10 text-white border-white/20 hover:bg-[#891737]"
              } transition duration-300`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tabData[activeTab].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatarpatar;
