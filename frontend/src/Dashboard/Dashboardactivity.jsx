import { useEffect, useState } from "react";
import axios from "axios";
import { FaShareAlt, FaTimesCircle, FaTimes, FaSearch } from "react-icons/fa";
import { RefreshCw } from "lucide-react";
import DownloadDashboard from "./DownloadDashboard";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  FaMapMarkerAlt
} from "react-icons/fa";

function Dashboardactivity() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);

  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Search/Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

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

        const fetchedData = response.data.data || [];
        setCases(fetchedData);
        setFilteredCases(fetchedData);
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

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...cases];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => {
        const searchableFields = [
          'title', 'typeOfProject', 'genre', 'representativeName', 
          'emailOfProductionHouse', 'producerHouse', 'language',
          'directorAndMainCast', 'location'
        ];

        return searchableFields.some(field => 
          item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply field-specific filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => {
        switch (filterBy) {
          case 'title':
            return item.title?.toLowerCase().includes(searchTerm.toLowerCase());
          case 'type':
            return item.typeOfProject?.toLowerCase().includes(searchTerm.toLowerCase());
          case 'genre':
            return item.genre?.toLowerCase().includes(searchTerm.toLowerCase());
          case 'representative':
            return item.representativeName?.toLowerCase().includes(searchTerm.toLowerCase());
          case 'email':
            return item.emailOfProductionHouse?.toLowerCase().includes(searchTerm.toLowerCase());
          default:
            return true;
        }
      });
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => 
        item.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredCases(filtered);
  }, [searchTerm, filterBy, statusFilter, cases]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterBy('all');
    setStatusFilter('all');
  };

  const handleRowClick = (caseDetail) => {
    setSelectedRow(caseDetail);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  return (
    <>
      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        
        {/* Refresh Button */}
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition flex items-center gap-2"
          title="Refresh Data"
        >
          <RefreshCw size={16} />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 text-sm" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="text-sm" />
            </button>
          )}
        </div>

        {/* Filter by Field */}
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm"
        >
          <option value="all">All Fields</option>
          <option value="title">Title</option>
          <option value="type">Project Type</option>
          <option value="genre">Genre</option>
          <option value="representative">Representative</option>
          <option value="email">Email</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="forwarded">Forwarded</option>
        </select>

        {/* Clear Filters */}
        {(searchTerm || filterBy !== 'all' || statusFilter !== 'all') && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition"
          >
            Clear All
          </button>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600 whitespace-nowrap">
          {filteredCases.length} of {cases.length} results
        </div>
      </div>

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
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">📋</div>
              <div className="text-gray-600 font-medium">No applications found</div>
              <div className="text-gray-500 text-sm mt-1">
                {searchTerm || filterBy !== 'all' || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'No applications have been submitted yet'}
              </div>
              {(searchTerm || filterBy !== 'all' || statusFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 text-sm bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition"
                >
                  Clear Filters
                </button>
              )}
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
                {filteredCases.map((caseDetail, index) => (
                  <tr
                    key={caseDetail._id}
                    className="border-t text-xs border-gray-200 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(caseDetail)}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {/* Highlight search terms */}
                      {searchTerm && (filterBy === 'all' || filterBy === 'type') ? (
                        <span dangerouslySetInnerHTML={{
                          __html: caseDetail.typeOfProject?.replace(
                            new RegExp(`(${searchTerm})`, 'gi'),
                            '<mark class="bg-yellow-200">$1</mark>'
                          )
                        }} />
                      ) : (
                        caseDetail.typeOfProject
                      )}
                    </td>
                    <td className="px-4 py-2">{caseDetail.duration}</td>
                    <td className="px-4 py-2">
                      {/* Highlight search terms */}
                      {searchTerm && (filterBy === 'all' || filterBy === 'title') ? (
                        <span dangerouslySetInnerHTML={{
                          __html: caseDetail.title?.replace(
                            new RegExp(`(${searchTerm})`, 'gi'),
                            '<mark class="bg-yellow-200">$1</mark>'
                          )
                        }} />
                      ) : (
                        caseDetail.title
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {/* Highlight search terms */}
                      {searchTerm && (filterBy === 'all' || filterBy === 'genre') ? (
                        <span dangerouslySetInnerHTML={{
                          __html: caseDetail.genre?.replace(
                            new RegExp(`(${searchTerm})`, 'gi'),
                            '<mark class="bg-yellow-200">$1</mark>'
                          )
                        }} />
                      ) : (
                        caseDetail.genre
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {/* Highlight search terms */}
                      {searchTerm && (filterBy === 'all' || filterBy === 'representative') ? (
                        <span dangerouslySetInnerHTML={{
                          __html: caseDetail.representativeName?.replace(
                            new RegExp(`(${searchTerm})`, 'gi'),
                            '<mark class="bg-yellow-200">$1</mark>'
                          )
                        }} />
                      ) : (
                        caseDetail.representativeName
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {/* Highlight search terms */}
                      {searchTerm && (filterBy === 'all' || filterBy === 'email') ? (
                        <span dangerouslySetInnerHTML={{
                          __html: caseDetail.emailOfProductionHouse?.replace(
                            new RegExp(`(${searchTerm})`, 'gi'),
                            '<mark class="bg-yellow-200">$1</mark>'
                          )
                        }} />
                      ) : (
                        caseDetail.emailOfProductionHouse
                      )}
                    </td>
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
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        caseDetail.status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        caseDetail.status?.toLowerCase() === 'approved' ? 'bg-green-100 text-green-800' :
                        caseDetail.status?.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-800' :
                        caseDetail.status?.toLowerCase() === 'forwarded' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {caseDetail.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

       
        {showModal && selectedRow && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200">

              {/* HEADER */}
              <div className="bg-gray-50 border-b border-gray-200 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-2 border-2 border-[#891737]/20">
                      <img
                        src="/Logo1.png"
                        alt="BSFDFC Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#891737]">
                        BSFDFC Application
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Department of Art & Culture, Govt. of Bihar
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-[#891737] rounded-full"></div>
                        <span className="text-xs font-medium text-gray-700">NOC Application Details</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DownloadDashboard selectedRow={selectedRow} />
                    <button
                      onClick={closeModal}
                      className="w-10 h-10 bg-gray-100 hover:bg-[#891737]/10 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label="Close"
                    >
                      <FaTimesCircle className="text-gray-600 hover:text-[#891737] text-lg transition-colors duration-200" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
                <div className="p-5 space-y-5">

                  {/* Compact Section Renderer */}
                  {(() => {
                    const sections = [
                      {
                        title: "Project Information",
                        fields: [
                          ["Type", "typeOfProject"],
                          ["Language", "language"],
                          ["Genre", "genre"],
                          ["Duration", "duration"],
                          ["Title", "title"],
                          ["Director & Cast", "directorAndMainCast"],
                        ]
                      },
                      {
                        title: "Production Details",
                        fields: [
                          ["Production House", "producerHouse"],
                          ["Synopsis", "synopsis"],
                          ["Contact", "contactOfProductionHouse"],
                          ["Address", "productionHouseAddress"],
                          ["Email", "emailOfProductionHouse"],
                          ["Constitution", "productionHouseConstitution"],
                        ]
                      },
                      {
                        title: "Applicant Information",
                        fields: [
                          ["Registration No", "registrationNumber"],
                          ["Representative", "representativeName"],
                          ["Designation", "designationOfApplicant"],
                          ["Address", "addressOfApplicant"],
                          ["Contact", "contactOfApplicant"],
                          ["Email", "emailOfApplicant"],
                        ]
                      },
                      {
                        title: "Creative Details",
                        fields: [
                          ["Brief Synopsis", "briefSynopsis"],
                          ["Main Artists", "mainArtistsAtLocation"],
                          ["No. of Locations", "numberOfShootingLocations"],
                          ["Drone Used", "dronePermissionRequired"],
                          ["Animal Involved", "animalPartOfShooting"],
                        ]
                      },
                      {
                        title: "Technical & Security",
                        fields: [
                          ["Fire Scene", "fireOrBlastingScene"],
                          ["Structure", "temporaryStructureCreation"],
                          ["Other Details", "otherDetails"],
                          ["Line Producer", "lineProducerDetails"],
                          ["Security", "policeOrSecurityRequirement"],
                          ["Site Contact", "siteContactPersonDetails"],
                        ]
                      },
                      {
                        title: "Legal/Branding",
                        fields: [
                          ["MIB Certificate", "mibCertificate"],
                          ["MEA Certificate", "meaCertificate"],
                          ["Branding", "inFilmBrandingOrAssetUse"],
                          ["Other Particulars", "otherParticulars"],
                        ]
                      },
                      {
                        title: "Declaration",
                        fields: [
                          ["Authorized Applicant", "authApplicant"],
                          ["Seal", "seal"],
                          ["Date", "date"],
                          ["Signature", "signature"],
                        ]
                      },
                      {
                        title: "Location Details (Annexure A)",
                        fields: [
                          ["Location", "location"],
                          ["Landmark", "landmark"],
                          ["Location Type", "locationType"],
                          ["Start Time", "startDateTime"],
                          ["End Time", "endDateTime"],
                          ["Crew Involvement", "crewInvolvement"],
                          ["Person Count", "personCount"],
                          ["Permission", "permissionDetails"],
                          ["Fee", "locationFee"],
                          ["Security Deposit", "securityDeposit"],
                          ["Payment Ref", "paymentRef"],
                          ["Manager", "locationManager"],
                          ["Scene Details", "sceneDetails"],
                          ["Forest Type", "forestType"],
                          ["Forest Info", "forestDetails"],
                        ]
                      }
                    ];

                    // Icon mapping for file/URL fields
                    const getIconForField = (key) => {
                      const iconMap = {
                        signature: { icon: "✍️", type: "file" },
                        seal: { icon: "🏛️", type: "file" },
                        mibCertificate: { icon: "📄", type: "certificate" },
                        meaCertificate: { icon: "📋", type: "certificate" }
                      };
                      return iconMap[key];
                    };

                    // Check if value is a URL
                    const isUrl = (value) => {
                      if (typeof value !== 'string') return false;
                      return value.startsWith('http://') || value.startsWith('https://');
                    };

                    return sections.map((section, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                        {/* Section Header */}
                        <div className=" px-4 py-3 border-b border-[#891737]/20">
                          <h3 className="text-lg font-bold text-[#891737] flex items-center gap-2">
                            <div className="w-1 h-5 bg-[#891737] rounded-full"></div>
                            {section.title}
                          </h3>
                        </div>

                        {/* Compact Content Grid */}
                        <div className="p-4">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-3">
                            {section.fields.map(([label, key], fieldIndex) => {
                              const value = selectedRow[key];
                              if (!value || value === "" || value === "N/A") return null;

                              const iconInfo = getIconForField(key);
                              const isUrlValue = isUrl(value);

                              return (
                                <div key={fieldIndex} className="flex flex-col space-y-1">
                                  <dt className="text-sm font-semibold text-[#891737] uppercase tracking-wide">
                                    {label}
                                  </dt>
                                  <dd className="text-base text-gray-900 font-medium">
                                    {iconInfo && isUrlValue ? (
                                      // Render as clickable icon for file URLs
                                      <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2  hover:bg-[#891737]/20 border border-[#891737]/20 hover:border-[#891737]/40 px-3 py-2 rounded-lg transition-all duration-200 text-[#891737] text-sm font-medium"
                                      >
                                        <span className="text-lg">{iconInfo.icon}</span>
                                        <span>View {iconInfo.type === 'certificate' ? 'Certificate' : 'Document'}</span>
                                        <FaExternalLinkAlt className="text-xs" />
                                      </a>
                                    ) : iconInfo && !isUrlValue ? (
                                      // Render with icon for non-URL values
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{iconInfo.icon}</span>
                                        <span>{value}</span>
                                      </div>
                                    ) : typeof value === 'string' && value.length > 60 ? (
                                      // Render expandable text for long content
                                      <details className="cursor-pointer">
                                        <summary className="hover:text-[#891737] transition-colors">
                                          {value.substring(0, 60)}...
                                        </summary>
                                        <div className="mt-1 text-gray-700 leading-relaxed">
                                          {value}
                                        </div>
                                      </details>
                                    ) : (
                                      // Render normal text
                                      <span>{value}</span>
                                    )}
                                  </dd>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* FOOTER */}
              <div className="border-t border-gray-200 bg-gray-50 ">
                <div className="flex justify-center gap-3 py-4"> {/* added py-4 for vertical padding */}
                  <button
                    onClick={() => setShowForwardModal(true)}
                    className="bg-[#891737] hover:bg-[#6e1129] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <FaShareAlt className="text-sm" />
                      <span>Forward</span>
                    </div>
                  </button>

                  <button className="bg-white hover:bg-gray-50 text-[#891737] border border-[#891737] hover:border-[#6e1129] px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                    <div className="flex items-center gap-2">
                      <FaTimes className="text-sm" />
                      <span>Reject</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


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

      {/* Admin Details Section - NEW */}
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
            if (!selectedRow || !selectedRow._id) {
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

              const departmentsPayload = selectedDepartments;

              const response = await axios.put(
                `https://biharfilmbackend-production.up.railway.app/api/noc/forward/${selectedRow._id}`,
                {
                  districts: districtsPayload,
                  departments: departmentsPayload,
                  adminEmail: adminEmail,
                  adminRemarks: adminRemarks || null
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  timeout: 10000 // 10 second timeout
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
                
                // Refresh data if needed
                if (onForwardSuccess) {
                  onForwardSuccess();
                }
              } else {
                alert(`Failed to forward form: ${response.data.message || 'Unknown error'}`);
              }
            } catch (error) {
              console.error("Forwarding failed:", error);
              
              let errorMessage = "Error forwarding the form.";
              
              if (error.response) {
                // Server responded with error status
                errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
              } else if (error.request) {
                // Network error
                errorMessage = "Network error. Please check your connection.";
              } else if (error.code === 'ECONNABORTED') {
                // Timeout error
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



      </div >
    </>
  );
}

export default Dashboardactivity;
