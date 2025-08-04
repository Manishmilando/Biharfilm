import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, UserPlus,PlusCircle  } from "lucide-react"
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Film,
  Info,
  ExternalLink,
  X
} from "lucide-react";
import AddArtistForm from "./AddArtistForm";

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchArtists = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/artist/getAllArtists");
      setArtists(res.data.data);
    } catch (err) {
      console.error("Failed to fetch artists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Count new artists added today
  const today = new Date().toISOString().split("T")[0];
  const newArtistsCount = artists.filter(
    (artist) => artist.createdAt.split("T")[0] === today
  ).length;

  return (
    <div className="p-6">
      {/* Summary Cards */}
    

<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
  {/* New Artists Today */}
  <div className="bg-white border border-gray-200/60  rounded-xl p-6 flex items-center justify-between hover:shadow-2xl transition-shadow duration-300">
    <div>
      <div className="flex items-center gap-2 text-green-600 mb-1">
        <UserPlus className="w-5 h-5" />
        <h3 className="text-sm font-semibold">New Artists Today</h3>
      </div>
      <p className="text-3xl font-bold text-gray-800">{newArtistsCount}</p>
      <p className="text-xs text-gray-500 mt-1">Based on today’s registrations</p>
    </div>
    <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
      +{newArtistsCount}
    </div>
  </div>

  {/* Total Registered Artists */}
  <div className="bg-white border border-gray-200/60 rounded-xl p-6 flex items-center justify-between hover:shadow-2xl transition-shadow duration-300">
    <div>
      <div className="flex items-center gap-2 text-indigo-600 mb-1">
        <Users className="w-5 h-5" />
        <h3 className="text-sm font-semibold">Total Registered Artists</h3>
      </div>
      <p className="text-3xl font-bold text-gray-800">{artists.length}</p>
      <p className="text-xs text-gray-500 mt-1">Cumulative across all time</p>
    </div>
    <div className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
      Total
    </div>
  </div>

    <div className="bg-white border border-gray-200/60 rounded-xl p-6 flex items-center justify-between hover:shadow-2xl transition-shadow duration-300">
  {/* Left Info Block */}
  <div>
    <div className="flex items-center gap-2 text-[#a92b43] mb-1">
      <Users className="w-5 h-5" />
      <h3 className="text-sm font-semibold">Add New Artist</h3>
    </div>
    <p className="text-xs text-gray-500 mt-1 max-w-xs">
      Register a new artist to the platform with full profile, description, and media.
    </p>
  </div>

  {/* Right Button */}
  <button
    onClick={() => setShowAddModal(true)}
    className="flex items-center gap-2 bg-pink-100 hover:bg-[#e890a0] text-[#a92b43] font-semibold px-4 py-2 rounded-lg transition-all duration-200"
  >
    <PlusCircle className="w-5 h-5 whitespace-nowrap" />
    <span className="whitespace-nowrap">Add Artist</span>
  </button>
</div>
</div>


<div>
    
</div>


      {/* Table */}
      {loading ? (
        <p className="text-gray-600">Loading artist data...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200/60">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left text-xs ">Sr No.</th>
                <th className="p-3 text-left text-xs ">Image</th>
                <th className="p-3 text-left text-xs ">Name</th>
                <th className="p-3 text-left text-xs ">Role</th>
                <th className="p-3 text-left text-xs ">Email</th>
                <th className="p-3 text-left text-xs ">District</th>
                <th className="p-3 text-left text-xs ">DOB</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, idx) => (
                <tr
                  key={artist.id}
                  className=" hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedArtist(artist)}
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    <img
                      src={artist.image}
                      alt={artist.fullName}
                      className="w-10 h-10 rounded-full object-cover shadow-2xl"
                    />
                  </td>
                  <td className="p-3">{artist.fullName}</td>
                  <td className="p-3">{artist.role}</td>
                  <td className="p-3">{artist.email}</td>
                  <td className="p-3">{artist.district}</td>
                  <td className="p-3">
                    {new Date(artist.dob).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

      

      {/* Modal Dialog */}
      {selectedArtist && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          
   <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-xl border border-gray-200">
  {/* Close Button */}
  <button
    className="absolute top-3 right-4 text-gray-500 hover:text-red-500 transition-colors"
    onClick={() => setSelectedArtist(null)}
  >
    <X className="w-5 h-5" />
  </button>

  {/* Artist Content */}
  <div className="flex flex-col sm:flex-row gap-6">
    {/* Image */}
    <img
      src={selectedArtist.image}
      alt={selectedArtist.fullName}
      className="w-32 h-32 object-cover rounded-xl border border-gray-300 shadow-md"
    />

    {/* Details */}
    <div className="flex-1 space-y-2">
      <h2 className="text-2xl font-bold text-gray-800">
        {selectedArtist.fullName}
      </h2>
      <p className="text-sm font-medium text-indigo-600">{selectedArtist.role}</p>

      <div className="text-sm space-y-1 text-gray-700">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          {selectedArtist.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          {selectedArtist.phoneNumber}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          {new Date(selectedArtist.dob).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          {selectedArtist.district}
        </div>
        {selectedArtist.bestFilm && (
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-gray-500" />
            <span>{selectedArtist.bestFilm}</span>
          </div>
        )}
        {selectedArtist.description && (
          <div className="flex items-start gap-2 mt-2">
            <Info className="w-4 h-4 mt-0.5 text-gray-500" />
            <p className="text-sm text-gray-600">{selectedArtist.description}</p>
          </div>
        )}
        {selectedArtist.imdbLink && (
          <div className="flex items-center gap-2 mt-1">
            <ExternalLink className="w-4 h-4 text-blue-600" />
            <a
              href={selectedArtist.imdbLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              IMDb / External Link
            </a>
          </div>
        )}
      </div>
    </div>
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
