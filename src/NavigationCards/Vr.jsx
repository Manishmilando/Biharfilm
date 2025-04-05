import React from "react";
import Vrvideo from "/src/assets/Vrvideo.mp4";
import { IoIosArrowRoundForward } from "react-icons/io";

function Vr() {
  return (
   
        <div id="Vr" className=" bg-[#190108] pt-20"> 
              <h2 className="text-white text-5xl pl-25 font-bold">VR</h2>
        
              <div className="flex">
                <p className="text-white text-2xl pl-25 mt-4 font-semibold">Learn more</p>
                <IoIosArrowRoundForward className="text-[#a92b4e] text-8xl pb-7 scale-x-150" />
              </div>
              <div className="w-full h-screen bg-[#190108] pl-[40rem] ">
      <div className="w-[40rem] h-[25rem] rounded-xl shadow-lg overflow-hidden bg-black">
        <video className="w-full h-full object-cover" src={Vrvideo} autoPlay muted loop />
      </div>
    </div>
    </div>
  );
}

export default Vr;
