import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Mtrain from "/src/assets/Mtrain.mp4";
import Snow from "/src/assets/Snow.mp4";
import Snowtrain from "/src/assets/Snowtrain.mp4";

const videos = [Mtrain, Snow, Snowtrain];
const textOverlays = [
  [
    { title: "Mountain Journey", description: "Experience the breathtaking mountain landscapes." },
    { title: "Breathtaking Views", description: "Immerse yourself in nature’s beauty." }
  ],
  [
    { title: "Snowfall Beauty", description: "Watch the mesmerizing snowfall in winter wonderlands." },
    { title: "Winter Wonderland", description: "A magical experience of snow-covered landscapes." }
  ],
  [
    { title: "Train Adventure", description: "Embark on a scenic train journey through stunning routes." },
    { title: "Scenic Route", description: "Enjoy picturesque views along the railway." }
  ]
];

function App() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [visibleTexts, setVisibleTexts] = useState([false, false]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();

    const maxOffsetX = 120;
    const maxOffsetY = 80;

    setOffset({
      x: ((clientX / width) - 0.5) * maxOffsetX,
      y: ((clientY / height) - 0.5) * maxOffsetY,
    });
  };

  useEffect(() => {
    const videoElement = document.getElementById("videoPlayer");
    if (videoElement) {
      videoElement.onended = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      };
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    setVisibleTexts([false, false]);
    setTimeout(() => setVisibleTexts([true, false]), 1000);
    setTimeout(() => setVisibleTexts([true, true]), 5000);
  }, [currentVideoIndex]);

  const handleMouseEnter = () => {
    const videoElement = document.getElementById("videoPlayer");
    if (videoElement) videoElement.pause();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const videoElement = document.getElementById("videoPlayer");
    if (videoElement) videoElement.play();
    setIsHovered(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Video Section */}
      <div className="flex-1 relative overflow-hidden" onMouseMove={handleMouseMove}>
        <div
          className="absolute w-[130vw] h-[130vh] -top-[10vh] -left-[10vw] transition-transform duration-100 ease-out"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <video
            id="videoPlayer"
            className={`absolute w-full h-full object-cover top-0 left-0 transition-opacity duration-500 `}
            src={videos[currentVideoIndex]}
            autoPlay
            muted
          />
        </div>

        {/* Floating Text Overlays with Descriptions */}
        {textOverlays[currentVideoIndex].map((item, index) => (
          <div
            key={index}
            className={`absolute text-white  font-bold transition-opacity duration-500 group ${
              visibleTexts[index] ? "opacity-100" : "opacity-0"
            }`}
            style={{
              top: `${20 + index * 30}%`,
              left: `${20 + index * 30}%`,
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: "transform 0.2s ease-out",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {item.title}
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 bg-transparent text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-300">
              {item.description}
            </div>
          </div>
        ))}

        {/* Video Selection Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-2 h-2 rounded-full bg-white transition-all duration-300 ${
                currentVideoIndex === index ? "bg-gray-900 scale-125" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;