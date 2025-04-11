import React from "react";
import Vrvideo from "/src/assets/Vrvideo.mp4";
import { IoIosArrowRoundForward } from "react-icons/io";

function Vr() {
  return (
    <div id="Vr" className="bg-[#190108] pt-20 px-10">
      {/* Heading */}
      <h2 className="text-white text-5xl pl-6 font-bold">Virtual Reality (VR)</h2>

      {/* Learn more link under the heading */}
      <div className="flex items-center mt-2 mb-8">
        <p className="text-white text-lg pl-6 font-semibold">Learn more</p>
        <IoIosArrowRoundForward className="text-[#a92b4e] text-4xl ml-2 scale-x-150" />
      </div>

      {/* Grid section with text and video */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text content */}
        <div>
        <p className="text-white text-base leading-relaxed pl-10 pr-24 text-justify">
  <strong>Experience Bapu Tower, Bihar in Virtual Reality (VR):</strong> <br />
  Step into the cultural core of Bihar with an immersive 360° VR journey through Bapu Tower. Witness the stunning architecture, explore its historical backdrop, and feel the vibrant energy of the surrounding cityscape. Whether you're a history lover, traveler, or student, this virtual experience brings Bapu Tower to life — making you feel like you're truly there, without ever leaving your space.


</p>
        </div>

        {/* Video */}
        <div className="w-full h-[25rem] rounded-xl shadow-lg overflow-hidden bg-black">
          <video className="w-full h-full object-cover" src={Vrvideo} autoPlay muted loop />
        </div>
      </div>
    </div>
  );
}

export default Vr;
