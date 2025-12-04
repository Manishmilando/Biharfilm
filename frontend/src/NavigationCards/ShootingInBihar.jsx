import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import ContactUs from "../NavigationCards/ContactUs";

const filmsData = [
    {
        "s_no": 1,
        "image": "/1.jpg",
        "name_of_film": "संघतिया",
        "details": {
            "production_house": "उग्रतारा फिल्मस",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 2,
        "image": "/2.jpg",
        "name_of_film": "द लांग जर्नी होम",
        "details": {
            "production_house": "अवर्त्स लिमिटेड (मॉरिशस)",
            "project": "एंटरटेनमेंट फिल्म",
            "language": "अंग्रेजी व भोजपुरी"
        }
    },
    {
        "s_no": 3,
        "image": "/3.jpg",
        "name_of_film": "बिहार का जलवा",
        "details": {
            "production_house": "प्रबुद्ध एंटरटेनमेंट",
            "project": "डॉक्यूमेंट्री फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 4,
        "image": "/4.jpg",
        "name_of_film": "सुहागिन के सेनुर",
        "details": {
            "production_house": "सिनेमा विंडो",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 5,
        "image": "/5.jpg",
        "name_of_film": "लाइफ लीला",
        "details": {
            "production_house": "ऐम एपेक्स इंटरनेशनल",
            "project": "वेब सीरिज",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 6,
        "image": "/6.jpg",
        "name_of_film": "जिनगी बितावनी तोहरे प्यार में",
        "details": {
            "production_house": "पूरब टॉकिज",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 7,
        "image": "/7.jpg",
        "name_of_film": "घर का बंटवारा",
        "details": {
            "production_house": "विश्वमूर्ति फिल्म्स प्रोडक्शन",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 8,
        "image": "/8.jpg",
        "name_of_film": "नारी",
        "details": {
            "production_house": "विश्वमूर्ति फिल्म्स Production",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 9,
        "image": "/9.jpg",
        "name_of_film": "रजनी की बारात",
        "details": {
            "production_house": "इपिफेनी इंटरटेनमेंट",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 10,
        "image": "/10.jpg",
        "name_of_film": "ओह माय डॉग",
        "details": {
            "production_house": "जार पिक्चर्स",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 11,
        "image": "/11.jpg",
        "name_of_film": "तिया",
        "details": {
            "production_house": "स्ट्राइक फिल्म्स प्रा. लि.",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 12,
        "image": "/12.jpg",
        "name_of_film": "सुगनी",
        "details": {
            "production_house": "जॉनसन सूरज फिल्म्स इंटरनेशनल",
            "project": "फीचर फिल्म",
            "language": "मगही"
        }
    },
    {
        "s_no": 13,
        "image": "/13.jpg",
        "name_of_film": "छठ",
        "details": {
            "production_house": "चंपारण टॉकीज प्रा. लि.",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 14,
        "image": "/14.jpg",
        "name_of_film": "पेन-ब्रश",
        "details": {
            "production_house": "दैवार्या मीडिया एण्ड एंटरटेनमेंट प्रा. लि.",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 15,
        "image": "/15.jpg",
        "name_of_film": "बिहान",
        "details": {
            "production_house": "इनसाइट इंडिया",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 16,
        "image": "/16.jpg",
        "name_of_film": "अनमोल घड़ी",
        "details": {
            "production_house": "समाखी एंटरटेनमेंट प्रा. लि.",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 17,
        "image": "/17.jpg",
        "name_of_film": "वृहस्पति व्रत कथा",
        "details": {
            "production_house": "अभ्या आराध्या फिल्म्स",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 18,
        "image": "/18.jpg",
        "name_of_film": "बेटी बनल बिजेता",
        "details": {
            "production_house": "फर्स्ट टेक क्रिएशन",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 19,
        "image": "/19.jpg",
        "name_of_film": "बिहारी भौजी",
        "details": {
            "production_house": "श्रीमान मिश्रा फिल्म प्रोडक्शन",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 20,
        "image": "/20.jpg",
        "name_of_film": "अखंड भेदम",
        "details": {
            "production_house": "आर.एस.वाय. फिल्म्स प्रा. लि.",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 21,
        "image": "/21.jpg",
        "name_of_film": "अंबे है मेरी मां",
        "details": {
            "production_house": "याशी फिल्मस प्रा. लि.",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 22,
        "image": "/22.jpg",
        "name_of_film": "बंटवारा",
        "details": {
            "production_house": "श्री गणेशाय नम: एंटरटेनमेंट",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 23,
        "image": "/23.jpg",
        "name_of_film": "जय मैया शारदा भवानी",
        "details": {
            "production_house": "पिपल ट्री प्रोडक्शन हाउस",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 24,
        "image": "/24.jpg",
        "name_of_film": "जिंदगी एक प्रेम कथा",
        "details": {
            "production_house": "पराशर एंटरटेनमेंट",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    },
    {
        "s_no": 25,
        "image": "/25.jpg",
        "name_of_film": "जय मैया थावे वाली",
        "details": {
            "production_house": "प्रबुद्ध एंटरटेनमेंट",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 26,
        "image": "/26.jpg",
        "name_of_film": "मगध पुत्र",
        "details": {
            "production_house": "गुंजन सिंह एंटरटेनमेंट",
            "project": "फीचर फिल्म",
            "language": "हिन्दी, भोजपुरी"
        }
    },
    {
        "s_no": 27,
        "image": "/27.jpg",
        "name_of_film": "इको ऑफ अबसेंट",
        "details": {
            "production_house": "कैटरिना एंटरटेनमेंट एण्ड स्पोर्टस प्रा. लि.",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 28,
        "image": "/28.jpg",
        "name_of_film": "आखिरी लेसन",
        "details": {
            "production_house": "कैटरिना एंटरटेनमेंट एण्ड स्पोर्टस प्रा. लि.",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 29,
        "image": "/29.jpg",
        "name_of_film": "चंपारण सत्याग्रह",
        "details": {
            "production_house": "युवराज मीडिया एंड एंटरटेनमेंट",
            "project": "फीचर फिल्म",
            "language": "हिन्दी"
        }
    },
    {
        "s_no": 30,
        "image": "/30.jpg",
        "name_of_film": "जय पशुपति नाथ",
        "details": {
            "production_house": "युवराज मीडिया एंड एंटरटेनमेंट",
            "project": "फीचर फिल्म",
            "language": "भोजपुरी"
        }
    }
];

const ShootingInBihar = () => {
    const [mainImage, setMainImage] = useState(filmsData[0]);
    const [thumbnails, setThumbnails] = useState(filmsData.slice(1));

    const handleImageClick = (clickedImg, idx) => {
        if (!thumbnails.length) return;
        const currentMain = mainImage;
        const updatedThumbs = [...thumbnails];
        // Replace the clicked thumbnail with the current main image
        const thumbIndex = idx % thumbnails.length;
        updatedThumbs[thumbIndex] = currentMain;

        setMainImage(clickedImg);
        setThumbnails(updatedThumbs);
    };

    return (
        <div>
            <motion.div
                className="w-full min-h-screen flex flex-col items-center bg-[#190108] pt-24 px-4 sm:px-8 md:px-12 lg:px-16 pb-20"
                id="Shooting-in-bihar"
            >
                <Navbar />

                {/* Explore Section */}
                <div className="bg-[#190108] w-full pt-10 px-2 sm:px-6 lg:px-10">
                    {/* Title */}
                    <h2 className="text-white text-4xl sm:text-6xl carter-one-regular text-center mb-12">
                        Shooting in Bihar
                    </h2>

                    {mainImage && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
                            {/* Left Column: Image */}
                            <motion.div
                                key={mainImage.name_of_film}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="w-full h-[25rem] rounded-2xl border-4 border-[#a92b4e] shadow-xl overflow-hidden"
                            >
                                <img
                                    src={mainImage.image}
                                    alt={mainImage.name_of_film}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Right Column: Details */}
                            <div className="px-2 md:px-6">
                                <h3 className="text-[#a92b4e] text-3xl font-semibold mb-4">
                                    {mainImage.name_of_film}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#a92b4e] font-bold min-w-[140px]">Production House:</span>
                                        <span className="text-gray-200">{mainImage.details.production_house}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#a92b4e] font-bold min-w-[140px]">Project Type:</span>
                                        <span className="text-gray-200">{mainImage.details.project}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#a92b4e] font-bold min-w-[140px]">Language:</span>
                                        <span className="text-gray-200">{mainImage.details.language}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Thumbnails */}
                    {thumbnails.length > 0 && (
                        <div className="overflow-hidden group px-4 mt-4">
                            <div className="flex w-max space-x-4 animate-scrollImages group-hover:pause-scroll">
                                {[...thumbnails, ...thumbnails].map((item, index) => (
                                    <motion.div
                                        speed={2}
                                        duration={20}
                                        key={`${item.name_of_film}-${index}`}
                                        whileHover={{ scale: 1.05 }}
                                        className="cursor-pointer rounded-xl overflow-hidden shadow-md border border-gray-600 w-60 h-36 flex-shrink-0"
                                        onClick={() => handleImageClick(item, index)}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name_of_film}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="hidden">{item.name_of_film}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </motion.div>
            <ContactUs />
        </div>
    );
};

export default ShootingInBihar;