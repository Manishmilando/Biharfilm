import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, XCircle, FileText, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UniversalFormModal from "./UniversalFormModal"; // Import the modal

const FilmmakerOverview = ({ nocList: propNocList = [] }) => {
  const [nocList, setNocList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  // Fetch NOCs from API
  useEffect(() => {
    const fetchNOCs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          setError("Authentication token not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://biharfilmbackend-production.up.railway.app/api/noc/my-forms",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('✅ NOCs fetched:', response.data);

        if (response.data.success && response.data.data) {
          setNocList(response.data.data);
        } else {
          setNocList([]);
        }
      } catch (err) {
        console.error("❌ Error fetching NOCs:", err);
        
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 403) {
          setError("You don't have permission to view this data.");
        } else if (err.response?.status === 404) {
          setNocList([]);
        } else {
          setError(
            err.response?.data?.message || 
            "Failed to fetch NOC forms. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNOCs();
  }, [navigate]);

  // Calculate statistics - Only show Approved, Rejected, Total
  const total = nocList.length;
  const approved = nocList.filter((noc) => noc.status === "approved").length;
  const rejected = nocList.filter((noc) => noc.status === "rejected").length;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border border-red-200";
      case "under_review":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "submitted":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "forwarded":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  // Get status display name
  const getStatusDisplayName = (status) => {
    switch (status) {
      case "under_review":
        return "Under Review";
      case "submitted":
        return "Submitted";
      default:
        return status?.charAt(0).toUpperCase() + status?.slice(1);
    }
  };

  const handleRowClick = (noc) => {
    setSelectedForm(noc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#a92b43] mb-4"></div>
        <p className="text-gray-600 font-medium">Loading your NOC forms...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome back, Filmmaker! 
        </h2>
        <p className="text-gray-600 mt-1">
          Manage & Track NOC applications
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <XCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-red-800">Error</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

    {/* Stats Cards - Simplified */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Total Applied */}
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-gray-600 text-sm font-medium">Total</p>
        <h3 className="text-3xl font-bold text-gray-900">{total}</h3>
      </div>
      <FileText className="text-[#a92b43]" size={32} />
    </div>
  </div>

  {/* Approved */}
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-gray-600 text-sm font-medium">Approved</p>
        <h3 className="text-3xl font-bold text-green-600">{approved}</h3>
      </div>
      <CheckCircle2 className="text-green-600" size={32} />
    </div>
  </div>

  {/* Rejected */}
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-gray-600 text-sm font-medium">Rejected</p>
        <h3 className="text-3xl font-bold text-red-600">{rejected}</h3>
      </div>
      <XCircle className="text-red-600" size={32} />
    </div>
  </div>
</div>

      {/* Table Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xl font-bold text-gray-900">Your Applications</p>
        </div>

        {nocList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="text-gray-400" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Applications Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't submitted any NOC (No Objection Certificate) forms yet. 
              Start by filling out a form to begin the shooting permission process.
            </p>
            <button
              onClick={() => navigate("/dashboard-user")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#a92b43] text-white font-semibold rounded-lg hover:bg-[#891737] transition-colors shadow-md hover:shadow-lg"
            >
              <FileText size={18} />
              Go to Apply NOC
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Project Title</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Start Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {nocList.map((noc, index) => (
                    <tr
                      key={noc.id || index}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{noc.title || "N/A"}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {noc.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700 font-medium">
                          {noc.typeOfProject || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {noc.location || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {formatDate(noc.startDateTime)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold ${getStatusColor(noc.status)}`}>
                          {getStatusDisplayName(noc.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleRowClick(noc)}
                          className="inline-flex items-center gap-2 px-3 py-2 b  rounded-lg  text-sm"
                        >
                          <Eye color="#a92b43" size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Universal Form Modal */}
      {selectedForm && (
        <UniversalFormModal
          isOpen={showModal}
          onClose={closeModal}
          selectedRow={selectedForm}
          userRole="filmmaker"
          showActions={false} // Don't show approve/reject for filmmaker view
        />
      )}
    </div>
  );
};

export default FilmmakerOverview;
