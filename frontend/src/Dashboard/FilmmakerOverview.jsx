// src/Dashboard/FilmmakerOverview.jsx
import React, { useEffect, useState } from "react";
import { FaFolderOpen, FaCheckCircle, FaTimesCircle, FaPlusCircle } from "react-icons/fa";

const FilmmakerOverview = ({ nocList: propNocList }) => {
  const [nocList, setNocList] = useState([]);

  // Load dummy data if no NOCs exist
  useEffect(() => {
    if (propNocList && propNocList.length > 0) {
      setNocList(propNocList);
    } else {
      setNocList([
        {
          typeOfProject: "Feature Film",
          duration: "3 Months",
          title: "The Journey of Bihar",
          genre: "Drama",
          representative: "Ravi Kumar",
          email: "ravi@example.com",
          startDate: "2025-09-15",
          endDate: "2025-12-15",
          status: "Accepted",
        },
        {
          typeOfProject: "Documentary",
          duration: "1 Month",
          title: "Culture of Mithila",
          genre: "Documentary",
          representative: "Anjali Singh",
          email: "anjali@example.com",
          startDate: "2025-10-01",
          endDate: "2025-10-30",
          status: "Pending",
        },
        {
          typeOfProject: "Short Film",
          duration: "15 Days",
          title: "Life in Patna",
          genre: "Drama",
          representative: "Saurabh Das",
          email: "saurabh@example.com",
          startDate: "2025-11-05",
          endDate: "2025-11-20",
          status: "Rejected",
        },
      ]);
    }
  }, [propNocList]);

  const total = nocList.length;
  const accepted = nocList.filter((noc) => noc.status === "Accepted").length;
  const rejected = nocList.filter((noc) => noc.status === "Rejected").length;
  const pending = nocList.filter((noc) => noc.status === "Pending").length;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hi Filmmaker </h2>

      {/* Stats Cards - Updated to match screenshot style */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        {/* Total Applied */}
        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center justify-between mb-2">
            <FaFolderOpen className="text-[#a92b43] text-2xl" />
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
              +{total}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{total}</h3>
          <p className="text-sm text-gray-500">Total Applied</p>
          <p className="text-xs text-gray-400 mt-1">All-time NOCs</p>
        </div>

        {/* Accepted */}
        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center justify-between mb-2">
            <FaCheckCircle className="text-green-600 text-2xl" />
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              +{accepted}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{accepted}</h3>
          <p className="text-sm text-gray-500">Accepted</p>
          <p className="text-xs text-gray-400 mt-1">Approved NOCs</p>
        </div>

        {/* Pending */}
        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100">
              <span className="text-yellow-600 text-sm font-bold">!</span>
            </div>
            <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">
              +{pending}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{pending}</h3>
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-xs text-gray-400 mt-1">Under Review</p>
        </div>

        {/* Rejected */}
        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center justify-between mb-2">
            <FaTimesCircle className="text-red-600 text-2xl" />
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
              +{rejected}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{rejected}</h3>
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-xs text-gray-400 mt-1">Declined NOCs</p>
        </div>
      </div>

      {/* Table Section */}
      <p className="text-gray-700 text-lg mb-4"> Your Applied NOCs</p>
      {nocList.length === 0 ? (
        <p className="text-sm text-gray-500">No NOCs submitted yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 text-sm font-semibold">Sr. No</th>
                <th className="px-4 py-2 text-sm font-semibold">Type</th>
                <th className="px-4 py-2 text-sm font-semibold">Duration</th>
                <th className="px-4 py-2 text-sm font-semibold">Title</th>
                <th className="px-4 py-2 text-sm font-semibold">Genre</th>
                <th className="px-4 py-2 text-sm font-semibold">Representative</th>
                <th className="px-4 py-2 text-sm font-semibold">Email</th>
                <th className="px-4 py-2 text-sm font-semibold">Start Date</th>
                <th className="px-4 py-2 text-sm font-semibold">End Date</th>
                <th className="px-4 py-2 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {nocList.map((noc, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm">{noc.typeOfProject}</td>
                  <td className="px-4 py-2 text-sm">{noc.duration}</td>
                  <td className="px-4 py-2 text-sm">{noc.title}</td>
                  <td className="px-4 py-2 text-sm">{noc.genre}</td>
                  <td className="px-4 py-2 text-sm">{noc.representative}</td>
                  <td className="px-4 py-2 text-sm">{noc.email}</td>
                  <td className="px-4 py-2 text-sm">{noc.startDate}</td>
                  <td className="px-4 py-2 text-sm">{noc.endDate}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        noc.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : noc.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {noc.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FilmmakerOverview;