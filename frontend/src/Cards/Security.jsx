import React, { useState, useEffect } from "react";
import { FiSearch, FiShield, FiArrowLeft, FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";

const Security = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [focusedProvider, setFocusedProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vendor/securityvendors");
        const data = await response.json();
        if (data.success) {
          setProviders(data.data);
        }
      } catch (error) {
        console.error("Error fetching security providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const filtered = providers.filter(
    (p) =>
      p.vendorName && p.vendorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[38rem] max-h-[38rem] bg-gradient-to-br from-[#a92b4e] via-[#a92b4e] to-[#801f3a] text-white flex rounded-xl overflow-hidden shadow-2xl">

      {/* Sidebar */}
      <div className={`${focusedProvider ? 'hidden md:block md:w-80' : 'w-full md:w-80'} bg-black/20 backdrop-blur-sm flex flex-col border-r border-white/10`}>
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white mb-3">Security Services</h2>

          {/* Search */}
          <div className="relative mb-1">
            <FiSearch className="absolute left-3 top-3 text-white/60 text-sm" />
            <input
              type="text"
              placeholder="Search providers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30 focus:bg-white/20 transition-all"
            />
          </div>
        </div>

        {/* Providers List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <p className="text-xs text-white/60 mb-3">
            {filtered.length} providers
          </p>

          {loading ? (
            <div className="text-center text-white/60 py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-sm">Loading...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-white/60 py-8">
              <FiShield className="text-2xl mx-auto mb-2 opacity-50" />
              <p className="text-sm">No providers found</p>
            </div>
          ) : (
            filtered.map((provider, i) => (
              <div
                key={provider.id || i}
                onClick={() => setFocusedProvider(provider)}
                className={`cursor-pointer rounded-lg p-3 border transition-all duration-200 group ${focusedProvider?.id === provider.id
                  ? "bg-white/20 border-white/30"
                  : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={provider.logoUrl || "https://via.placeholder.com/150"}
                    alt={provider.vendorName}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-white/20"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-white group-hover:text-white truncate">
                      {provider.vendorName}
                    </h4>
                    <p className="text-xs text-white/60 mt-1 capitalize truncate">
                      {provider.category}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black/10 backdrop-blur-sm">
        {!focusedProvider ? (
          // Grid view for larger screens
          <div className="hidden md:block flex-1 p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Available Security Services</h3>
              <p className="text-white/60">Click on any provider to view their details</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full overflow-y-auto pr-2 custom-scrollbar pb-20">
              {loading ? (
                <div className="col-span-full flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-white/40">
                  <FiShield className="text-5xl mb-4 opacity-30" />
                  <p className="text-xl">No providers found</p>
                </div>
              ) : (
                filtered.map((provider, i) => (
                  <div
                    key={provider.id || i}
                    onClick={() => setFocusedProvider(provider)}
                    className="cursor-pointer bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 group h-fit hover:-translate-y-1 shadow-lg"
                  >
                    <div className="text-center">
                      <img
                        src={provider.logoUrl || "https://via.placeholder.com/150"}
                        alt={provider.vendorName}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white/20 group-hover:border-white/50 transition-colors"
                      />
                      <h4 className="font-semibold text-white mb-1 truncate">
                        {provider.vendorName}
                      </h4>
                      <p className="text-xs text-white/70 mb-2 capitalize bg-white/10 inline-block px-2 py-0.5 rounded-full truncate max-w-full">{provider.category}</p>
                      <p className="text-xs text-white/50 line-clamp-2">{provider.address}</p>
                      <div className="mt-3 text-xs text-white/40 group-hover:text-white/80 transition-colors">
                        Click to view details
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          // Provider detail view
          <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setFocusedProvider(null)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-medium border border-white/10"
              >
                <FiArrowLeft />
                <span>Back to Services</span>
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="text-center max-w-2xl w-full bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl">
                <img
                  src={focusedProvider.logoUrl || "https://via.placeholder.com/150"}
                  alt={focusedProvider.vendorName}
                  className="w-40 h-40 rounded-full object-cover mx-auto mb-6 border-4 border-white/20 shadow-2xl"
                />
                <h3 className="text-4xl font-bold text-white mb-2">{focusedProvider.vendorName}</h3>
                <div className="inline-block px-6 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6 border border-white/10 capitalize">
                  {focusedProvider.category}
                </div>

                <div className="text-left space-y-6 bg-black/20 p-6 rounded-xl mb-8">
                  <div className="flex items-start space-x-3">
                    <FiMapPin className="mt-1 text-white/60 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Address</h4>
                      <p className="text-gray-200 text-lg leading-relaxed">
                        {focusedProvider.address || "No address provided."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {focusedProvider.phoneNumber && (
                      <div className="flex items-center space-x-3">
                        <FiPhone className="text-white/60" />
                        <div>
                          <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Phone</h4>
                          <p className="text-white">{focusedProvider.phoneNumber}</p>
                        </div>
                      </div>
                    )}
                    {focusedProvider.email && (
                      <div className="flex items-center space-x-3">
                        <FiMail className="text-white/60" />
                        <div>
                          <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Email</h4>
                          <p className="text-white truncate max-w-[200px]">{focusedProvider.email}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {focusedProvider.website && (
                    <div className="flex items-center space-x-3">
                      <FiGlobe className="text-white/60" />
                      <div>
                        <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Website</h4>
                        <a href={focusedProvider.website} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 underline truncate max-w-full block">
                          {focusedProvider.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center space-x-4">
                  <button className="px-8 py-3 bg-white text-[#a92b4e] hover:bg-gray-100 rounded-xl font-bold transition-colors shadow-lg">
                    Contact Provider
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
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
    </div>
  );
};

export default Security;
