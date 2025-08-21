import React from "react";
import Vr from "/Vrpage.mp4";
import "../../app.css";

// Sample data (extend as needed)
const vrExperiences = [
  { id: 1, image: "/image1.jpg", link: "https://vr-link-1.com", title: "Glass Bridge, Rajgir" },
  { id: 2, image: "/image2.jpg", link: "https://vr-link-2.com", title: "Pawapuri, Nalanda" },
  { id: 3, image: "/image3.jpg", link: "https://vr-link-3.com", title: "Jungle Safari, Rajgir" },
  { id: 4, image: "/image4.jpg", link: "https://vr-link-4.com", title: "Bodh Gaya Temple" },
  { id: 5, image: "/image5.jpg", link: "https://vr-link-5.com", title: "Maner Sharif, Patna" },
];

const Vrpage = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://res.cloudinary.com/dgra109xv/video/upload/v1755760966/Vrpage_cj0a7w.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl great-vibes-regular mb-12 text-center text-white drop-shadow-lg tracking-wide">
          Explore Bihar in Virtual Reality
        </h1>

        {/* Horizontal Scrollable Cards (Carousel Style) */}
        <div className="flex overflow-x-auto space-x-6 w-full max-w-7xl px-2 py-4 scrollbar-thin scrollbar-thumb-[#a92b4e]/80 scrollbar-track-transparent">
          {vrExperiences.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-5 flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={`VR Preview ${item.id}`}
                className="w-full h-48 object-cover rounded-xl mb-4 border border-white/10"
              />
              <h3 className="text-lg font-semibold mb-3 text-center">{item.title}</h3>
              <button
                onClick={() => window.open(item.link, "_blank")}
                className="mt-auto bg-[#a92b4e] px-6 py-2 text-white rounded-full text-sm font-semibold hover:bg-[#c6365d] transition"
              >
                Experience in VR
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vrpage;
