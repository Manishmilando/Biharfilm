import React from "react";
import "../App.css";

const topImages = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_3U00IWSSR-omPQem2GCHZyg_Kq0DmZoGg&s",
    alt: "Leader 1",
    name: "Shri Motilal Prasad",
    namee: "Hon'ble Minister",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/gatishaktibihar.firebasestorage.app/o/biharfilm%2Fhome_secy.jpeg?alt=media&token=2f9b010e-0fed-4627-949d-a4779308a995",
    alt: "Leader 2",
    name: "Sri Pranav Kumar, IAS",
    namee: "Managing Director",
    nameee: "Secretary (Art, Culture & Youth Department)",
  },
];

const bodyMembers = [
  {
    img: "https://static.wixstatic.com/media/cd3dbe_8f26ba759b334abc94aa6f69dd36f2cc~mv2.jpeg/v1/fill/w_667,h_375,al_c,q_80,enc_avif,quality_auto/cd3dbe_8f26ba759b334abc94aa6f69dd36f2cc~mv2.jpeg",
    name: "Sri Arvind Ranjan Das",
    role: "Consultant(Film)",
    description: "0612-2219213",
  },
  {
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "V.D.Mishra",
    role: "Consultant (Fin. & Account)",
    description: "7482075777",
  },
  {
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Sonika Kumari",
    role: "Assistant Section Officer",
    description: "",
  },
  {
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Kumar Gaurav",
    role: "Junior Consultant (Communication and Networking)",
    description: "",
  },
  {
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Leela Kumari Prasad",
    role: "Data Entry Operator",
    description: "",
  },
  {
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Amit Ranjan",
    role: "Data Entry Operator",
    description: "",
  },
];

const GoverningComponent = () => {
  return (
    <div
      className="px-4 sm:px-6 lg:px-20 pt-10 pb-20 bg-[#190108] w-full rounded-tl-4xl rounded-tr-4xl -mt-10 relative z-10 overflow-x-hidden"
      id="GoverningBody"
    >
      {/* Title */}
      <p className="text-white text-3xl sm:text-4xl md:text-7xl lg:text-8xl bebas-neue-regular pb-12 text-center sm:text-left sm:pl-12">
        Governing Body
      </p>

      {/* Top Leaders */}
      <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-16">
        {topImages.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center max-w-[240px]"
          >
            <div className="bg-white w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg hover:scale-105 transition">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-white text-base sm:text-lg font-semibold">
              {item.name}
            </p>
            <p className="text-zinc-400 text-sm">{item.namee}</p>
            {item.nameee && (
              <p className="text-zinc-400 text-sm">{item.nameee}</p>
            )}
          </div>
        ))}
      </div>

      {/* Member Compact Grid for larger screens */}
      <div className="hidden sm:block bg-white rounded-xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {bodyMembers.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-[60px_1fr_1fr_1fr] items-center px-6 sm:px-10 lg:px-16 py-3 hover:bg-gray-50 transition"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-800 font-medium truncate">{member.name}</p>
              <p className="text-gray-500 text-sm truncate">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Member stacked layout for mobile */}
      <div className="block sm:hidden space-y-6">
        {bodyMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 flex items-start gap-4"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-900 font-semibold">{member.name}</p>
              <p className="text-gray-600 text-sm">{member.role}</p>
              {member.description && (
                <p className="text-gray-500 text-sm mt-1">
                  {member.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoverningComponent;
