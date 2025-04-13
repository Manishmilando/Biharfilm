import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../app.css";


// Data: Actors and Directors from Bihar
const people = [
  {
    id: 1,
    name: "Pankaj Tripathi",
    occupation: "Actor",
    img: "https://media.assettype.com/freepressjournal/2022-01/bdc02614-b127-4db2-a440-2f44b9f5f284/Screenshot_2022_01_25_at_5_43_01_AM.png?width=1200",
  },
  {
    id: 2,
    name: "Manoj Bajpayee",
    occupation: "Actor",
    img: "https://th-i.thgim.com/public/incoming/n3k61b/article68075789.ece/alternates/FREE_1200/MANOJ-SHHHH.jpg",
  },
  {
    id: 3,
    name: "Neha Sharma",
    occupation: "Actress",
    img: "https://akm-img-a-in.tosshub.com/aajtak/images/video/202403/6600096b7e220-will-neha-sharma-contest-elections-from-bihar-240722280-16x9.png",
  },
  {
    id: 4,
    name: "Imtiaz Ali",
    occupation: "Director",
    img: "https://m.media-amazon.com/images/M/MV5BMTYwOTUwMTk3MF5BMl5BanBnXkFtZTgwMjA1NDEzMTE@._V1_.jpg",
  },
  {
    id: 5,
    name: "Prakash Jha",
    occupation: "Director",
    img: "https://m.media-amazon.com/images/M/MV5BMTc1NjMwNDE4Ml5BMl5BanBnXkFtZTgwODA1ODA0OTE@._V1_.jpg",
  },
  {
    id: 6,
    name: "Ashok Pathak",
    occupation: "Actor",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR828Y_CtPjMKsMW7d3_tBaS5ehmWw8IJxjPA&s",
  },
  {
    id: 7,
    name: "Omkar kadam",
    occupation: "Actor",
    img: "https://m.media-amazon.com/images/M/MV5BMGE5ZWY1YzctYTA3Ni00MWU0LWE3OWUtZDY1MjBiNjUzYmFmXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 8,
    name: "Rinki Sanvika",
    occupation: "Actress",
    img: "https://www.postoast.com/wp-content/uploads/2022/05/sanvika-panchayat-photos.jpg",
  },
  {
    id: 9,
    name: "Kashish khan",
    occupation: "Actress",
    img: "https://images.filmibeat.com/img/popcorn/profile_photos/kashish-khan-20210923104828-50509.jpg",
  },
  
];

const CarouselOfCelebs = () => {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 4;
  const total = people.length;

  const nextSlide = () => {
    setIndex((prev) => (prev + itemsPerPage >= total ? 0 : prev + itemsPerPage));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - itemsPerPage < 0 ? total - itemsPerPage : prev - itemsPerPage));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#190108] py-10 ">
      <h2 className=" text-white playwrite-mx-guides-regular text-5xl mb-10 pt-10 pb-8">Celebrities of Bihar</h2>
  
      {/* Carousel Cards */}
      <div className="w-full flex justify-center">
        <div className="flex gap-6 transition-transform duration-500 ease-in-out">
          {people.slice(index, index + itemsPerPage).map((person) => (
            <div
              key={person.id}
              className="w-72 h-96 bg-white/40 backdrop-blur-3xl text-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-700 relative"
            >
              {/* Image */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                {/* Fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-10" />
              </div>
  
              {/* Text over the fade */}
              <div className="absolute bottom-4 left-4 z-20">
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p className="text-sm text-white">{person.occupation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
  

      {/* Arrows BELOW the cards */}
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={prevSlide} className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600">
          <IoIosArrowBack size={30} />
        </button>
        <button onClick={nextSlide} className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600">
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </div>
  );
};

export default CarouselOfCelebs;