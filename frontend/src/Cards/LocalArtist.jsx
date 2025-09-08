import React, { useState } from "react";
import { FiSearch, FiUser, FiArrowLeft } from "react-icons/fi";

const artists = [
    // Actors
    {
        name: "Ravi Kumar",
        type: "Actors",
        description: "Award-winning actor known for his versatility in drama and comedy.",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Anjali Patel",
        type: "Actors",
        description: "Talented actress with a flair for emotional roles.",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        name: "Vikram Sinha",
        type: "Actors",
        description: "Stage and film actor, acclaimed for his powerful performances.",
        image: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    // Dancers
    {
        name: "Priya Sharma",
        type: "Dancers",
        description: "Classical and contemporary dancer with 10+ years of stage experience.",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Rahul Dev",
        type: "Dancers",
        description: "Energetic hip-hop and folk dancer, winner of multiple contests.",
        image: "https://randomuser.me/api/portraits/men/51.jpg"
    },
    {
        name: "Meera Joshi",
        type: "Dancers",
        description: "Specializes in Kathak and Bollywood dance styles.",
        image: "https://randomuser.me/api/portraits/women/52.jpg"
    },
    // Stunt Performers
    {
        name: "Amit Singh",
        type: "Stunt Performers",
        description: "Professional stunt performer, skilled in action choreography.",
        image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
        name: "Sanjay Rana",
        type: "Stunt Performers",
        description: "Expert in high falls and fight sequences for film.",
        image: "https://randomuser.me/api/portraits/men/53.jpg"
    },
    {
        name: "Deepak Kumar",
        type: "Stunt Performers",
        description: "Motorcycle and car stunt specialist.",
        image: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    // Makeup Artists
    {
        name: "Neha Verma",
        type: "Makeup Artists",
        description: "Creative makeup artist for film, TV, and fashion.",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        name: "Meena Joshi",
        type: "Makeup Artists",
        description: "Specializes in prosthetic and bridal makeup.",
        image: "https://randomuser.me/api/portraits/women/72.jpg"
    },
    {
        name: "Ritu Singh",
        type: "Makeup Artists",
        description: "Award-winning artist for special effects makeup.",
        image: "https://randomuser.me/api/portraits/women/73.jpg"
    },
    // Street Performers
    {
        name: "Suresh Das",
        type: "Street Performers",
        description: "Popular street magician and entertainer.",
        image: "https://randomuser.me/api/portraits/men/77.jpg"
    },
    {
        name: "Pooja Mishra",
        type: "Street Performers",
        description: "Acrobat and juggler, performs at festivals and fairs.",
        image: "https://randomuser.me/api/portraits/women/78.jpg"
    },
    {
        name: "Ramesh Lal",
        type: "Street Performers",
        description: "Traditional folk singer and puppeteer.",
        image: "https://randomuser.me/api/portraits/men/79.jpg"
    },
];

const categories = [
    "All",
    "Actors",
    "Dancers",
    "Stunt Performers",
    "Makeup Artists",
    "Street Performers"
];

const LocalArtist = () => {
    const [selectedType, setSelectedType] = useState("All");
    const [search, setSearch] = useState("");
    const [focusedArtist, setFocusedArtist] = useState(null);

    const filtered = artists.filter(
        (a) =>
            (selectedType === "All" || a.type === selectedType) &&
            a.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full max-w-7xl mx-auto min-h-[38rem] max-h-[38rem] bg-gray-900 text-white flex rounded-xl overflow-hidden">
            
            {/* Sidebar */}
            <div className={`${focusedArtist ? 'hidden md:block md:w-80' : 'w-full md:w-80'} bg-gray-800 flex flex-col`}>
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-purple-300 mb-3">Local Artists</h2>
                    
                    {/* Search */}
                    <div className="relative mb-3">
                        <FiSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search artists..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    setSelectedType(type);
                                    setFocusedArtist(null);
                                }}
                                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                    selectedType === type
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Artists List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <p className="text-xs text-gray-400 mb-3">
                        {filtered.length} artists
                    </p>
                    
                    {filtered.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            <FiUser className="text-2xl mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No artists found</p>
                        </div>
                    ) : (
                        filtered.map((artist, i) => (
                            <div
                                key={i}
                                onClick={() => setFocusedArtist(artist)}
                                className="cursor-pointer bg-gray-700/50 hover:bg-gray-700 rounded-lg p-3 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-200 group"
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={artist.image}
                                        alt={artist.name}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm text-white group-hover:text-purple-200 truncate">
                                            {artist.name}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {artist.type}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {!focusedArtist ? (
                    // Grid view for larger screens
                    <div className="hidden md:block flex-1 p-6">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Available Artists</h3>
                            <p className="text-gray-400">Click on any artist to view their profile</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full overflow-y-auto pr-2">
                            {filtered.length === 0 ? (
                                <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                                    <FiUser className="text-5xl mb-4 opacity-30" />
                                    <p className="text-xl">No artists found</p>
                                </div>
                            ) : (
                                filtered.map((artist, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setFocusedArtist(artist)}
                                        className="cursor-pointer bg-gray-800/60 hover:bg-gray-700/60 rounded-2xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 group h-fit"
                                    >
                                        <div className="text-center">
                                            <img
                                                src={artist.image}
                                                alt={artist.name}
                                                className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                                            />
                                            <h4 className="font-semibold text-white group-hover:text-purple-200 transition-colors mb-1 truncate">
                                                {artist.name}
                                            </h4>
                                            <p className="text-xs text-purple-400 mb-2">{artist.type}</p>
                                            <p className="text-xs text-gray-400 line-clamp-2">{artist.description}</p>
                                            <div className="mt-3 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                                Click to view profile
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    // Artist detail view
                    <div className="flex-1 flex flex-col p-4 md:p-6">
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => setFocusedArtist(null)}
                                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-medium"
                            >
                                <FiArrowLeft />
                                <span>Back to Artists</span>
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center max-w-md">
                                <img
                                    src={focusedArtist.image}
                                    alt={focusedArtist.name}
                                    className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-purple-500/30"
                                />
                                <h3 className="text-3xl font-bold text-white mb-2">{focusedArtist.name}</h3>
                                <div className="inline-block px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium mb-4">
                                    {focusedArtist.type}
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                    {focusedArtist.description}
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                                        Contact Artist
                                    </button>
                                    <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                                        View Portfolio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Styles */}
            <style jsx global>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default LocalArtist;
