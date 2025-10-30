import { useEffect, useState } from "react";
import axios from "axios";
import { 
  LayoutDashboard, 
  User, 
  MapPin, 
  Badge, 
  Calendar, 
  LogOut, 
  Settings, 
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
  ChevronDown
} from 'lucide-react';

function DistrictAdminDashboard() {
  const [forwardedForms, setForwardedForms] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [formsLoading, setFormsLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [formsError, setFormsError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionRemarks, setActionRemarks] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#userDropdown') && !event.target.closest('#avatarButton')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Existing useEffect hooks remain the same...
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setProfileLoading(true);
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setProfileError("Please login to view data.");
          window.location.href = '/district-login';
          return;
        }

        const userResponse = await axios.get(
          "https://biharfilmbackend-production.up.railway.app/api/auth/profile",
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );

        if (!userResponse.data.success) {
          throw new Error('Failed to fetch user profile');
        }

        const user = userResponse.data.user;
        setCurrentUser(user);
        setProfileError(null);

      } catch (err) {
        if (err.response?.status === 401) {
          setProfileError("Session expired. Please login again.");
          localStorage.removeItem('authToken');
          window.location.href = '/district-login';
        } else {
          setProfileError("Failed to load profile.");
        }
        console.error("Failed to fetch user profile:", err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchForwardedForms = async () => {
      if (!currentUser || profileError) {
        return;
      }

      try {
        setFormsLoading(true);
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setFormsError("Authentication required.");
          return;
        }

        const districtId = currentUser.districtId;
        
        if (!districtId) {
          setFormsError("No district assigned to your account.");
          return;
        }

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
        setFormsError(null);

      } catch (err) {
        if (err.response?.status === 401) {
          setFormsError("Session expired. Please login again.");
          localStorage.removeItem('authToken');
          window.location.href = '/district-login';
        } else if (err.response?.status === 403) {
          setFormsError("Access denied. You don't have permission to view forms for this district.");
        } else {
          setFormsError("Failed to load forwarded forms. Please try refreshing the page.");
        }
        console.error("Failed to fetch forwarded forms:", err);
      } finally {
        setFormsLoading(false);
      }
    };

    fetchForwardedForms();
  }, [currentUser, profileError]);

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
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error ${action}ing form:`, error);
      alert(`Failed to ${action} form.`);
    }
  };

  const retryFetchForms = () => {
    if (currentUser) {
      setFormsError(null);
      setForwardedForms([]);
      setCurrentUser({...currentUser});
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

  if (profileLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (profileError && !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center p-4">{profileError}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white  border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Left Side - Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <img src="/Logo1.png" alt="" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Bihar State Film Development and Finance Corporation</h1>
                  <p className="text-xs text-gray-400">District Application Management Dashboard</p>
                </div>
              </div>
            </div>

            {/* Right Side - User Profile */}
           {currentUser && (
              <div className="relative flex items-center space-x-4">
                {/* District Cards */}
                <div className="flex items-center space-x-3">
                  {/* District Name Card */}
                  
                  {/* District ID Card */}
                  
                </div>

                {/* Date */}
                <div className="text-right text-xs text-gray-500">
                  <p className="font-medium">{new Date().toLocaleDateString('en-IN')}</p>
                </div>

                {/* Avatar Button with Dropdown */}
                <div className="relative">
                  <button
                    id="avatarButton"
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-expanded={showDropdown}
                  >
                    <div className="w-10 h-10 bg-[#802d44] rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div
                      id="userDropdown"
                      className="absolute right-0 top-full mt-2 w-56 bg-white divide-y divide-gray-100 rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      {/* User Info Section */}
                      <div className="px-4 py-3 text-sm text-gray-900">
                        <div className="font-medium">{currentUser.name}</div>
                        <div className="truncate text-gray-500">
                          {currentUser.role?.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {currentUser.email || 'No email provided'}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition-colors">
                            <User className="h-4 w-4 mr-3 text-gray-500" />
                            Dashboard
                          </button>
                        </li>
                        <li>
                          <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition-colors">
                            <Badge className="h-4 w-4 mr-3 text-gray-500" />
                           District ID: {currentUser.districtId}
                          </button>
                        </li>
                        <li>
                          <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition-colors">
                            <MapPin className="h-4 w-4 mr-3 text-gray-500 whitespace-nowrap" />
                            {currentUser.districtName || 'N/A'}
                          </button>
                        </li>
                      </ul>

       
                      <div className="py-1">
                        <button
                          onClick={() => {
                            localStorage.removeItem('authToken');
                            window.location.href = '/login';
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3 text-gray-500" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Page Title & Stats */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">NOC Application Management</h2>
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <span>Showing {forwardedForms.length} applications filtered by </span>
            <span className="font-medium text-gray-500 mx-1">All status</span>
            <span>, </span>
            <span className="font-medium text-gray-500 mx-1">All date</span>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left Controls */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Select Status
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <Calendar className="h-4 w-4 mr-2" />
                Select Date Range
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              </div>
              <button className="px-4 py-2 border border-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                Reset Filters
              </button>
              <button className="flex items-center px-4 py-2 bg-[#802d44] text-white rounded-lg text-sm hover:[#802d44] transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download Excel
              </button>
            </div>
          </div>
        </div>

        {/* Forms Section */}
        <div className="bg-white border border-gray-200 rounded-lg">
          {formsLoading && (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
              <p className="text-gray-500">Loading applications...</p>
            </div>
          )}

          {formsError && !formsLoading && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <div className="text-red-600 mb-4">{formsError}</div>
                <button
                  onClick={retryFetchForms}
                  className="flex items-center mx-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry Loading
                </button>
              </div>
            </div>
          )}

          {!formsLoading && !formsError && forwardedForms.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No applications found for your district.</p>
            </div>
          )}

          {!formsLoading && !formsError && forwardedForms.length > 0 && (
            <div className="overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      SR. NO
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      DATE
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      APPLICANT
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      SUBJECT
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      LOCATION
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ISSUE DATE
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      PENDING DAYS
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ATTACHMENT
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forwardedForms.map((form, index) => {
                    const forwardedDate = form.forwardedAt ? new Date(form.forwardedAt) : new Date();
                    const pendingDays = Math.floor((new Date() - forwardedDate) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {forwardedDate.toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {form.producerHouse || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate">{form.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {form.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {forwardedDate.toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            pendingDays > 30 
                              ? 'bg-red-100 text-red-800' 
                              : pendingDays > 15 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {pendingDays}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            form.status === 'forwarded' 
                              ? 'bg-blue-100 text-blue-800' 
                              : form.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {form.status === 'forwarded' && <Clock className="h-3 w-3 mr-1" />}
                            {form.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {form.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                            {form.status === 'forwarded' ? 'In Process' : form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => {
                              setSelectedForm(form);
                              setShowModal(true);
                            }}
                            className="flex items-center px-3 py-1 border border-blue-300 text-blue-600 rounded text-xs hover:bg-blue-50 transition-colors"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            PDF
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {form.status === 'forwarded' ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openActionModal(form, 'approve')}
                                className="text-green-600 hover:text-green-800 font-medium"
                              >
                                Approve
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                onClick={() => openActionModal(form, 'reject')}
                                className="text-red-600 hover:text-red-800 font-medium"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Application Details - NOC-{selectedForm.id}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium text-gray-700">Title:</span> <span className="text-gray-900">{selectedForm.title}</span></div>
                <div><span className="font-medium text-gray-700">Production House:</span> <span className="text-gray-900">{selectedForm.producerHouse}</span></div>
                <div><span className="font-medium text-gray-700">Location:</span> <span className="text-gray-900">{selectedForm.location}</span></div>
                <div><span className="font-medium text-gray-700">Genre:</span> <span className="text-gray-900">{selectedForm.genre}</span></div>
                <div><span className="font-medium text-gray-700">Duration:</span> <span className="text-gray-900">{selectedForm.duration}</span></div>
                <div><span className="font-medium text-gray-700">Status:</span> <span className="text-gray-900">{selectedForm.status}</span></div>
              </div>
              
              {selectedForm.synopsis && (
                <div className="mt-4">
                  <span className="font-medium text-gray-700">Synopsis:</span>
                  <p className="text-gray-900 mt-1">{selectedForm.synopsis}</p>
                </div>
              )}
              
              {selectedForm.adminRemarks && (
                <div className="mt-4">
                  <span className="font-medium text-gray-700">Admin Remarks:</span>
                  <p className="text-gray-900 mt-1">{selectedForm.adminRemarks}</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {actionType.charAt(0).toUpperCase() + actionType.slice(1)} Application
                </h3>
                <button
                  onClick={closeActionModal}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks (Required):
                </label>
                <textarea
                  value={actionRemarks}
                  onChange={(e) => setActionRemarks(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows="4"
                  placeholder={`Please provide reason for ${actionType}...`}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeActionModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleFormAction(selectedForm.id, actionType)}
                  className={`px-4 py-2 rounded-lg text-white transition-colors ${
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
