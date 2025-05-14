import React, { useState,useEffect} from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../app.css";


// Data: Actors and Directors from Bihar
const people = [
  {
    id: 1,
    name: "Manoj Bajpayee",
    occupation: "Actor",
    img: "https://th-i.thgim.com/public/incoming/n3k61b/article68075789.ece/alternates/FREE_1200/MANOJ-SHHHH.jpg",
  },
  {
    id: 2,
    name: "Pankaj Tripathi",
    occupation: "Actor",
    img: "https://media.assettype.com/freepressjournal/2022-01/bdc02614-b127-4db2-a440-2f44b9f5f284/Screenshot_2022_01_25_at_5_43_01_AM.png?width=1200",
  },
  {
    id: 3,
    name: "Sonakshi Sinha",
    occupation: "Actress",
    img: "https://static.toiimg.com/photo/105058466/105058466.jpg",
  },
  {
    id: 4,
    name: "Shatrughan Sinha",
    occupation: "Actor",
    img: "https://sm.mashable.com/t/mashable_in/photo/default/ss-cvr_2agn.1248.png",
  },
  {
    id: 5,
    name: "Sushant Singh",
    occupation: "Actor",
    img: "https://i.pinimg.com/736x/40/60/63/406063a5d7bf517313bf00ee5d6ab840.jpg",
  },
  {
    id: 6,
    name: "Sanjay Mishra",
    occupation: "Actor",
    img: "https://i.pinimg.com/564x/33/cf/5a/33cf5a9baf45e25e6b8ce5adc89f8b54.jpg",
  },
  {
    id: 7,
    name: "Neha Sharma",
    occupation: "Actress",
    img: "https://akm-img-a-in.tosshub.com/aajtak/images/video/202403/6600096b7e220-will-neha-sharma-contest-elections-from-bihar-240722280-16x9.png",
  },
  {
    id: 8,
    name: "Pawan Sigh",
    occupation: "Actor",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqCKuE21Iw0ceFmzEp117cqgEZS_nZUyUm-g&s",
  },
  {
    id: 9,
    name: "Ustad Bismillaah Khan",
    occupation: "Shehnai Maestro",
    img: "https://akm-img-a-in.tosshub.com/indiatoday/bismillah-khan-647_032116095003.jpg",
  },
  {
    id: 10,
    name: "Sharda Sinha",
    occupation: "Folk Singer",
    img: "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/11/India-Today_Sharda-Sinha-YIM6937-1-1-scaled.jpg?size=*:900",
  },
  {
    id: 11,
    name: "Maithili Thakur",
    occupation: "Folk/Classic Singer",
    img: "https://c.saavncdn.com/artists/Maithili_Thakur_002_20230227072619_500x500.jpg",
  },
  {
    id: 12,
    name: "Chandan Tiwari",
    occupation: "Folk Singer",
    img: "https://i1.sndcdn.com/artworks-000088489163-208oxp-t500x500.jpg",
  },
  {
    id: 13,
    name: "Bhikhari Thakur",
    occupation: "Bhojpuri Folk Dramatist",
    img: "https://images.news18.com/ibnkhabar/uploads/2021/07/Bhikhari-Thakur-1.jpg?im=FitAndFill,width=1200,height=675",
  },
  {
    id: 14,
    name: "Sita Devi",
    occupation: "Madhubani Artist",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSIz0LIxS_vCnv4_hKVG4Hm8pKwA5ewOlKFA&s",
  },
  {
    id: 15,
    name: "Shanti Devi",
    occupation: "Godna Artist",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7c2MyynJnjoiUs8s0MGLHpgAoqfkDnrmHwA&s",
  },
  {
    id: 16,
    name: "Dulari Devi",
    occupation: "Madhubani Artist",
    img: "https://www.folkartopedia.com/wp-content/uploads/elementor/thumbs/Dularee-Devi_2-on0xbaf8s19wqch43hw4ynl4lf5ni64lavjlt2w41c.jpg",
  },
  
];

const CarouselOfCelebs = () => {
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const total = people.length;

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + itemsPerPage >= total ? 0 : prev + itemsPerPage));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - itemsPerPage < 0 ? total - itemsPerPage : prev - itemsPerPage));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#190108] py-10">
      <h2 className="text-white playwrite-mx-guides-regular text-3xl sm:text-4xl md:text-5xl mb-10 pt-10 pb-8 text-center">
        Celebrities of Bihar
      </h2>

      {/* Carousel Cards */}
      <div className="w-full flex justify-center px-4">
        <div className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out flex-wrap justify-center">
          {people.slice(index, index + itemsPerPage).map((person) => (
            <div
              key={person.id}
              className="w-64 sm:w-72 h-96 bg-white/40 backdrop-blur-3xl text-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-700 relative"
            >
              {/* Image */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-10" />
              </div>

              {/* Text */}
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