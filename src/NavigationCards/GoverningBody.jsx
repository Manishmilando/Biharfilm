import React from "react";

const topImages = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_3U00IWSSR-omPQem2GCHZyg_Kq0DmZoGg&s",
    alt: "Leader 1",
    name: "Shri Motilal Prasad",
    namee: "Hon'ble Minister"
  },
  {
    src: "https://www.northblocksouthblock.com/wp-content/uploads/2025/01/u-6.jpg",
    alt: "Leader 2",
    name: "Sri Pranav Kumar,I.A.S",
    namee: "Managing Director",
    nameee: "Secretary (Art, Culture & Youth Department)"
  },
];

const bodyMembers = [
  {
    img: "https://static.toiimg.com/thumb/msid-72050900,width-1070,height-580,imgsize-60422,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    name: "Ravi Kishan",
    role: "Finance Head",
    description: "Responsible for managing the overall finances of the board.",
  },
  {
    img: "https://img.mensxp.com/media/content/2023/Mar/image-7-credit--IMDB_641950eb0fb3f.jpeg?w=780&h=1272&cc=1",
    name: "Jane Smith",
    role: "Public Relations",
    description: "Handles external communications and media outreach.",
  },
  {
    img: "https://img.mensxp.com/media/content/2023/Mar/main-image-credit--Manoj-Bajpayee_6419b0388bfdd.png",
    name: "Alex Carter",
    role: "Tech Lead",
    description: "Oversees the technical aspects and digital transformation.",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Pankaj_Tripathi_World_Premiere_Newton_Zoopalast_Berlinale_2017_06.jpg/640px-Pankaj_Tripathi_World_Premiere_Newton_Zoopalast_Berlinale_2017_06.jpg",
    name: "Emily White",
    role: "Legal Advisor",
    description: "Advises the team on legal matters and compliance.",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMjExOTEyNDcwMl5BMl5BanBnXkFtZTgwMjM3NzM0OTE@._V1_.jpg",
    name: "Sam Wilson",
    role: "Event Manager",
    description: "Coordinates and plans official film-related events.",
  },
  {
    img: "https://hindi.cdn.zeenews.com/hindi/sites/default/files/2024/07/21/3069269-bihar-top-actors-4.jpeg",
    name: "Linda Green",
    role: "Content Lead",
    description: "Leads all content initiatives including publications.",
  },
];

const GoverningComponent = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-20 pt-10 pb-20 bg-[#190108] w-full" id="GoverningBody">
      {/* Title */}
      <p className="text-white text-3xl sm:text-4xl md:text-5xl font-bold pb-12">
        Governing Bodies of Bihar Films
      </p>

      {/* Top Leaders */}
      <div className="flex flex-wrap justify-center gap-12 sm:gap-20 mb-16">
        {topImages.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-white w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg hover:scale-105 transition">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-white text-base sm:text-lg font-semibold">{item.name}</p>
            <p className="text-zinc-400 text-sm">{item.namee}</p>
            {item.nameee && <p className="text-zinc-400 text-sm">{item.nameee}</p>}
          </div>
        ))}
      </div>

      {/* Member Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {bodyMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 sm:justify-start px-6 sm:px-10 lg:px-16 py-4 hover:bg-gray-100 transition"
            >
              {/* Profile Image */}
              <div className="w-12 h-12 rounded-full overflow-hidden mr-0 sm:mr-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Role/Desc block */}
              <div className="flex flex-col sm:flex-row sm:items-center w-full sm:gap-6">
                <div className="w-full sm:w-48 text-gray-800 font-medium">{member.name}</div>
                <div className="w-full sm:w-48 text-gray-500">{member.role}</div>
                <div className="text-gray-600 text-sm">{member.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoverningComponent;
