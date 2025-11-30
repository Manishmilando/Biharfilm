import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../Components/Navbar";
import Footer from "../ContactUs";
import "../../App.css";

// Sample data (extend as needed)
const vrExperiences = [
  { id: 1, image: "https://media1.thrillophilia.com/filestore/zdxzzqjsjj1q6voya50tb8n16jy8_1608640626_shutterstock_1441359566.jpg?w=400&dpr=2", link: "https://youtu.be/8HV1JVgqPM0", title: "Glass Bridge, Rajgir" },
  { id: 2, image: "https://content.jdmagicbox.com/comp/nalanda/m2/9999p6112.6112.141211170801.c4m2/catalogue/jalmandir-temple-pawapuri-nalanda-tourist-attraction-6iv2a3s.jpg", link: "https://youtu.be/8HV1JVgqPM0", title: "Pawapuri, Nalanda" },
  { id: 3, image: "https://rajgirsafari.bihar.gov.in/frontend/images/slider/2.jpg", link: "https://youtu.be/8HV1JVgqPM0", title: "Jungle Safari, Rajgir" },
  { id: 4, image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/12/shutterstock_402120757-1.jpg", link: "https://youtu.be/8HV1JVgqPM0", title: "Bodh Gaya Temple" },
  { id: 5, image: "https://s7ap1.scene7.com/is/image/incredibleindia/maner-sharif-dargah-patna-bihar-2-musthead-hero?qlt=82&ts=1742185150302", link: "https://youtu.be/8HV1JVgqPM0", title: "Maner Sharif, Patna" },
];

const Vrpage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#190108] text-white overflow-hidden">
      <Navbar />

      {/* Background Video with Overlay */}
      <div className="fixed inset-0 z-0">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://res.cloudinary.com/dgra109xv/video/upload/v1755760966/Vrpage_cj0a7w.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-[#190108]/80 backdrop-blur-[2px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-24 sm:py-32">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 great-vibes-regular drop-shadow-2xl">
            Explore Bihar in Virtual Reality
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in the rich heritage and breathtaking landscapes of Bihar through our curated VR experiences.
          </p>
        </motion.div>

        {/* Grid of VR Experiences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {vrExperiences.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative h-[320px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#4f0419]/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onClick={() => window.open(item.link, "_blank")}
            >
              {/* Image Section */}
              <div className="relative h-[75%] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#190108] via-transparent to-transparent opacity-60" />

                {/* VR Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="absolute bottom-0 left-0 w-full h-[25%] px-5 flex items-center bg-[#190108]">
                <div className="w-full">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ff4d6d] transition-colors truncate">
                    {item.title}
                  </h3>
                  <div className="mt-2 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4f0419] w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Vrpage;
