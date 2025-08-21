// App.js
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Snow from "/Snow.mp4";
import Snowtrain from "/Snowtrain.mp4";
import Mountain from "/mountain.mp4";
import Watertemp from "/watertemp.mp4";
import Vrvideo from "/Vrvideo.mp4";
import { motion } from "framer-motion";
import "../App.css";

const videos = ["https://res.cloudinary.com/dgra109xv/video/upload/v1755760469/Snowtrain_uhyz1u.mp4", "https://res.cloudinary.com/dgra109xv/video/upload/v1755760406/Snow_s8nj0n.mp4", "https://res.cloudinary.com/dgra109xv/video/upload/v1755760514/watertemp_dxxjyl.mp4","https://res.cloudinary.com/dgra109xv/video/upload/v1755760270/mountain_wh9xkz.mp4", "https://res.cloudinary.com/dgra109xv/video/upload/v1755761000/Vrvideo_tv1ioj.mp4"];

const textOverlays = [
  [
    {
      title: "Roooling Reels, Rolling Fields",
      description: "Capturing Bihar’s soul — one frame at a time.",
      top: "25%",
      left: "10%",
    },
    {
      title: "Highway of Bihar, Frames of a journey",
      description: "Where every mile tells a cinematic story.",
      top: "50%",
      left: "50%",
    },
  ],
  [
    {
      title: "Whispers of the Riverbank",
      description: "Where crystal waters kiss the sands of Bihar, stories begin in silence",
      top: "30%",
      left: "20%",
    },
    {
      title: "River Rhythms of Bihar",
      description: "Crystal waters, sandy banks, and children at play — the soul of the state, in motion.",
      top: "55%",
      left: "70%",
    },
  ],
  [
    {
      title: "Karamchat Calm, Rohtas Proud",
      description: "Blue waters and mountain echoes — where Bihar's natural heritage stands tall.",
      top: "60%",
      left: "25%",
    },
    {
      title: "Rohtas Rises",
      description: "Beneath the mountains. Beyond the waters. A spirit unshaken",
      top: "30%",
      left: "82%",
    },
  ],
  [
    {
      title: "Echoes of the Plateau",
      description: "Whispers of wind, strength of stone.",
      top: "45%",
      left: "30%",
    },
    {
      title: "Roots of Rohtas",
      description: "Where the ancient plateau meets emerald heights.",
      top: "75%",
      left: "60%",
    },
  ],
  [
    {
      title: "Crystal Waters",
      description: "Refreshing and clear water visuals.",
      top: "50%",
      left: "35%",
    },
    {
      title: "Soothing Streams",
      description: "Feel the calm of flowing water.",
      top: "75%",
      left: "55%",
    },
  ],
];

function App() {
  const [mouseTargetOffset, setMouseTargetOffset] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [visibleTexts, setVisibleTexts] = useState([false, false]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const maxOffsetX = 50;
    const maxOffsetY = 25;
    setMouseTargetOffset({
      x: ((clientX / width) - 0.5) * maxOffsetX,
      y: ((clientY / height) - 0.5) * maxOffsetY,
    });
  };

  useEffect(() => {
    const animate = () => {
      setOffset((prev) => {
        const damping = 0.1;
        return {
          x: prev.x + (mouseTargetOffset.x - prev.x) * damping,
          y: prev.y + (mouseTargetOffset.y - prev.y) * damping,
        };
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [mouseTargetOffset]);

  useEffect(() => {
    setVisibleTexts([false, false]);
    setTimeout(() => setVisibleTexts([true, false]), 1000);
    setTimeout(() => setVisibleTexts([true, true]), 5000);
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <motion.div className="min-h-screen flex flex-col bg-black scroll-hidden">
      <Navbar />
      <div className="flex-1 relative overflow-hidden" onMouseMove={handleMouseMove}>
        <div
          className="absolute w-[150vw] h-[150vh] md:w-[120vw] md:h-[120vh] -top-[10vh] -left-[10vw]"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <video
            key={currentVideoIndex}
            id="videoPlayer"
            className="absolute w-full h-full object-cover top-0 left-0 transition-opacity duration-700 opacity-100"
            src={videos[currentVideoIndex]}
            autoPlay
            muted
            onEnded={handleVideoEnd}
          />
          <video
            className="hidden"
            src={videos[(currentVideoIndex + 1) % videos.length]}
            preload="auto"
          />
        </div>

        {textOverlays[currentVideoIndex].map((item, index) => (
          <div
            key={index}
            className={`absolute text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl transition-opacity duration-500 group z-10 max-w-[80%] md:max-w-[30%] text-center sm:text-left ${
              visibleTexts[index] ? "opacity-100" : "opacity-0"
            }`}
            style={{
              top: item.top,
              left: item.left,
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {item.title}
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 p-2 bg-black/70 text-xs sm:text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-300">
              {item.description}
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentVideoIndex === index ? "bg-gray-900 scale-125" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default App;
