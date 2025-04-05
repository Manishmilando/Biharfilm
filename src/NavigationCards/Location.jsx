import React from "react";
import InfiniteCarousel from "../Cards/InfiniteCarousel";
import { IoIosArrowRoundForward } from "react-icons/io";

function Location() {
  return (
    <div id="shooting-location" className="pt-24 bg-[#190108]"> {/* ✅ Added ID for scrolling */}
      <h2 className="text-white text-5xl ml-25 font-bold">Shooting Locations</h2>

      <div className="flex">
        <p className="text-white text-2xl ml-25 mt-4 font-semibold">Learn more</p>
        <IoIosArrowRoundForward className="text-[#a92b4e] text-8xl pb-7 scale-x-150" />
      </div>

      <InfiniteCarousel />
    </div>
  );
}

export default Location;
