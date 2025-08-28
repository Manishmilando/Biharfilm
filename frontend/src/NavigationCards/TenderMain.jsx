import React, { useState, useEffect } from "react";
import { FileText, FilePlus, FolderOpen, X, RefreshCw, Edit, Trash2 } from "lucide-react";
import AddTender from "./AddTender";
import axios from "axios";

const TenderMain = () => {
  const [tenders, setTenders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch Tenders
  const fetchTenders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://biharfilmbackend-production.up.railway.app/api/tender/tenders"
      );
      setTenders(data.tenders || []);
    } catch (error) {
      console.error("Failed to fetch tenders:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  // Delete Tender API Call
  const deleteTender = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tender?")) return;
    try {
      await axios.delete(
        `https://biharfilmbackend-production.up.railway.app/api/tender/tenders/${id}`
      );
      fetchTenders();
    } catch (error) {
      console.error("Failed to delete tender:", error);
    }
  };

  // Edit Tender (Open Form with Data)
  const editTender = (tender) => {
    console.log("Edit Tender:", tender);
    // Here you can open a modal with pre-filled data
    setShowForm(true);
  };

  // Dynamic Counts
  const totalTenders = tenders.length;
  const newTenders = tenders.filter((t) => {
    const today = new Date().toISOString().split("T")[0];
    return t.date === today;
  }).length;
  const manualTenders = tenders.filter((t) => t.addedBy === "admin").length;

  const cards = [
    {
      title: "Total Tenders",
      count: totalTenders,
      subtitle: "All-time tenders",
      icon: <FolderOpen className="w-5 h-5" />,
      color: "#802d44",
    },
    {
      title: "New Tenders",
      count: newTenders,
      subtitle: "Today’s new tenders",
      icon: <FileText className="w-5 h-5" />,
      color: "#802d44",
    },
    {
      title: "Add Tender",
      count: manualTenders,
      subtitle: "Added manually today",
      icon: <FilePlus className="w-5 h-5" />,
      color: "#802d44",
      onClick: () => setShowForm(true),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="bg-white border border-gray-200/60 rounded-xl p-6 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div>
              <div
                className="flex items-center gap-2 mb-1"
                style={{ color: card.color }}
              >
                {card.icon}
                <h3 className="text-sm font-semibold">{card.title}</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{card.count}</p>
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            </div>
            <div
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ backgroundColor: `${card.color}20`, color: card.color }}
            >
              +{card.count}
            </div>
          </div>
        ))}
      </div>

      {/* Tenders Table */}
      <div className="bg-white border border-gray-200/60 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tenders List</h2>
          <button
            onClick={fetchTenders}
            className="flex items-center gap-2 text-gray-400 px-2 py-2 rounded-full transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
          </button>
        </div>

        <table className="w-full border rounded-2xl text-left text-sm">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-200 text-gray-600">
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Date</th>
              <th className="p-3">PDF</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="p-3 font-medium text-gray-800">Tender - {item.title}</td>
                <td className="p-3 text-gray-600">{item.description}</td>
                <td className="p-3 text-gray-600">{item.date}</td>
                <td className="p-3">
                  {item.pdf ? (
                    <a href={item.pdf} target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
  <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
</svg>

                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3 text-center">
  <div className="flex justify-center items-center gap-4 text-gray-600">
    {/* Edit Button */}
    <button
      onClick={() => editTender(item)}
      className="hover:text-blue-500 transition-transform hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
      </svg>
    </button>

    {/* Delete Button */}
    <button
      onClick={() => deleteTender(item.id)}
      className="hover:text-red-500 transition-transform hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>

        {tenders.length === 0 && <p className="text-center text-gray-500 mt-4">No tenders found.</p>}
      </div>

      {/* Add Tender Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 pt-16">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-5 right-5 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <AddTender onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default TenderMain;
