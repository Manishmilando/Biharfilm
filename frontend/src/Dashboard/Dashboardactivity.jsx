import { useEffect, useState } from "react";
import axios from "axios";
import { FaShareAlt, FaTimesCircle, FaTimes } from "react-icons/fa";
import { RefreshCw } from "lucide-react";
import DownloadDashboard from "./DownloadDashboard";
import { FaExternalLinkAlt } from "react-icons/fa";
import UniversalFormModal from './UniversalFormModal'; // Import the universal modal

function Dashboardactivity() {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Get token from localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError("🔐 Please login to view data.");
          setLoading(false);
          // Redirect to login
          window.location.href = '/login';
          return;
        }

        const response = await axios.get(
          "https://biharfilmbackend-production.up.railway.app/api/noc/getAllNocForms", // ✅ Updated endpoint
          {
            headers: {
              'Authorization': `Bearer ${token}` // ✅ Add Authorization header
            },
            withCredentials: true,
          }
        );

        setCases(response.data.data || []);
        setError(null);
      } catch (err) {
        // ✅ Better error handling
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

  // Handle forward action from the universal modal
  const handleForward = (formData) => {
    console.log('Opening forward modal for:', formData);
    setShowForwardModal(true);
    // Keep the universal modal open while showing forward modal
  };

  // Handle reject action from the universal modal
  const handleReject = async (formData) => {
    const remarks = prompt("Please provide remarks for rejection:");
    if (!remarks) {
      alert("Remarks are required for rejection.");
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `https://biharfilmbackend-production.up.railway.app/api/noc/reject/${formData.id}`,
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
        // Refresh the data
        window.location.reload();
      } else {
        alert("Failed to reject form.");
      }
    } catch (error) {
      console.error("Error rejecting form:", error);
      alert("Error rejecting form. Please try again.");
    }
  };

  // Handle download/view action from the universal modal
  const handleView = (formData) => {
    console.log('Viewing/downloading form:', formData);
    // You can implement download logic here or open in new tab
  };

  // Handle successful forwarding
  const onForwardSuccess = () => {
    // Refresh the data after successful forwarding
    window.location.reload();
  };

  return (
    <>
      {/* Reload Button */}
      <button
        onClick={() => window.location.reload()}
        className="mb-4 px-2 py-2 bg-[#800000] text-white rounded-full hover:bg-[#600000] transition"
      >
        <RefreshCw size={15} />
      </button>

      <div className="relative">
        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl bg-white border border-gray-200 min-h-96">
          {error ? (
            <div className="text-red-600 p-4 rounded-lg my-4">{error}</div>
          ) : loading ? (
            <div className="py-10 px-10">
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
              </div>
            </div>
          ) : (
            <table className="min-w-full table-auto rounded-2xl">
              <thead>
                <tr className="bg-gray-200 text-xs text-gray-600">
                  <th className="px-4 py-2 text-left">Sr. No</th>
                  <th className="px-4 py-2 text-left">Type of Project</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Genre</th>
                  <th className="px-4 py-2 text-left">Representative</th>
                  <th className="px-4 py-2 text-left">Email Id</th>
                  <th className="px-4 py-2 text-left">Start Date</th>
                  <th className="px-4 py-2 text-left">End Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseDetail, index) => (
                  <tr
                    key={caseDetail._id}
                    className="border-t text-xs border-gray-200 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(caseDetail)}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{caseDetail.typeOfProject}</td>
                    <td className="px-4 py-2">{caseDetail.duration}</td>
                    <td className="px-4 py-2">{caseDetail.title}</td>
                    <td className="px-4 py-2">{caseDetail.genre}</td>
                    <td className="px-4 py-2">{caseDetail.representativeName}</td>
                    <td className="px-4 py-2">{caseDetail.emailOfProductionHouse}</td>
                    <td className="px-4 py-2">
                      {caseDetail.startDateTime
                        ? new Date(caseDetail.startDateTime).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {caseDetail.endDateTime
                        ? new Date(caseDetail.endDateTime).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 capitalize">{caseDetail.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Universal Form Modal */}
        <UniversalFormModal
          isOpen={showModal}
          onClose={closeModal}
          selectedRow={selectedRow}
          userRole="admin" // Set this based on the actual user role
          onForward={handleForward}
          onReject={handleReject}
          onView={handleView}
          showActions={true}
        />

        {/* Forward Modal (existing code) */}
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
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors duration-200 ${
                          selectedDepartments.includes(dept)
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
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          selectedDepartments.includes(dept)
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
                      "Purnia", "Ara", "Chapra", "Hajipur", "Katihar", "Munger",
                      "Sasaram", "Samastipur", "Motihari", "Siwan", "Dehri", "Bettiah",
                      "Jamalpur", "Jehanabad", "Buxar", "Sitamarhi", "Saharsa", "Araria",
                      "Kishanganj", "Madhepura", "Sheikhpura", "Lakhisarai"
                    ].map((district) => (
                      <label
                        key={district}
                        className={`flex items-center gap-2 p-2 rounded border text-xs cursor-pointer transition-colors duration-200 ${
                          selectedDistricts.includes(district)
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
                        <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                          selectedDistricts.includes(district)
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
                    // Validation
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
                      // Prepare payload according to backend API expectations
                      const districtsPayload = selectedDistricts.map(districtName => ({
                        id: districtName, // Using district name as ID since backend expects id field
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

                      console.log("Selected row:", selectedRow);
                      console.log("ID:", selectedRow.id);

                      const response = await axios.put(
                        `https://biharfilmbackend-production.up.railway.app/api/noc/forward/${selectedRow.id}`,
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
                        
                        // Reset state
                        setSelectedDepartments([]);
                        setSelectedDistricts([]);
                        setAdminEmail('');
                        setAdminRemarks('');
                        setShowForwardModal(false);
                        setShowModal(false);
                        
                        // Refresh data
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
    </>
  );
}

export default Dashboardactivity;
