import React, { useState } from "react";
import { FiSearch, FiShield, FiArrowLeft, FiPhone } from "react-icons/fi";

const categories = [
  "All",
  "Police",
  "Private Guards", 
  "Fire Safety",
  "Medical",
  "Crowd Control"
];

const providers = [
  {
    name: "City Police Station",
    type: "Police",
    description: "Official police support for film sets and events.",
    contact: "100",
    image: "https://img.icons8.com/color/96/police-badge.png"
  },
  {
    name: "SafeGuard Pvt Ltd",
    type: "Private Guards",
    description: "Trained private guards for on-set security.",
    contact: "+91 9876543210",
    image: "https://img.icons8.com/color/96/security-checked.png"
  },
  {
    name: "Fire Response Team",
    type: "Fire Safety",
    description: "Fire safety officers and equipment for shoots.",
    contact: "+91 9123456780",
    image: "https://img.icons8.com/color/96/fireman-hat.png"
  },
  {
    name: "Metro Medical Services",
    type: "Medical",
    description: "On-site medical assistance and emergency care.",
    contact: "+91 9234567801",
    image: "https://img.icons8.com/color/96/medical-bag.png"
  },
  {
    name: "Elite Security Guards",
    type: "Private Guards",
    description: "Professional security personnel for VIP protection.",
    contact: "+91 9345678012",
    image: "https://img.icons8.com/color/96/security-guard.png"
  },
  {
    name: "CrowdControl Pro",
    type: "Crowd Control",
    description: "Expert crowd management for large events and shoots.",
    contact: "+91 9456789023",
    image: "https://img.icons8.com/color/96/crowd-control.png"
  },
  {
    name: "Emergency Medical Unit",
    type: "Medical",
    description: "24/7 medical support with ambulance services.",
    contact: "+91 9567890134",
    image: "https://img.icons8.com/color/96/ambulance.png"
  },
  {
    name: "Fire Prevention Corp",
    type: "Fire Safety",
    description: "Fire prevention specialists and safety equipment.",
    contact: "+91 9678901245",
    image: "https://img.icons8.com/color/96/fire-extinguisher.png"
  }
];

const Security = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [search, setSearch] = useState("");
  const [focusedProvider, setFocusedProvider] = useState(null);

  const filtered = providers.filter(
    (p) =>
      (selectedType === "All" || p.type === selectedType) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[38rem] max-h-[38rem] bg-gray-900 text-white flex rounded-xl overflow-hidden">
      
      {/* Sidebar */}
      <div className={`${focusedProvider ? 'hidden md:block md:w-80' : 'w-full md:w-80'} bg-gray-800 flex flex-col`}>
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-purple-300 mb-3">Security Services</h2>
          
          {/* Search */}
          <div className="relative mb-3">
            <FiSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search providers..."
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
                  setFocusedProvider(null);
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

        {/* Providers List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-xs text-gray-400 mb-3">
            {filtered.length} providers
          </p>
          
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <FiShield className="text-2xl mx-auto mb-2 opacity-50" />
              <p className="text-sm">No providers found</p>
            </div>
          ) : (
            filtered.map((provider, i) => (
              <div
                key={i}
                onClick={() => setFocusedProvider(provider)}
                className="cursor-pointer bg-gray-700/50 hover:bg-gray-700 rounded-lg p-3 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-10 h-10 rounded object-contain flex-shrink-0 bg-white/10 p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-white group-hover:text-purple-200 truncate">
                      {provider.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {provider.type}
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
        {!focusedProvider ? (
          // Grid view for larger screens
          <div className="hidden md:block flex-1 p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Available Services</h3>
              <p className="text-gray-400">Click on any provider to view their details</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full overflow-y-auto pr-2">
              {filtered.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                  <FiShield className="text-5xl mb-4 opacity-30" />
                  <p className="text-xl">No providers found</p>
                </div>
              ) : (
                filtered.map((provider, i) => (
                  <div
                    key={i}
                    onClick={() => setFocusedProvider(provider)}
                    className="cursor-pointer bg-gray-800/60 hover:bg-gray-700/60 rounded-2xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 group h-fit"
                  >
                    <div className="text-center">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-16 h-16 rounded-lg object-contain mx-auto mb-3 bg-white/10 p-2"
                      />
                      <h4 className="font-semibold text-white group-hover:text-purple-200 transition-colors mb-1 truncate">
                        {provider.name}
                      </h4>
                      <p className="text-xs text-purple-400 mb-2">{provider.type}</p>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-2">{provider.description}</p>
                      <div className="text-xs text-green-400 flex items-center justify-center">
                        <FiPhone className="mr-1" />
                        {provider.contact}
                      </div>
                      <div className="mt-3 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                        Click for details
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          // Provider detail view
          <div className="flex-1 flex flex-col p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setFocusedProvider(null)}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-medium"
              >
                <FiArrowLeft />
                <span>Back to Services</span>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <img
                  src={focusedProvider.image}
                  alt={focusedProvider.name}
                  className="w-32 h-32 rounded-2xl object-contain mx-auto mb-6 bg-white/10 p-4"
                />
                <h3 className="text-3xl font-bold text-white mb-2">{focusedProvider.name}</h3>
                <div className="inline-block px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium mb-4">
                  {focusedProvider.type}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {focusedProvider.description}
                </p>
                <div className="bg-gray-800/60 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-400 mb-2">Contact Information</p>
                  <div className="flex items-center justify-center space-x-2 text-green-400 font-medium">
                    <FiPhone />
                    <span>{focusedProvider.contact}</span>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <FiPhone />
                    <span>Call Now</span>
                  </button>
                  <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                    Request Quote
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

export default Security;
