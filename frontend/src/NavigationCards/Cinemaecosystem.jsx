import React, { useState, useEffect } from 'react';
import Longcards from '../Cards/Longcards';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { motion } from 'framer-motion';
import Map from './Map';
import LocalArtist from '../Cards/LocalArtist';
import Security from '../Cards/Security';
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

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div id="Cinemaecosystem" className="pt-12 bg-[#380e1a] overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-18">
      
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
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-20 p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-full text-red-400 hover:text-red-300 transition-all duration-300 backdrop-blur-sm"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Content */}
            <div className="h-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {activePopup === 'map' && <Map />}
              {activePopup === 'localArtist' && <LocalArtist />}
              {activePopup === 'security' && <Security />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cinemaecosystem;
