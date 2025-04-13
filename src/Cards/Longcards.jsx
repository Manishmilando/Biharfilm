import React from "react";

function CardWithText({ imageUrl, title, description }) {
  return (
    <div className=" mt-6 w-[25rem] h-[35rem]  group relative overflow-hidden rounded-2xl bg-[#190108] shadow-lg transform transition duration-300 hover:scale-95 hover:bg-[#38242a] outline-1 outline-[#3a0d1a] outline-offset-1">
      {/* Image Section with Zoom Effect */}
      <div className="group relative h-1/2 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Text Section (50% Height) */}
      <div className="h-1/2 p-4 flex flex-col justify-center">
        <h2 className="text-lg font-bold text-gray-300">{title}</h2>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
        <div className="absolute inset-0  group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}

export default CardWithText;
