import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filmclub from "/Filmclub.mp4";
import NavbarB from "../../Components/NavbarB";

const imageData = [
  {
    src: "https://film.bihar.gov.in/img/cs1/a12.jpeg",
    title: "Session A",
    description: "Interactive discussion on storytelling and visual language.",
  },
  {
    src: "https://film.bihar.gov.in/img/cs1/b12.jpeg",
    title: "Session B",
    description: "Exploring regional cinema's impact and scope in Bihar.",
  },
  {
    src: "https://film.bihar.gov.in/img/cs1/c12.jpeg",
    title: "Session C",
    description: "Panel talk with filmmakers and critics.",
  },
  {
    src: "https://film.bihar.gov.in/img/cs1/d12.jpeg",
    title: "Session D",
    description: "Youth participation in cinematic arts.",
  },
  {
    src: "https://film.bihar.gov.in/img/cs1/e12.jpeg",
    title: "Session E",
    description: "Understanding the cultural lens in film narratives.",
  },
  {
    src: "https://film.bihar.gov.in/img/cs1/f12.jpeg",
    title: "Session F",
    description: "Workshops on screenwriting and editing basics.",
  },
  {
    src: "https://film.bihar.gov.in/img/cs1/g12.jpeg",
    title: "Session G",
    description: "Short film screenings by local artists.",
  },
  {
    src: "https://film.bihar.gov.in/img/cs1/h12.jpeg",
    title: "Session H",
    description: "Behind-the-scenes of documentary production.",
  },
];

const CineSamvad = () => {
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
        <h1 className="text-4xl  md:text-5xl font-extrabold text-center mb-20 bg-gradient-to-r from-red-500 via-pink-300 to-yellow-300 bg-clip-text text-transparent tracking-wide drop-shadow-md">
          Cine-Samvad Sessions
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {imageData.map((item, index) => (
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

export default CineSamvad;
