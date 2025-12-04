import React from 'react';
import { motion } from 'framer-motion';
import Navbar from "../Components/Navbar";
import ContactUs from "./ContactUs";

const Gallery = () => {
    const galleryItems = [
        {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2918&auto=format&fit=crop',
            span: 'col-span-1 md:col-span-2 row-span-2',
            title: 'Cinematic Landscapes'
        },
        {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
            span: 'col-span-1 md:col-span-1 row-span-1',
            title: 'Behind the Scenes'
        },
        {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop',
            span: 'col-span-1 md:col-span-1 row-span-2',
            title: 'Cultural Heritage'
        },
        {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2912&auto=format&fit=crop',
            span: 'col-span-1 md:col-span-1 row-span-1',
            title: 'Film Sets'
        },
        {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=2787&auto=format&fit=crop',
            span: 'col-span-1 md:col-span-1 row-span-1',
            title: 'Local Talent'
        },
        {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4',
            span: 'col-span-1 md:col-span-2 row-span-1',
            title: 'Location Scouting'
        },
        {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop',
            span: 'col-span-1 md:col-span-1 row-span-2',
            title: 'Premiere Night'
        },
        {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-sunset-41638-large.mp4',
            span: 'col-span-1 md:col-span-2 row-span-2',
            title: 'City Lights'
        },
        {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=2828&auto=format&fit=crop',
            span: 'col-span-1 md:col-span-1 row-span-1',
            title: 'Artistic Vision'
        },
    ];

    return (
        <div className="min-h-screen bg-[#19050c] font-sans">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-16 px-4 text-center border-b border-white/5">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="z-10 flex flex-col items-center text-center text-white max-w-3xl mb-8"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl great-vibes-regular mb-3 text-white drop-shadow-2xl">
                        Gallery
                    </h1>

                    <p className="text-xs text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
                        Explore the vibrant world of Bihar's cinema through our curated collection
                    </p>
                </motion.div>
            </div>

            {/* Perfect Bento Grid */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-20 lg:px-20 py-20 ">
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-6">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className={`relative group rounded-3xl overflow-hidden ${item.span}`}
                        >
                            {/* Media Content */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#891737]/20 to-transparent z-0"></div>

                            {item.type === 'video' ? (
                                <video
                                    src={item.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-2.5 py-1 bg-[#891737] text-white text-xs font-medium uppercase tracking-wider rounded-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {item.type}
                                    </span>
                                    <h3 className="text-white text-xs md:text-xs font-semibold tracking-tight">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Subtle Border */}
                            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ContactUs />
        </div>
    );
};

export default Gallery;
