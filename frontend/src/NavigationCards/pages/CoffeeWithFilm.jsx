import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filmclub from "/Filmclub.mp4";
import Navbar from "../../Components/Navbar";

const sessions = [
  {
    title: "12 May 2023 (Azad Vartaman ka ek din & Dharti ke bhagwan)",
    url: "https://deshkiupasana.com/wp-content/uploads/2023/05/3-7.jpg",
  },
  {
    title: "07 October 2022 (Womeniya Rhythm of change)",
    url: "https://scontent.fccu19-1.fna.fbcdn.net/v/t39.30808-6/481675854_9334464953258667_4474150743020995038_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BjXYQztWv0cQ7kNvwG2al3h&_nc_oc=Adnkh9-lrjXCvaortlFs5zquRaETWI-7vAslH2omW4xWr9nlh6AFeeSwIEeZ2LiG-wk&_nc_zt=23&_nc_ht=scontent.fccu19-1.fna&_nc_gid=wq4g6nkiZI1sPswRzkpRTw&oh=00_AfMlxeyu1GBHqqjTyUcnx9BklLHD7wgrhDDetCS4Yb5XZg&oe=6865769E",
  },
  {
    title: "07 September 2022 (Sumi)",
    url: "https://akamaividz2.zee5.com/image/upload/w_480,h_270,c_scale,f_webp,q_auto:eco/resources/0-1-6z5213766/list/000002372ab2b04fd67b424491e7c3e40b5042d0.jpg",
  },
  {
    title: "07 July 2022 (Peepli Live)",
    url: "https://ksboxoffice.com/wp-content/uploads/2020/11/21672-1024x575.jpg",
  },
  {
    title: "07 June 2022 (Manjhi - The Mountain Man)",
    url: "https://i0.wp.com/nasheman.in/wp-content/uploads/2015/09/Manjhi-the-Mountain.jpg",
  },
  {
    title: "27 January 2017 (Road To Sangam)",
    url: "https://m.media-amazon.com/images/S/pv-target-images/b4b6762d6161f87de6a3d3f0773bf2d0b99e9ad7b1e8442d9f2d1ef6ee1289eb._SX1080_FMjpg_.jpg",
  },
  {
    title: "27 August 2016 (Nil Battey Sannata)",
    url: "https://www.mapsofindia.com/ci-moi-images/my-india/2016/04/nil-battey-sannata-image.jpg",
  },
  {
    title: "29 July 2016 (Antardwand)",
    url: "https://m.media-amazon.com/images/S/pv-target-images/3eefa43c3505b739aeb844f038a46fcb49ecd9a2753ac401f02128b9f6aa59a1.jpg",
  },
  {
    title: "24 June 2016 (Dulha)",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/60/Indian_bride-groom_%288925311033%29.jpg",
  },
  {
    title: "27 May 2016 (Handover)",
    url: "https://m.media-amazon.com/images/M/MV5BZjllN2VhNTYtM2YyYS00MzA1LTk4NTYtM2YxZmI3Nzc1OTY4XkEyXkFqcGc@._V1_.jpg",
  },
];

const CoffeeWithFilm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden pt-20">
      <Navbar />

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
        src={Filmclub}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2 bg-[#a92b43] text-white rounded-md hover:bg-[#891737] transition duration-300"
        >
          ← Back to Film Club
        </button>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-yellow-400 via-pink-400 to-red-500 bg-clip-text text-transparent drop-shadow-md">
          Coffee with Film
        </h1>

        {/* Grid of Sessions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                         transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-74">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {/* Glass Effect Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/50 backdrop-blur-md">
                  <h2 className="text-lg font-semibold text-white">
                    {item.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeeWithFilm;
