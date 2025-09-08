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
      const res = await axios.get("https://biharfilmbackend-production.up.railway.app/api/artist/getAllArtists");
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
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl border border-gray-200">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        onClick={() => setSelectedArtist(null)}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={selectedArtist.image}
          alt={selectedArtist.fullName}
          className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-md -mt-10"
        />
      </div>

      {/* Content */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{selectedArtist.fullName}</h2>
        <p className="text-sm text-indigo-600 font-medium mt-1">{selectedArtist.role}</p>

        {selectedArtist.imdbLink && (
          <div className="mt-2">
            <a
              href={selectedArtist.imdbLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
            >
             
              <img 
              className="size-10"
              src="/imdb.png"
              />
            </a>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{selectedArtist.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{selectedArtist.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{new Date(selectedArtist.dob).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{selectedArtist.district}</span>
        </div>
        {selectedArtist.bestFilm && (
          <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
            <Film className="w-4 h-4 text-gray-500" />
            <span>{selectedArtist.bestFilm}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {selectedArtist.description && (
        <div className="mt-4 flex text-center border border-gray-200/60 px-5 py-5 rounded-xl items-start gap-2 text-gray-600 text-sm">
          <p>{selectedArtist.description}</p>
        </div>
      )}
    </div>
  </div>
)}

        {/* Add Artist Modal */}
        {showAddModal && <AddArtistForm onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default Artist;
