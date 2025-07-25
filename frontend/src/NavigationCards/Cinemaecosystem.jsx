import React from 'react';
import Longcards from '../Cards/Longcards';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { motion } from 'framer-motion';
import '../App.css'; // Import your CSS file for styles

function Cinemaecosystem() {
  return (
    <div id="Cinemaecosystem" className="pt-12 bg-[#380e1a] overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      {/* Header */}
      <h2 className="text-white text-4xl sm:text-4xl md:text-7xl tapestry-regular">Cinema Ecosystem</h2>

      {/* Learn More Row */}


      {/* Description */}
      <div className="pt-6 max-w-3xl">
        <p className="text-white text-sm sm:text-base leading-relaxed text-justify">
          Cinema Ecosystem in Bihar — Bihar’s cinema culture is a dynamic mix of tradition and modernity. From the popularity of Bhojpuri and Maithili films to the growing presence of multiplexes and digital platforms, cinema remains a major source of entertainment across the state.
        </p>
         <div className="flex items-center mt-2 space-x-2">
        <p className="text-white text-base sm:text-lg font-semibold">Learn more</p>
        <IoIosArrowRoundForward className="text-[#a92b4e] text-3xl sm:text-4xl scale-x-150" />
      </div>
      </div>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0.8, scale: 0.95 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 1.5,
            ease: "easeInOut",
            type: "tween",
          },
        }}
        exit={{
          opacity: 0,
          y: 20,
          transition: {
            duration: 0.8,
            ease: "easeInOut",
            type: "tween",
          },
        }}
        viewport={{ amount: 0.3 }}
        className="flex flex-wrap justify-center gap-6 sm:gap-10 pt-10 pb-14"
      >
        <Longcards
          imageUrl="https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2022/04/17/shooting_village_bhadun_1.jpg"
          title="Village Set in Action"
          description="Capturing raw storytelling from the heart of Bhadun village during an on-location shoot."
        />

        <Longcards
          imageUrl="https://img.freepik.com/premium-photo/hengdian-world-studio-shooting-film-studio-ancient-village-chinese-screen_1048944-4451696.jpg"
          title="Timeless Heritage Scenes"
          description="A historical film set blending traditional architecture with cinematic creativity."
        />

        <Longcards
          imageUrl="https://www.gramvikas.org/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-03-at-10.23.14-PM.jpeg"
          title="Filming in the Heartland"
          description="Documenting cultural narratives from rural India — real stories, real locations."
        />

      </motion.div>
    </div>
  );
}

export default Cinemaecosystem;
