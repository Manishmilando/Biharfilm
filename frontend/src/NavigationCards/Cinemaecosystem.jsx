import React, { useState, useEffect } from 'react';
import Longcards from '../Cards/Longcards';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { motion } from 'framer-motion';
import Map from './Map';
import LocalArtist from '../Cards/LocalArtist'; // Adjust path if needed
import Security from '../Cards/Security'; // Adjust path if needed
import '../App.css';

function Cinemaecosystem() {
  const [activePopup, setActivePopup] = useState(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activePopup) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [activePopup]);

  const handleCardClick = (popupType) => {
    setActivePopup(popupType);
  };

  const handleClose = () => {
    setActivePopup(null);
  };

  return (
    <div id="Cinemaecosystem" className="pt-12 bg-[#380e1a] overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      
      {/* ===== Heading and Description ===== */}
      <div className="text-center text-white max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-7xl tapestry-regular mb-4">Cinema Ecosystem</h2>
        <p className="text-base md:text-lg text-gray-300">
          Explore the vibrant ecosystem that supports filmmaking — from props and production 
          assets to local artists and security services. Each element plays a crucial role 
          in shaping authentic cinematic experiences.
        </p>
      </div>

      {/* ===== Cards Section ===== */}
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
          title="Props & Production Assets"
          description="Capturing raw storytelling from the heart of Bhadun village during an on-location shoot."
          onClick={() => handleCardClick('map')}
        />

        <Longcards
          imageUrl="https://www.gramvikas.org/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-03-at-10.23.14-PM.jpeg"
          title="Local Artists"
          description="A historical film set blending traditional architecture with cinematic creativity."
          onClick={() => handleCardClick('localArtist')}
        />

        <Longcards
          imageUrl="https://img.freepik.com/premium-photo/hengdian-world-studio-shooting-film-studio-ancient-village-chinese-screen_1048944-4451696.jpg"
          title="Security & Safety Services"
          description="Documenting cultural narratives from rural India — real stories, real locations."
          onClick={() => handleCardClick('security')}
        />
      </motion.div>

      {/* ===== Modal Popup ===== */}
      {activePopup && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="rounded-lg p-4 border-2 border-white relative max-w-5xl w-full">
            <button
              className="absolute top-2 right-4 text-red-600 text-3xl font-bold"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>
            {activePopup === 'map' && <Map />}
            {activePopup === 'localArtist' && <LocalArtist />}
            {activePopup === 'security' && <Security />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cinemaecosystem;
