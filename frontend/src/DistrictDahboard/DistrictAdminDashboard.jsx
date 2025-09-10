import { useEffect, useState } from "react";
import axios from "axios";

function DistrictAdminDashboard() {
  const [forwardedForms, setForwardedForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionRemarks, setActionRemarks] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserAndForms = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError("Please login to view data.");
          window.location.href = '/district-login';
          return;
        }

        // First get current user info to extract districtId
        const userResponse = await axios.get(
          "https://biharfilmbackend-production.up.railway.app/api/auth/profile",
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );

        const user = userResponse.data.user;
        setCurrentUser(user);

        // Extract districtId from user (assuming user object has districtId or assignedDistricts)
        const districtId = user.districtId || user.assignedDistricts?.[0]?.districtId;
        
        if (!districtId) {
          setError("No district assigned to your account.");
          return;
        }

        // Now fetch forms for the specific district
        const formsResponse = await axios.get(
          `https://biharfilmbackend-production.up.railway.app/api/noc/district/${districtId}/forms`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );

        setForwardedForms(formsResponse.data.data || []);
        setError(null);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem('authToken');
          window.location.href = '/district-login';
        } else if (err.response?.status === 403) {
          setError("Access denied. District admin role required.");
        } else {
          setError("Failed to load forwarded forms.");
        }
        console.error("Failed to fetch forwarded forms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndForms();
  }, []);

  const handleFormAction = async (formId, action) => {
    if (!actionRemarks.trim()) {
      alert("Please provide remarks for this action.");
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      const response = await axios.put(
        `https://biharfilmbackend-production.up.railway.app/api/noc/districtAction/${formId}`,
        {
          action: action,
          remarks: actionRemarks
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert(`Form ${action}d successfully!`);
        setShowActionModal(false);
        setActionRemarks('');
        setSelectedForm(null);
        // Refresh the list
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error ${action}ing form:`, error);
      alert(`Failed to ${action} form.`);
    }
  };

  const openActionModal = (form, action) => {
    setSelectedForm(form);
    setActionType(action);
    setShowActionModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

  const closeActionModal = () => {
    setShowActionModal(false);
    setActionRemarks('');
    setActionType('');
    setSelectedForm(null);
  };

  if (loading) return <div className="text-center p-4">Loading forwarded forms...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">District Admin Dashboard</h1>
        {currentUser && (
          <div className="text-sm text-gray-600">
            Welcome, {currentUser.name} | District: {currentUser.districtName || 'N/A'}
          </div>
        )}
      </div>
      
      {forwardedForms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No forwarded forms found for your district.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Production House
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Forwarded Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forwardedForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    NOC-{form.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {form.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {form.producerHouse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {form.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {form.forwardedAt ? new Date(form.forwardedAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      form.status === 'forwarded' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : form.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setSelectedForm(form);
                        setShowModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                    >
                      View Details
                    </button>
                    {form.status === 'forwarded' && (
                      <>
                        <button
                          onClick={() => openActionModal(form, 'approve')}
                          className="text-green-600 hover:text-green-900 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openActionModal(form, 'reject')}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Details Modal */}
      {showModal && selectedForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Form Details - NOC-{selectedForm.id}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div><strong>Title:</strong> {selectedForm.title}</div>
                <div><strong>Production House:</strong> {selectedForm.producerHouse}</div>
                <div><strong>Location:</strong> {selectedForm.location}</div>
                <div><strong>Genre:</strong> {selectedForm.genre}</div>
                <div><strong>Duration:</strong> {selectedForm.duration}</div>
                <div><strong>Synopsis:</strong> {selectedForm.synopsis}</div>
                <div><strong>Status:</strong> {selectedForm.status}</div>
                {selectedForm.adminRemarks && (
                  <div><strong>Admin Remarks:</strong> {selectedForm.adminRemarks}</div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal (Approve/Reject) */}
      {showActionModal && selectedForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {actionType.charAt(0).toUpperCase() + actionType.slice(1)} Form - NOC-{selectedForm.id}
                </h3>
                <button
                  onClick={closeActionModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks (Required):
                </label>
                <textarea
                  value={actionRemarks}
                  onChange={(e) => setActionRemarks(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder={`Please provide reason for ${actionType}...`}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeActionModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleFormAction(selectedForm.id, actionType)}
                  className={`px-4 py-2 rounded-md text-white ${
                    actionType === 'approve' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DistrictAdminDashboard;
