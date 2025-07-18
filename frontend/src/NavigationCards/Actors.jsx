import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import "../app.css";

const people = [
  {
    id: 1,
    name: "Manoj Bajpayee",
    occupation: "Actor",
    dob: "23 April 1969",
    district: "West Champaran",
    img: "https://th-i.thgim.com/public/incoming/n3k61b/article68075789.ece/alternates/FREE_1200/MANOJ-SHHHH.jpg",
    description: "Renowned for powerful roles in independent and commercial films.",
    bestWork: "The Family Man",
    imdb: "https://www.imdb.com/name/nm0048075/?ref_=ext_shr_lnk",
  },
  {
    id: 2,
    name: "Pankaj Tripathi",
    occupation: "Actor",
    dob: "5 September 1976",
    district: "Gopalganj",
    img: "https://media.assettype.com/freepressjournal/2022-01/bdc02614-b127-4db2-a440-2f44b9f5f284/Screenshot_2022_01_25_at_5_43_01_AM.png?width=1200",
    description: "Famous for his versatility and natural acting style.",
   bestWork: "Mirzapur",
    imdb: "https://www.imdb.com/name/nm2690647/?ref_=ext_shr_lnk",
  },
  
  {
    id: 3,
    name: "Prakash Jha",
    occupation: "Producer & Actor",
    dob: "27 February 1952",
    district: "Bettiah, West Champaran",
    img: "https://m.media-amazon.com/images/M/MV5BMTc1NjMwNDE4Ml5BMl5BanBnXkFtZTgwODA1ODA0OTE@._V1_.jpg",
    description: "Renowned filmmaker known for his political and socio-political films like Raajneeti, Gangaajal and Apaharan.",
    bestWork: "Crook",
    imdb: "https://www.imdb.com/name/nm2777281/?ref_=ext_shr_lnk",
  },
  
  {
    id: 4,
    name: "Shatrughan Sinha",
    occupation: "Actor",
    dob: "15 July 1946",
    district: "Patna",
    img: "https://sm.mashable.com/mashable_in/seo/8/88864/88864_trrd.png",
    description: "Veteran actor and politician, iconic in 70s-80s cinema.",
    bestWork: "Kalicharan",
    imdb: "https://www.imdb.com/name/nm0802374/?ref_=ext_shr_lnk",
  },
   
  {
    id: 5,
    name: "Sushant Singh Rajput",
    occupation: "Actor",
    dob: "21 January 1986",
    district: "Patna",
    img: "https://i.pinimg.com/736x/40/60/63/406063a5d7bf517313bf00ee5d6ab840.jpg",
    description: "Talented actor known for heartfelt performances.",
    bestWork: "MS Dhoni: The Untold Story",
    imdb: "https://www.imdb.com/name/nm3818286/?ref_=ext_shr_lnk",
  },

  {
    id: 6,
    name: "Neha Sharma",
    occupation: "Actress",
    dob: "21 November 1987",
    district: "Bhagalpur",
    img: "https://akm-img-a-in.tosshub.com/aajtak/images/video/202403/6600096b7e220-will-neha-sharma-contest-elections-from-bihar-240722280-16x9.png",
    description: "Actress and model with presence in films and web series.",
    bestWork: "Crook",
    imdb: "https://www.imdb.com/name/nm2777281/?ref_=ext_shr_lnk",
  },
  

  {
    id: 7,
    name: "Neetu Chandra",
    occupation: "Actress",
    dob: "20 June 1984",
    district: "Patna",
    img: "https://www.filmibeat.com/wimg/desktop/2019/08/neetu-chandra_10.jpg",
    description: "Indian actress known for her roles in Hindi, Tamil, and Telugu cinema. ",
    bestWork: "Garam Masala (2005), Traffic Signal (2007)",
    imdb: "https://www.imdb.com/name/nm1911617/?ref_=ext_shr_lnk",
  },
  {
     id:8,
     name: "Imtiaz Ali",
     occupation: "Film Director & Writer",
     dob: "16 June 1971",
     district: "Jamshedpur (then Bihar, now Jharkhand)",
    img: "https://m.media-amazon.com/images/M/MV5BMTYwOTUwMTk3MF5BMl5BanBnXkFtZTgwMjA1NDEzMTE@._V1_.jpg",
     description: "Renowned Indian film director, producer, and writer known for his work on romantic dramas with emotional depth.",
     bestWork: "Jab We Met",
    imdb: "https://www.imdb.com/name/nm2777281/?ref_=ext_shr_lnk",
  },
  
  
  {
    id:9,
    name: "Sanjay Mishra",
    occupation: "Actor",
    dob: "6 October 1963",
    district: "Darbhangha",
    img: "https://i.pinimg.com/564x/33/cf/5a/33cf5a9baf45e25e6b8ce5adc89f8b54.jpg",
    description: "Celebrated for comic timing and strong character roles.",
    bestWork: "Ankhon Dekhi",
    imdb: "https://www.imdb.com/name/nm0592799/?ref_=ext_shr_lnk",
  },
   {
    id: 10,
    name: "Arunabh Kumar",
    occupation: "Entrepreneur, Producer, Director, Actor",
    dob: "26 November 1982",
    district: "Muzaffarpur",
    img: "https://www.iwmbuzz.com/wp-content/uploads/2025/06/arunabh-kumar-shares-a-heartfelt-note-on-his-wedding-anniversary-15.jpg",
    description: "Founder of The Viral Fever (TVF), known for popular web series like 'Permanent Roommates' and 'Pitchers'.",
    bestWork: "TVF Pitchers",
    imdb: "https://www.imdb.com/name/nm2837311/?ref_=ext_shr_lnk",
  },

  {
    id:11,
    name: "Gurmeet Choudhary",
    occupation: "Actor",
    dob: "22 February 1984",
    district: "Bhagalpur",
    img: "https://www.gethucinema.com/tmdb/eCeElyYgPm1ZvV1NWlBeQbUCp8c.jpg",
    description: "TV and film actor popular for mythological and action roles.",
    bestWork: "Khamoshiyan",
    imdb: "https://www.imdb.com/name/nm3073211/?ref_=ext_shr_lnk",
  },
 
  {
    id:12,
    name: "Chandan Roy",
    occupation: "Actor",
    dob: "20 December 1995",
    district: "Mahnar (Vaishali district)",
    img: "https://images.filmibeat.com/img/popcorn/profile_photos/chandanroy-20240530112240-60861.jpg",
    description: "Known for his warm, authentic portrayal of Vikas Shukla in ‘Panchayat’..",
    bestWork: "Panchayat (web series)",
    imdb: "https://www.imdb.com/name/nm0788686/?ref_=ext_shr_lnk",
  },
  {
    id: 13,
    name: "Ashok Yadav",
    occupation: "Actor",
    dob: "3 January 1985",
    district: "Darveshpur, near Siwan",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBuxF26RW4NAbH3bAhnym5oFJpbXEu4bfpw&s",
    description: "Bihari-born actor who rose from selling cotton to winning hearts as 'Binod' in Panchayat.",
    bestWork: "Panchayat (web series)",
    imdb: "https://www.imdb.com/name/nm9859083/?ref_=ext_shr_lnk",
  },
  {
    id: 14,
    name: "Pankaj Jha",
    occupation: "Actor, Painter, Writer, Director",
    dob: "2 February 1970",
    district: "Saharsa",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh1qXBXYNfRXOj44qO6zQ5A_S8XqZ9tuWDQw&s",
    description: "Actor, painter, writer, and director, acclaimed for his grounded portrayal of MLA Chandu Singh in Panchayat",
    bestWork: "Panchayat (web series)",
    imdb: "https://www.imdb.com/name/nm13792834/?ref_=ext_shr_lnk",
  },
   {
    id: 15,
    name: "Durgesh Kumar",
    occupation: "Actor",
    dob: "21 October 1984",
    district: "Darbhanga, Bihar",
    img: "https://static.toiimg.com/thumb/msid-110440378,width-400,resizemode-4/110440378.jpg",
   
    description: "Actor known for playing Bhushan in Panchayat; originally from Darbhanga, Bihar.",

    bestWork: "Panchayat (web series)",
    imdb: "https://www.imdb.com/name/nm6294201/?ref_=ext_shr_lnk",
  },

  {
    id: 16,
    name: "Bulloo Kumar",
    occupation: "Actor",
    dob: "5 February 1986",
    district: "Nawada",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtnRcu4PHPQgiqJxR60fwzozDEYf76VJm3w&s",
    description: "Actor and farmer’s son from Bihar, known for his comical role as Madhav in Seasons 2–3 of Panchayat.",

    bestWork: "Panchayat (web series)",
    imdb: "https://www.imdb.com/name/nm12872303/?ref_=ext_shr_lnk",
  },
  
  {
    id: 17,
    name: "Ustad Bismillah Khan",
    occupation: "Shehnai Maestro",
    dob: "21 March 1916",
    district: "Dumraon (Buxar)",
    img: "https://akm-img-a-in.tosshub.com/indiatoday/bismillah-khan-647_032116095003.jpg",
    description: "Legendary Shehnai player, Bharat Ratna awardee.",
    bestWork: "Goonj Uthi Shehnai (music)",
    imdb: "https://www.imdb.com/name/nm0451190/?ref_=ext_shr_lnk",
  },
  {
    id: 18,
    name: "Sharda Sinha",
    occupation: "Folk Singer",
    dob: "1 October 1952",
    district: "Samastipur",
    img: "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/11/India-Today_Sharda-Sinha-YIM6937-1-1-scaled.jpg?size=*:900",
    description: "Voice of Bihar’s folk heritage, especially during Chhath.",
    bestWork: "Maine Pyar Kiya (singer)",
    imdb: "https://www.imdb.com/name/nm0788686/?ref_=ext_shr_lnk",
  },
  {
    id: 19,
    name: "Maithili Thakur",
    occupation: "Folk/Classic Singer",
    dob: "25 July 2000",
    district: "Madhubani",
    img: "https://c.saavncdn.com/artists/Maithili_Thakur_002_20230227072619_500x500.jpg",
    description: "Young prodigy promoting Indian classical and folk music.",
    bestWork: "Primarily Music Albums",
    imdb: "https://www.imdb.com/name/nm9859083/?ref_=ext_shr_lnk",
  },
  {
    id: 20,
    name: "Chandan Tiwari",
    occupation: "Folk Singer",
    dob: "15 August 1985",
    district: "Patna",
    img: "https://chandantiwari.in/wp-content/uploads/2024/11/PHOTO-2024-03-27-16-07-40-1.jpg",
    description: "Folk singer reviving Bhojpuri and regional traditions.",
    bestWork: "Live Performances & Albums",
    imdb: "https://www.imdb.com/name/nm13792834/?ref_=ext_shr_lnk",
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

  const scrollRef = useRef(null);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#190108] py-10">
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl playwrite-mx-guides-regular mb-10 pt-10 pb-8 text-center">
        Celebrities of Bihar
      </h2>

      <div className="relative mx-auto max-w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-r from-[#190108] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-l from-[#190108] to-transparent z-10" />

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-4 no-scrollbar px-4 sm:px-6 md:px-8"
        >
          {people.map((person) => (
            <motion.div
              key={person.id}
              className="w-[220px] sm:w-[240px] md:w-[280px] lg:w-[300px] xl:w-[320px] h-80 sm:h-96 flex-shrink-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-full perspective group">
                <div className="card-animated-border w-full h-full">
                  <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d group-hover:rotate-y-180">
                    <div className="absolute w-full h-full backface-hidden bg-white/40 backdrop-blur-3xl text-white rounded-2xl overflow-hidden">
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-black/70 to-transparent z-10" />
                      <div className="absolute bottom-3 left-3 z-20 text-xs sm:text-sm">
                        <h3 className="font-semibold">{person.name}</h3>
                        <p>{person.occupation}</p>
                      </div>
                    </div>

                    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#0a1020] text-white rounded-2xl p-2 sm:p-4 flex flex-col justify-start items-center text-left text-xs sm:text-sm">
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[96px] sm:w-[132px] h-[96px] sm:h-[132px] rounded-full bg-white/90 flex items-center justify-center shadow-md">
                        <img
                          src={person.img}
                          alt={person.name}
                          className="w-[88px] sm:w-32 h-[88px] sm:h-32 rounded-full object-cover"
                        />
                      </div>
                      <div className="mt-28 sm:mt-40 w-full px-1 sm:px-2">
                        <p className="mb-1 italic">{person.occupation}</p>
                        <p className="mb-1">Date of Birth: {person.dob}</p>
                        <p className="mb-1">District: {person.district}</p>
                        <p className="mb-1">{person.description}</p>
                        <p className="font-semibold mb-1">
                          Best Film: {person.bestWork}
                        </p>
                        <a
                          href={person.imdb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                            alt="IMDb"
                            className="w-12 sm:w-16 h-auto mt-2 sm:mt-4"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={() => scrollRef.current.scrollBy({ left: -340, behavior: "smooth" })}
            className="p-2 sm:p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600"
          >
            <IoIosArrowBack size={24} />
          </button>
        </div>

        <div className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={() => scrollRef.current.scrollBy({ left: 340, behavior: "smooth" })}
            className="p-2 sm:p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600"
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselOfCelebs;
