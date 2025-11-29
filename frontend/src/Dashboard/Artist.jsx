import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, UserPlus, PlusCircle, Mail, Phone, Calendar, MapPin, Film, X, AlertCircle } from "lucide-react";
import AddArtistForm from "./AddArtistForm";

const Artist = ({ searchQuery }) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchArtists = async () => {
    try {
      const res = await axios.get("https://biharfilmbackend-production.up.railway.app/api/artist/getAllArtists");
      setArtists(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch artists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Filter artists based on search query
  const filteredArtists = artists.filter((artist) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      artist.fullName?.toLowerCase().includes(query) ||
      artist.role?.toLowerCase().includes(query) ||
      artist.district?.toLowerCase().includes(query) ||
      artist.email?.toLowerCase().includes(query)
    );
  });

  // Count new artists added today
  const today = new Date().toISOString().split("T")[0];
  const newArtistsCount = artists.filter(
    (artist) => artist.createdAt && artist.createdAt.split("T")[0] === today
  ).length;

  const cards = [
    {
      title: "Total Artists",
      count: artists.length,
      subtitle: "Registered artists",
      icon: <Users className="w-5 h-5" />,
      color: "text-[#a92b4e]",
      bgColor: "bg-[#a92b4e]/10",
      borderColor: "border-[#a92b4e]/20"
    },
    {
      title: "New Artists",
      count: newArtistsCount,
      subtitle: "Registered today",
      icon: <UserPlus className="w-5 h-5" />,
      color: "text-[#a92b4e]",
      bgColor: "bg-[#a92b4e]/10",
      borderColor: "border-[#a92b4e]/20"
    },
    {
      title: "Add Artist",
      count: "New",
      subtitle: "Register new artist",
      icon: <PlusCircle className="w-5 h-5" />,
      color: "text-white",
      bgColor: "bg-[#a92b4e]",
      borderColor: "border-[#a92b4e]",
      isAction: true,
      onClick: () => setShowAddModal(true),
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className={`rounded-xl p-6 flex items-center justify-between transition-all duration-300 ${card.isAction
              ? "bg-[#a92b4e] text-white shadow-lg shadow-[#a92b4e]/30 hover:-translate-y-1 cursor-pointer"
              : "bg-white border border-gray-200 hover:shadow-md"
              }`}
          >
            <div>
              <div
                className={`flex items-center gap-2 mb-2 ${!card.isAction ? "text-[#a92b4e]" : "text-white/90"}`}
              >
                {card.icon}
                <h3 className="text-sm font-semibold">{card.title}</h3>
              </div>
              <p className={`text-3xl font-bold ${!card.isAction ? "text-gray-800" : "text-white"}`}>{card.count}</p>
              <p className={`text-xs mt-1 ${!card.isAction ? "text-gray-500" : "text-white/80"}`}>{card.subtitle}</p>
            </div>
            {!card.isAction && (
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${card.bgColor} ${card.color}`}
              >
                {card.icon}
              </div>
            )}
            {card.isAction && (
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <PlusCircle className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Artists Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Artists Directory</h2>
          <span className="text-xs font-medium px-2.5 py-1 bg-[#a92b4e]/10 text-[#a92b4e] rounded-full">
            {filteredArtists.length} Total
          </span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading artist data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold w-16">#</th>
                  <th className="px-6 py-4 font-semibold">Artist</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredArtists.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">No artists found</p>
                        <p className="text-gray-400 text-xs mt-1">Try adjusting your search or add a new artist</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredArtists.map((artist, idx) => (
                    <tr
                      key={artist.id || idx}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                      onClick={() => setSelectedArtist(artist)}
                    >
                      <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={artist.image || "https://via.placeholder.com/40"}
                            alt={artist.fullName}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{artist.fullName}</p>
                            <p className="text-xs text-gray-500">{artist.gender || 'Artist'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {artist.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col text-xs">
                          <span>{artist.email}</span>
                          <span className="text-gray-400">{artist.phoneNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{artist.district}</td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {artist.createdAt ? new Date(artist.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Artist Details Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-[#a92b4e] to-[#891737] relative">
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition"
                onClick={() => setSelectedArtist(null)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              <div className="relative flex justify-between items-end -mt-12 mb-6">
                <img
                  src={selectedArtist.image}
                  alt={selectedArtist.fullName}
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg bg-white"
                />
                {selectedArtist.imdbLink && (
                  <a
                    href={selectedArtist.imdbLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mb-2"
                  >
                    <img
                      className="h-8 opacity-80 hover:opacity-100 transition-opacity"
                      src="/imdb.png"
                      alt="IMDb"
                    />
                  </a>
                )}
              </div>

              <div className="text-center sm:text-left mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedArtist.fullName}</h2>
                <p className="text-[#a92b4e] font-medium">{selectedArtist.role}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedArtist.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedArtist.phoneNumber}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>DOB: {new Date(selectedArtist.dob).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedArtist.district}</span>
                  </div>
                </div>
              </div>

              {selectedArtist.bestFilm && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-900 font-medium mb-1">
                    <Film className="w-4 h-4 text-[#a92b4e]" />
                    Best Film
                  </div>
                  <p className="text-gray-600 pl-6">{selectedArtist.bestFilm}</p>
                </div>
              )}

              {selectedArtist.description && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedArtist.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Artist Modal */}
      {showAddModal && <AddArtistForm onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default Artist;
