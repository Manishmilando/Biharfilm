import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Mtrain from "/src/assets/Mtrain.mp4";
import Snow from "/src/assets/Snow.mp4";
import Snowtrain from "/src/assets/Snowtrain.mp4";
import Mountain from "/src/assets/mountain.mp4";
import Watertemp from "/src/assets/watertemp.mp4";

const videos = [Mtrain, Snow, Snowtrain, Mountain, Watertemp];

const textOverlays = [
  [
    {
      title: "Mountain Journey",
      description: "Experience the breathtaking mountain landscapes.",
      top: "25%",
      left: "10%",
    },
    {
      title: "Breathtaking Views",
      description: "Immerse yourself in nature’s beauty.",
      top: "50%",
      left: "65%",
    },
  ],
  [
    {
      title: "Snowfall Beauty",
      description: "Watch the mesmerizing snowfall in winter wonderlands.",
      top: "30%",
      left: "20%",
    },
    {
      title: "Winter Wonderland",
      description: "A magical experience of snow-covered landscapes.",
      top: "55%",
      left: "70%",
    },
  ],
  [
    {
      title: "Train Adventure",
      description: "Embark on a scenic train journey through stunning routes.",
      top: "20%",
      left: "25%",
    },
    {
      title: "Scenic Route",
      description: "Enjoy picturesque views along the railway.",
      top: "60%",
      left: "50%",
    },
  ],
  [
    {
      title: "High Altitude",
      description: "Mountains brushing the sky.",
      top: "25%",
      left: "30%",
    },
    {
      title: "Peaceful Ranges",
      description: "Unwind in the silence of the peaks.",
      top: "60%",
      left: "60%",
    },
  ],
  [
    {
      title: "Crystal Waters",
      description: "Refreshing and clear water visuals.",
      top: "30%",
      left: "35%",
    },
    {
      title: "Soothing Streams",
      description: "Feel the calm of flowing water.",
      top: "55%",
      left: "55%",
    },
  ],
];

function App() {
  const [mouseTargetOffset, setMouseTargetOffset] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [visibleTexts, setVisibleTexts] = useState([false, false]);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-auto scroll-hidden">
      <Navbar />

      {/* Video Section */}
      <div className="flex-1 relative overflow-hidden" onMouseMove={handleMouseMove}>
        <div
          className="absolute w-[120vw] h-[120vh] -top-[10vh] -left-[10vw]"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          {/* Active Video */}
          <video
            key={currentVideoIndex}
            id="videoPlayer"
            className="absolute w-full h-full object-cover top-0 left-0 transition-opacity duration-700 opacity-100"
            src={videos[currentVideoIndex]}
            autoPlay
            muted
            onEnded={handleVideoEnd}
          />

          {/* Preload Next Video */}
          <video
            className="hidden"
            src={videos[(currentVideoIndex + 1) % videos.length]}
            preload="auto"
          />
        </div>

        {/* Floating Text Overlays */}
        {textOverlays[currentVideoIndex].map((item, index) => (
          <div
            key={index}
            className={`absolute text-white font-bold transition-opacity duration-500 group ${
              visibleTexts[index] ? "opacity-100" : "opacity-0"
            }`}
            style={{
              top: item.top,
              left: item.left,
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
