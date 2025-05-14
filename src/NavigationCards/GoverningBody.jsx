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
    name: "Sri Pranav Kumar, IAS",
    role: "Managing Director Cum Secretary (Art,Culture & Youth Dept.)",
    description: "0612-2219213",
  },
  {
    img: "https://img.mensxp.com/media/content/2023/Mar/image-7-credit--IMDB_641950eb0fb3f.jpeg?w=780&h=1272&cc=1",
    name: "Sri Arvind Ranjan Das",
    role: "Consultant(Film)",
    description: "0612-2219213",
  },
  {
    img: "https://img.mensxp.com/media/content/2023/Mar/main-image-credit--Manoj-Bajpayee_6419b0388bfdd.png",
    name: "V.D.Mishra",
    role: "	Consultant (Fin. & Account)",
    description: "7482075777",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Pankaj_Tripathi_World_Premiere_Newton_Zoopalast_Berlinale_2017_06.jpg/640px-Pankaj_Tripathi_World_Premiere_Newton_Zoopalast_Berlinale_2017_06.jpg",
    name: "	Sonika Kumari",
    role: "Assistant Section Officer",
    description: "",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMjExOTEyNDcwMl5BMl5BanBnXkFtZTgwMjM3NzM0OTE@._V1_.jpg",
    name: "Moniza Hafizee",
    role: "Junior Consultant (Communication and Networking)",
    description: "",
  },
  {
    img: "https://hindi.cdn.zeenews.com/hindi/sites/default/files/2024/07/21/3069269-bihar-top-actors-4.jpeg",
    name: "Leela Kumari Prasad",
    role: "Data Entry Operator",
    description: "",
  },
  {
    img: "https://hindi.cdn.zeenews.com/hindi/sites/default/files/2024/07/21/3069269-bihar-top-actors-4.jpeg",
    name: "Amit Ranjan",
    role: "Data Entry Operator",
    description: "",
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
        <table className=" table-auto divide-y divide-gray-200">
          <tbody>
            {bodyMembers.map((member, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition"
              >
                {/* Profile Image */}
                <td className="px-6 sm:px-10 lg:px-16 py-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                {/* Name */}
                <td className="px-1 py-4 text-gray-800 font-medium w-full sm:w-48">
                  {member.name}
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-gray-500 w-full sm:w-48 whitespace-nowrap">
                  {member.role}
                </td>

                {/* Description */}
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {member.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoverningComponent;
