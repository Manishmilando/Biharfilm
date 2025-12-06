import { useEffect, useState } from "react";
import axios from "axios";
import { FaShareAlt, FaTimesCircle, FaTimes } from "react-icons/fa";
import { RefreshCw, Clock, CheckCircle, XCircle, Send, AlertCircle, Filter, X, Calendar } from "lucide-react";
import UniversalFormModal from './UniversalFormModal';

function Dashboardactivity({ searchQuery }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const [adminEmail, setAdminEmail] = useState('');
  const [adminRemarks, setAdminRemarks] = useState('');
  const [isForwarding, setIsForwarding] = useState(false);

  // Filter states
  const [isFilteredCases, setIsFilteredCases] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter cases based on search query and filters
  const filteredCases = cases.filter((item) => {
    // Search Query
    let matchesSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch = (
        item.title?.toLowerCase().includes(query) ||
        item.typeOfProject?.toLowerCase().includes(query) ||
        item.representativeName?.toLowerCase().includes(query) ||
        item.genre?.toLowerCase().includes(query)
      );
    }

    // Status Filter
    let matchesStatus = true;
    if (statusFilter !== "all") {
      const status = item.status?.toLowerCase();
      const forwardStatus = item.forwardStatus?.toLowerCase();

      switch (statusFilter) {
        case "submitted":
          matchesStatus = status === "submitted";
          break;
        case "forwarded":
          matchesStatus = status === "forwarded";
          break;
        case "pending":
          matchesStatus = status === "submitted" || status === "forwarded";
          break;
        case "approved":
          matchesStatus = status === "approved" || forwardStatus === "approved";
          break;
        case "rejected":
          matchesStatus = status === "rejected" || forwardStatus === "rejected";
          break;
        default:
          matchesStatus = true;
      }
    }

    // Date Filter
    let matchesDate = true;
    if (item.startDateTime) {
      const caseDate = new Date(item.startDateTime);
      if (dateFromFilter) {
        const fromDate = new Date(dateFromFilter);
        if (caseDate < fromDate) matchesDate = false;
      }
      if (dateToFilter) {
        const toDate = new Date(dateToFilter);
        toDate.setHours(23, 59, 59, 999);
        if (caseDate > toDate) matchesDate = false;
      }
    } else if (dateFromFilter || dateToFilter) {
      matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Helper function to truncate text
  const truncateText = (text, maxLength = 20) => {
    if (!text) return 'N/A';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Get status info with colors and icons
  const getStatusInfo = (status, forwardStatus) => {
    if (status === 'forwarded') {
      switch (forwardStatus) {
        case 'approved':
          return {
            label: 'Approved',
            color: 'bg-green-50 text-green-700 border-green-200',
            icon: <CheckCircle className="h-3 w-3" />,
            dotColor: 'bg-green-500'
          };
        case 'rejected':
          return {
            label: 'Rejected',
            color: 'bg-red-50 text-red-700 border-red-200',
            icon: <XCircle className="h-3 w-3" />,
            dotColor: 'bg-red-500'
          };
        case 'pending':
          return {
            label: 'Pending Review',
            color: 'bg-amber-50 text-amber-700 border-amber-200',
            icon: <Clock className="h-3 w-3" />,
            dotColor: 'bg-amber-500'
          };
        default:
          return {
            label: 'Forwarded',
            color: 'bg-blue-50 text-blue-700 border-blue-200',
            icon: <Send className="h-3 w-3" />,
            dotColor: 'bg-blue-500'
          };
      }
    } else if (status === 'submitted') {
      return {
        label: 'New',
        color: 'bg-purple-50 text-purple-700 border-purple-200',
        icon: <AlertCircle className="h-3 w-3" />,
        dotColor: 'bg-purple-500'
      };
    } else if (status === 'approved') {
      return {
        label: 'Approved',
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: <CheckCircle className="h-3 w-3" />,
        dotColor: 'bg-green-500'
      };
    } else if (status === 'rejected') {
      return {
        label: 'Rejected',
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: <XCircle className="h-3 w-3" />,
        dotColor: 'bg-red-500'
      };
    }

    return {
      label: status || 'Unknown',
      color: 'bg-gray-50 text-gray-700 border-gray-200',
      icon: <AlertCircle className="h-3 w-3" />,
      dotColor: 'bg-gray-500'
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        if (!token) {
          setError("🔐 Please login to view data.");
          setLoading(false);
          window.location.href = '/login';
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/noc/getAllNocForms",
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );

        setCases(response.data.data || []);
        setError(null);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("🔐 Session expired. Please login again.");
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        } else if (err.response?.status === 403) {
          setError("🚫 Access denied. You don't have permission to view this data.");
        } else {
          setError("🛜 Failed to load data. Please ensure the server is running.");
        }
        console.error("Failed to fetch NOC forms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (caseDetail) => {
    setSelectedRow(caseDetail);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  const handleForward = (formData) => {
    console.log('Opening forward modal for:', formData);
    setShowForwardModal(true);
  };

  const handleReject = async (formData) => {
    const remarks = prompt("Please provide remarks for rejection:");
    if (!remarks) {
      alert("Remarks are required for rejection.");
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `http://localhost:3000/api/noc/reject/${formData.id}`,
        { remarks },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Form rejected successfully!");
        setShowModal(false);
        setSelectedRow(null);
        window.location.reload();
      } else {
        alert("Failed to reject form.");
      }
    } catch (error) {
      console.error("Error rejecting form:", error);
      alert("Error rejecting form. Please try again.");
    }
  };

  const handleView = (formData) => {
    console.log('Viewing/downloading form:', formData);
  };

  const onForwardSuccess = () => {
    window.location.reload();
  };





  const clearFilters = () => {
    setStatusFilter("all");
    setDateFromFilter("");
    setDateToFilter("");
  };

  const activeFiltersCount =
    (statusFilter !== "all" ? 1 : 0) +
    (dateFromFilter ? 1 : 0) +
    (dateToFilter ? 1 : 0);


  return (
    <div className="space-y-4">
      {/* Header with Reload Button */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">NOC Applications</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {filteredCases.length} {filteredCases.length === 1 ? 'application' : 'applications'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors relative"
            >
              <Filter size={16} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#891737] text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#891737]/90 rounded-lg transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Filter Applications</h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#891737] hover:text-[#891737]/80 font-medium flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="submitted">New Application</option>
                  <option value="forwarded">Forwarded</option>
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Date From Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Start Date From
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dateFromFilter}
                    onChange={(e) => setDateFromFilter(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                  />
                </div>
              </div>

              {/* Date To Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Start Date To
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dateToFilter}
                    onChange={(e) => setDateToFilter(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Legend */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Application Status Guide</h3>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-600">New Application</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Forwarded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Pending Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Rejected</span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {error ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Error Loading Data</h3>
              <p className="text-xs text-red-600">{error}</p>
            </div>
          ) : loading ? (
            <div className="p-6">
              <div className="space-y-3 animate-pulse">
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      #
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Project Type
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Title
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Genre
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Representative
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Duration
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Start Date
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCases.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-5 py-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <AlertCircle className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500">No applications found</p>
                        {activeFiltersCount > 0 && (
                          <button
                            onClick={clearFilters}
                            className="mt-2 text-xs text-[#891737] hover:text-[#891737]/80 font-medium"
                          >
                            Clear filters to see all applications
                          </button>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredCases.map((caseDetail, index) => {
                      const statusInfo = getStatusInfo(
                        caseDetail.status,
                        caseDetail.forwardStatus || caseDetail.districtStatus
                      );

                      return (
                        <tr
                          key={caseDetail._id}
                          className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                          onClick={() => handleRowClick(caseDetail)}
                        >
                          <td className="px-5 py-3.5 text-xs font-medium text-gray-900 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-5 py-3.5 text-xs text-gray-600 whitespace-nowrap">
                            {truncateText(caseDetail.typeOfProject, 15)}
                          </td>
                          <td className="px-5 py-3.5 text-xs text-gray-900">
                            <div className="max-w-[200px]" title={caseDetail.title}>
                              <span className="font-medium">
                                {truncateText(caseDetail.title, 25)}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-xs text-gray-600 whitespace-nowrap">
                            {truncateText(caseDetail.genre, 12)}
                          </td>
                          <td className="px-5 py-3.5 text-xs text-gray-600">
                            <div className="max-w-[150px]" title={caseDetail.representativeName}>
                              {truncateText(caseDetail.representativeName, 18)}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-xs text-gray-600 whitespace-nowrap">
                            {caseDetail.duration || 'N/A'}
                          </td>
                          <td className="px-5 py-3.5 text-xs text-gray-600 whitespace-nowrap">
                            {caseDetail.startDateTime
                              ? new Date(caseDetail.startDateTime).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })
                              : "N/A"}
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                              {statusInfo.icon}
                              {statusInfo.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Universal Form Modal */}
      <UniversalFormModal
        isOpen={showModal}
        onClose={closeModal}
        selectedRow={selectedRow}
        userRole="admin"
        onForward={handleForward}
        onReject={handleReject}
        onView={handleView}
        showActions={true}
      />

      {/* Forward Modal */}
      {showForwardModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[85vh] overflow-hidden border border-gray-200 relative">
            {/* Minimal Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Forward NOC Application</h2>
                  <p className="text-sm text-gray-500">Select departments and districts</p>
                </div>
                <button
                  onClick={() => setShowForwardModal(false)}
                  className="w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            {/* Admin Details Section */}
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#891737] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Remarks (Optional)</label>
                  <input
                    type="text"
                    value={adminRemarks}
                    onChange={(e) => setAdminRemarks(e.target.value)}
                    placeholder="Add any remarks..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#891737] focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Compact Content - Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[calc(85vh-200px)] overflow-y-auto">
              {/* Left Side - Departments */}
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3 border-l-3 border-[#891737] pl-2">
                  Departments
                </h3>

                <div className="space-y-2">
                  {["DOP", "DTO", "SDPO", "DM", "SP"].map((dept) => (
                    <label
                      key={dept}
                      className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors duration-200 ${selectedDepartments.includes(dept)
                        ? 'bg-[#891737]/5 border-[#891737] text-gray-900'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedDepartments.includes(dept)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDepartments(prev => [...prev, dept]);
                          } else {
                            setSelectedDepartments(prev => prev.filter(d => d !== dept));
                          }
                        }}
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedDepartments.includes(dept)
                        ? 'bg-[#891737] border-[#891737]'
                        : 'border-gray-300'
                        }`}>
                        {selectedDepartments.includes(dept) && (
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800">{dept}</span>
                        <p className="text-xs text-gray-500">
                          {dept === "DOP" && "District Officer of Police"}
                          {dept === "DTO" && "District Transport Officer"}
                          {dept === "SDPO" && "Sub-Divisional Police Officer"}
                          {dept === "DM" && "District Magistrate"}
                          {dept === "SP" && "Superintendent of Police"}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Right Side - Districts */}
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3 border-l-3 border-[#891737] pl-2">
                  Districts
                </h3>

                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {[
                    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Begusarai",
                    "Purnia", "Ara", "Saran", "Hajipur", "Katihar", "Munger",
                    "Sasaram", "Samastipur", "Motihari", "Siwan", "Dehri", "Bettiah",
                    "Jamalpur", "Jehanabad", "Buxar", "Sitamarhi", "Saharsa", "Araria",
                    "Kishanganj", "Madhepura", "Sheikhpura", "Lakhisarai"
                  ].map((district) => (
                    <label
                      key={district}
                      className={`flex items-center gap-2 p-2 rounded border text-xs cursor-pointer transition-colors duration-200 ${selectedDistricts.includes(district)
                        ? 'bg-[#891737]/5 border-[#891737] text-gray-900'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedDistricts.includes(district)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDistricts(prev => [...prev, district]);
                          } else {
                            setSelectedDistricts(prev => prev.filter(d => d !== district));
                          }
                        }}
                      />
                      <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${selectedDistricts.includes(district)
                        ? 'bg-[#891737] border-[#891737]'
                        : 'border-gray-300'
                        }`}>
                        {selectedDistricts.includes(district) && (
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        )}
                      </div>
                      <span className="font-medium">{district}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Summary */}
            {(selectedDistricts.length > 0 || selectedDepartments.length > 0) && (
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>
                    <strong>{selectedDepartments.length}</strong> departments,
                    <strong> {selectedDistricts.length}</strong> districts
                  </span>
                  <span className="text-[#891737] font-medium">
                    {selectedDepartments.length * selectedDistricts.length} total forwards
                  </span>
                </div>
              </div>
            )}

            {/* Fixed Footer with Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3">
              <button
                onClick={() => setShowForwardModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!selectedRow) {
                    alert("No form selected.");
                    return;
                  }

                  if (selectedDistricts.length === 0 || selectedDepartments.length === 0) {
                    alert("Please select at least one district and one department.");
                    return;
                  }

                  if (!adminEmail || !adminEmail.includes('@')) {
                    alert("Please enter a valid admin email.");
                    return;
                  }

                  setIsForwarding(true);

                  try {
                    const districtsPayload = selectedDistricts.map(districtName => ({
                      id: districtName,
                      name: districtName
                    }));

                    const token = localStorage.getItem('authToken');

                    if (!token) {
                      setError("🔐 Please login to view data.");
                      setLoading(false);
                      window.location.href = '/login';
                      return;
                    }

                    const departmentsPayload = selectedDepartments;

                    const response = await axios.put(
                      `http://localhost:3000/api/noc/forward/${selectedRow.id}`,
                      {
                        districts: districtsPayload,
                        departments: departmentsPayload,
                        adminEmail: adminEmail,
                        adminRemarks: adminRemarks || null
                      },
                      {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        },
                        withCredentials: true,
                        timeout: 10000
                      }
                    );

                    if (response.data.success) {
                      alert("Form forwarded successfully!");

                      setSelectedDepartments([]);
                      setSelectedDistricts([]);
                      setAdminEmail('');
                      setAdminRemarks('');
                      setShowForwardModal(false);
                      setShowModal(false);

                      onForwardSuccess();
                    } else {
                      alert(`Failed to forward form: ${response.data.message || 'Unknown error'}`);
                    }
                  } catch (error) {
                    console.error("Forwarding failed:", error);

                    let errorMessage = "Error forwarding the form.";

                    if (error.response) {
                      errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
                    } else if (error.request) {
                      errorMessage = "Network error. Please check your connection.";
                    } else if (error.code === 'ECONNABORTED') {
                      errorMessage = "Request timeout. Please try again.";
                    }

                    alert(errorMessage);
                  } finally {
                    setIsForwarding(false);
                  }
                }}
                disabled={selectedDistricts.length === 0 || selectedDepartments.length === 0 || !adminEmail || isForwarding}
                className="px-6 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#6e1129] rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isForwarding ? (
                  <>
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                    Forwarding...
                  </>
                ) : (
                  <>
                    <FaShareAlt className="text-xs" />
                    Forward
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboardactivity;
