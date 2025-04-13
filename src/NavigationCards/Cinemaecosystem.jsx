import React from 'react'
import Longcards from '../Cards/Longcards'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { motion } from 'framer-motion'
function Cinemaecosystem() {
  return (

    <div id="Cinemaecosystem" className="pt-24 bg-[#380e1a] overflow-hidden"> {/* ✅ Added ID for scrolling */}
      <h2 className="text-white text-5xl ml-25 font-bold">Cinema Ecosystem</h2>
      <div className="flex">
        <p className="text-white text-1xl ml-25 mt-4 font-semibold">Learn more</p>
        <IoIosArrowRoundForward className="text-[#a92b4e] text-5xl pt-4 scale-x-150" />
      </div>
      <div className='pl-[6.5rem] pt-8'>
        <p className="text-white text-base  w-1/2  h-[12rem] leading-relaxed   text-justify">
          <p1>Cinema Ecosystem in Bihar
            Bihar’s cinema culture is a dynamic mix of tradition and modernity. From the popularity of Bhojpuri and Maithili films to the growing presence of multiplexes and digital platforms, cinema remains a major source of entertainment across the state. Local filmmakers continue to preserve regional identity while embracing new storytelling styles, making Bihar an evolving hub for film and culture.</p1> <br />
        </p>
      </div>

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
        duration: 0.8,      // Customize duration as needed
        ease: "easeInOut",  // Smooth ease
        type: "tween",
      },
    }}
    viewport={{ amount: 0.3 }}
    
       
      
      className='flex gap-10 pt-8 pl-28 pb-20'>
        <Longcards imageUrl="https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2022/04/17/shooting_village_bhadun_1.jpg" title="Ready to fly" description="This is a description of the image." />
        <Longcards imageUrl="https://img.freepik.com/premium-photo/hengdian-world-studio-shooting-film-studio-ancient-village-chinese-screen_1048944-4451696.jpg" title="Ready to fly" description="This is a description of the image." />
        <Longcards imageUrl="https://www.gramvikas.org/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-03-at-10.23.14-PM.jpeg" title="Ready to fly" description="This is a description of the image." />
      </motion.div>

      <div />
    </div>

  )
}

export default Cinemaecosystem