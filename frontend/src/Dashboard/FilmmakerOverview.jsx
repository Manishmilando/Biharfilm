import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, XCircle, FileText, Eye, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UniversalFormModal from "./UniversalFormModal";

const FilmmakerOverview = ({ nocList: propNocList = [] }) => {
  const [nocList, setNocList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

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

  // Filter logic
  const filteredNocList = nocList.filter((noc) => {
    const matchesSearch =
      noc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      noc.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      noc.typeOfProject?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || noc.status === statusFilter;
    const matchesType = typeFilter === "all" || noc.typeOfProject === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate statistics
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

  // Get unique project types for filter
  const projectTypes = [...new Set(nocList.map(noc => noc.typeOfProject).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-lg">

        <div className="flex flex-row gap-2">
          <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
          </div>
        </div>

        <p className="text-gray-600 font-medium pt-10">Loading your NOC forms...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-white">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-600">
          Welcome back, Filmmaker!
        </h2>
        <p className="text-gray-400 text-xs mt-1">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Applied */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Total Applications</p>
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <FileText className="text-gray-600" size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">{total}</h3>
        </div>

        {/* Approved */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-green-100 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Approved</p>
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-green-600">{approved}</h3>
        </div>

        {/* Rejected */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-red-100 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Rejected</p>
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <XCircle className="text-red-600" size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-red-600">{rejected}</h3>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-lg font-bold text-gray-600">Your Applications</p>
        </div>

        {/* Search and Filters */}
        {nocList.length > 0 && (
          <div className="mb-6 flex flex-col md:flex-row gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by title, location, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-100 bg-white text-sm text-gray-700 font-medium focus:outline-none focus:border-gray-300 transition-colors cursor-pointer min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="forwarded">Forwarded</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-100 bg-white text-sm text-gray-700 font-medium focus:outline-none focus:border-gray-300 transition-colors cursor-pointer min-w-[140px]"
              >
                <option value="all">All Types</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        )}

        {filteredNocList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="text-gray-400" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {nocList.length === 0 ? "No Applications Yet" : "No Results Found"}
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-xs">
              {nocList.length === 0
                ? "You haven't submitted any NOC (No Objection Certificate) forms yet. Start by filling out a form to begin the shooting permission process."
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project Title</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredNocList.map((noc, index) => (
                    <tr
                      key={noc.id || index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-medium text-gray-900">{noc.title || "N/A"}</p>
                        <p className="text-xs text-gray-500 mt-0.5">ID: {noc.id}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-gray-600">
                          {noc.typeOfProject || "N/A"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-gray-600">
                          {noc.location || "N/A"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-gray-600">
                          {formatDate(noc.startDateTime)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(noc.status)}`}>
                          {getStatusDisplayName(noc.status)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button
                          onClick={() => handleRowClick(noc)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="text-gray-500" size={16} />
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
          showActions={false}
        />
      )}
    </div>
  );
};

export default FilmmakerOverview;