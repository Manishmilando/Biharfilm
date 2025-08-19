// src/NavigationCards/Vr.jsx
import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Video imports
import VrvideoHQ from "/VrvideoHQ.mp4";
import VrvideoLQ from "/VrvideoLQ.mp4";
import VrvideoHQ2 from "/VrvideoHQ2.mp4";
import VrvideoLQ2 from "/VrvideoLQ2.mp4";
import VrvideoHQ3 from "/VrvideoHQ3.mp4";
import VrvideoLQ3 from "/VrvideoLQ3.mp4";
import VrvideoHQ4 from "/VrvideoHQ4.mp4";
import VrvideoLQ4 from "/VrvideoLQ4.mp4";
import VrvideoHQ5 from "/VrvideoHQ5.mp4";
import VrvideoLQ5 from "/VrvideoLQ5.mp4";
import VrvideoHQ6 from "/VrvideoHQ6.mp4";
import VrvideoLQ6 from "/VrvideoLQ6.mp4";

// Video list
const videoList = [
  {
    high: VrvideoHQ,
    low: VrvideoLQ,
    title: "Glass Bridge, Rajgir",
    description:
      "Embark on a breathtaking virtual journey across the Glass Bridge of Rajgir, a marvel suspended between the hills. This architectural feat offers panoramic views of the lush valley and serene landscape below, giving the sensation of walking amidst the clouds. Perfect for thrill-seekers and nature lovers, the experience captures the tranquil grandeur of Rajgir’s natural beauty combined with the thrill of height and modern engineering.",
  },
  {
    high: VrvideoHQ2,
    low: VrvideoLQ2,
    title: "Ghora Katora, Rajgir",
    description:
      "Immerse yourself in the peaceful aura of Ghora Katora, a natural horse-shaped lake nestled among the hills of Rajgir. Surrounded by lush forests and often graced by migratory birds, this sacred and scenic waterbody is a hidden gem of Bihar. The VR experience lets you witness the stillness of the lake, the chirping of birds, and the gentle whispers of the wind through surrounding trees—ideal for those seeking serenity in nature’s lap.",
  },
  {
    high: VrvideoHQ3,
    low: VrvideoLQ3,
    title: "Jungle Safari Entry, Rajgir",
    description:
      "Begin your adventure through the gateway of Rajgir’s Jungle Safari, where the wilderness greets you with open arms. This VR experience captures the excitement of entering a dense forest reserve with curated animal zones, nature trails, and eco-friendly walkways. Feel the anticipation build as you cross into an area teeming with wildlife, blending education, conservation, and adventure into one memorable virtual journey.",
  },
  {
    high: VrvideoHQ4,
    low: VrvideoLQ4,
    title: "Pawapuri, Nalanda",
    description:
      "Take a spiritual deep dive into the sacred town of Pawapuri in Nalanda, where Lord Mahavira, the 24th Jain Tirthankara, attained nirvana. In this VR experience, float virtually to the heart of Jal Mandir—a marble temple surrounded by a lotus-filled lake. Feel the holiness, heritage, and tranquility as you walk across the stone bridge leading to the temple, immersed in centuries-old devotion and peace.",
  },
  {
    high: VrvideoHQ5,
    low: VrvideoLQ5,
    title: "Bapu Tower, Patna",
    description:
      "Relive Bihar’s revolutionary spirit through the towering structure of Bapu Tower in Patna, a tribute to Mahatma Gandhi’s influence on the freedom movement in Bihar. The VR experience walks you through the symbolic architecture, plaques, and scenic surroundings, letting you sense the historic weight and inspiring atmosphere. It’s more than a monument—it’s a reminder of struggle, unity, and vision.",
  },
  {
    high: VrvideoHQ6,
    low: VrvideoLQ6,
    title: "Hiuen Tsang Memorial Hall, Nalanda",
    description:
      "Travel back in time to the ancient seat of learning through the Hiuen Tsang Memorial Hall in Nalanda. This VR journey narrates the story of the legendary Chinese traveler and scholar who spent years absorbing the teachings of Nalanda University. Walk through intricately carved corridors, ancient manuscripts, and statues that reflect Indo-Chinese cultural synergy. A tribute to knowledge and global exchange, this memorial is both artistic and intellectually enriching.",
  }, {
    high: VrvideoHQ,
    low: VrvideoLQ,
    title: "Glass Bridge, Rajgir",
    description:
      "Embark on a breathtaking virtual journey across the Glass Bridge of Rajgir, a marvel suspended between the hills. This architectural feat offers panoramic views of the lush valley and serene landscape below, giving the sensation of walking amidst the clouds. Perfect for thrill-seekers and nature lovers, the experience captures the tranquil grandeur of Rajgir’s natural beauty combined with the thrill of height and modern engineering.",
  },
  {
    high: VrvideoHQ2,
    low: VrvideoLQ2,
    title: "Ghora Katora, Rajgir",
    description:
      "Immerse yourself in the peaceful aura of Ghora Katora, a natural horse-shaped lake nestled among the hills of Rajgir. Surrounded by lush forests and often graced by migratory birds, this sacred and scenic waterbody is a hidden gem of Bihar. The VR experience lets you witness the stillness of the lake, the chirping of birds, and the gentle whispers of the wind through surrounding trees—ideal for those seeking serenity in nature’s lap.",
  },
  {
    high: VrvideoHQ3,
    low: VrvideoLQ3,
    title: "Jungle Safari Entry, Rajgir",
    description:
      "Begin your adventure through the gateway of Rajgir’s Jungle Safari, where the wilderness greets you with open arms. This VR experience captures the excitement of entering a dense forest reserve with curated animal zones, nature trails, and eco-friendly walkways. Feel the anticipation build as you cross into an area teeming with wildlife, blending education, conservation, and adventure into one memorable virtual journey.",
  },
  {
    high: VrvideoHQ4,
    low: VrvideoLQ4,
    title: "Pawapuri, Nalanda",
    description:
      "Take a spiritual deep dive into the sacred town of Pawapuri in Nalanda, where Lord Mahavira, the 24th Jain Tirthankara, attained nirvana. In this VR experience, float virtually to the heart of Jal Mandir—a marble temple surrounded by a lotus-filled lake. Feel the holiness, heritage, and tranquility as you walk across the stone bridge leading to the temple, immersed in centuries-old devotion and peace.",
  },
  {
    high: VrvideoHQ5,
    low: VrvideoLQ5,
    title: "Bapu Tower, Patna",
    description:
      "Relive Bihar’s revolutionary spirit through the towering structure of Bapu Tower in Patna, a tribute to Mahatma Gandhi’s influence on the freedom movement in Bihar. The VR experience walks you through the symbolic architecture, plaques, and scenic surroundings, letting you sense the historic weight and inspiring atmosphere. It’s more than a monument—it’s a reminder of struggle, unity, and vision.",
  },
  {
    high: VrvideoHQ6,
    low: VrvideoLQ6,
    title: "Hiuen Tsang Memorial Hall, Nalanda",
    description:
      "Travel back in time to the ancient seat of learning through the Hiuen Tsang Memorial Hall in Nalanda. This VR journey narrates the story of the legendary Chinese traveler and scholar who spent years absorbing the teachings of Nalanda University. Walk through intricately carved corridors, ancient manuscripts, and statues that reflect Indo-Chinese cultural synergy. A tribute to knowledge and global exchange, this memorial is both artistic and intellectually enriching.",
  },
];

function Vr() {
  const [mainVideo, setMainVideo] = useState(videoList[0].high);
  const [mainIndex, setMainIndex] = useState(0);
  const navigate = useNavigate();

  const handleVideoClick = (video, index) => {
    setMainVideo(video.high);
    setMainIndex(index);
  };

  return (
    <div id="Vr" className="bg-[#190108] pt-16 px-4 md:px-10 pb-24">
      <h2 className="text-white text-2xl sm:text-3xl md:text-5xl archivo-black-regular pl-4 md:pl-24">
  Virtual Reality (VR)
</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-10 mb-12">
        {/* Text Section */}
        <div>
          <p className="text-white text-base leading-relaxed px-4 md:px-24 text-justify">
            <strong>Experience {videoList[mainIndex].title} in Virtual Reality (VR):</strong>
            <br />
            {videoList[mainIndex].description}
          </p>

          <button
            type="button"
            onClick={() => navigate("/vrpage")}
            className="group ml-24 mt-6 text-white text-sm md:text-base font-medium relative transition-transform duration-300 hover:scale-105"
          >
            <span className="inline-block pb-0.5 border-b-2 border-transparent group-hover:border-white transition-all duration-300">
              Learn more
            </span>
            <IoIosArrowRoundForward className="inline-block text-[#a92b4e] text-2xl ml-1 align-middle transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Main Video Section */}
        <motion.div
          initial={{ opacity: 0.8, scale: 0.95 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: "easeInOut", type: "tween" },
          }}
          viewport={{ amount: 0.3 }}
          className="w-full h-[25rem] rounded-xl shadow-lg overflow-hidden bg-black"
        >
          <video
            className="w-full h-full object-cover"
            src={mainVideo}
            autoPlay
            muted
            loop
            controls
          />
        </motion.div>
      </div>

      {/* Scrolling Thumbnails */}
      <div className="overflow-hidden group mt-8 px-4">
        <div className="flex w-max space-x-4 animate-scrollVideos group-hover:pause-scroll">
          {videoList.map((vid, index) =>
            index !== mainIndex && (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer rounded-xl overflow-hidden shadow-md border border-gray-700 w-60 h-36"
                onClick={() => handleVideoClick(vid, index)}
              >
                <video
                  className="w-full h-full object-cover"
                  src={vid.low}
                  muted
                  loop
                  autoPlay
                />
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Vr;
