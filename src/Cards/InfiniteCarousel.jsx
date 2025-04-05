import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Sample Data with Image URLs
const categories = {
  "Film Locations": [
    { id: 1, title: "Ghora Katora", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 2, title: "Film Location 2", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 3, title: "Film Location 3", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 4, title: "Film Location 4", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 5, title: "Film Location 5", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 6, title: "Film Location 6", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 7, title: "Film Location 7", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 8, title: "Film Location 8", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 9, title: "Film Location 9", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
  ],
  "Religious Places": [
    { id: 1, title: "Kundalpur", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/kundalpur/jainism_nalanda_a_kundalpur_pic_02.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 2, title: "Temple 2", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 3, title: "Temple 3", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 4, title: "Temple 4", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 5, title: "Temple 5", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 6, title: "Temple 6", img: "https://source.unsplash.com/400x300/?holy,place" },
    { id: 7, title: "Temple 7", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
    { id: 8, title: "Temple 8", img: "https://source.unsplash.com/400x300/?buddhist,temple" },
    { id: 9, title: "Temple 9", img: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/nalanda/ghora_katora/ghora-katora.jpg/jcr:content/renditions/cq5dam.web.1280.765.jpeg" },
  ],
  "Wildlife": [
    { id: 1, title: "Wildlife Spot 1", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
    { id: 2, title: "Wildlife Spot 2", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
    { id: 3, title: "Wildlife Spot 3", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
    { id: 4, title: "Wildlife Spot 4", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
    { id: 5, title: "Wildlife Spot 5", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
    { id: 6, title: "Wildlife Spot 6", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
    { id: 7, title: "Wildlife Spot 7", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
    { id: 8, title: "Wildlife Spot 8", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
    { id: 9, title: "Wildlife Spot 9", img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg" },
  ],
  "Historical Monuments": [
    { id: 1, title: "Monument 1", img: "https://source.unsplash.com/400x300/?monument" },
    { id: 2, title: "Monument 2", img: "https://source.unsplash.com/400x300/?historical" },
    { id: 3, title: "Monument 3", img: "https://source.unsplash.com/400x300/?heritage" },
    { id: 4, title: "Monument 4", img: "https://source.unsplash.com/400x300/?ancient" },
    { id: 5, title: "Monument 5", img: "https://source.unsplash.com/400x300/?castle" },
    { id: 6, title: "Monument 6", img: "https://source.unsplash.com/400x300/?old,building" },
    { id: 7, title: "Monument 7", img: "https://source.unsplash.com/400x300/?architecture" },
    { id: 8, title: "Monument 8", img: "https://source.unsplash.com/400x300/?historical,place" },
    { id: 9, title: "Monument 9", img: "https://source.unsplash.com/400x300/?palace" },
  ],
};

const FilterableCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState("Film Locations");
  const [index, setIndex] = useState(0);

  const cards = categories[selectedCategory];
  const totalCards = cards.length;
  const itemsPerPage = 3;

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + itemsPerPage >= totalCards ? 0 : prevIndex + itemsPerPage));
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - itemsPerPage < 0 ? totalCards - itemsPerPage : prevIndex - itemsPerPage));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#190108] py-6">
      
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg text-lg ${
              selectedCategory === category
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setIndex(0);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards Carousel */}
      <div className="overflow-hidden mt-4 w-[70%] relative">
        <div className="flex gap-6 transition-transform duration-500 ease-in-out">
          {cards.slice(index, index + itemsPerPage).map((card) => (
            <div
              key={card.id}
              className="w-72 h-80 border-2 border-white text-lg font-bold rounded-lg flex flex-col justify-end relative overflow-hidden transition-transform duration-500 hover:scale-105 bg-transparent"
            >
              {/* Image */}
              <img src={card.img} alt={card.title} className="absolute top-0 left-0 w-full h-full object-cover" />

              {/* Location Name */}
              <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-3xl bg-opacity-70 text-white text-center py-3">
                {card.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex mt-6 gap-4">
        <button onClick={prevSlide} className="p-3 bg-[#190108] text-white rounded-full hover:bg-gray-600">
          <IoIosArrowBack size={30} />
        </button>
        <button onClick={nextSlide} className="p-3 bg-[#190108] text-white rounded-full hover:bg-gray-600">
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </div>
  );
};

export default FilterableCarousel;