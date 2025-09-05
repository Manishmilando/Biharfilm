import { useEffect, useState } from "react";
import axios from "axios";
import { FaShareAlt, FaTimesCircle, FaTimes } from "react-icons/fa";
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
  const [selectedDistricts, setSelectedDistricts] = useState({});
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://biharfilmbackend-production.up.railway.app/api/noc/getAllNocForms"
        );
        setCases(response.data.data || []);
        setError(null);
      } catch (err) {
        setError("🛜 Failed to load data. Please ensure the server is running.");
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

  // --- Section Renderer (dynamic from backend fields) ---
  const renderSection = (title, fields) => (
    <div className="mb-6">
      <h3 className="text-md font-semibold text-[#800000] border-b pb-1 mb-2">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {fields.map(([label, key]) => (
          <div key={key}>
            <span className="font-semibold text-gray-700">{label}:</span>{" "}
            {["mibCertificate", "meaCertificate", "seal", "signature"].includes(
              key
            ) && selectedRow[key] ? (
              <a
                href={selectedRow[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-2"
              >
                View Document
              </a>
            ) : (
              <span className="ml-2">{selectedRow[key] || "N/A"}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

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


        {
          showForwardModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden border border-gray-200">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#891737] to-[#6e1129] p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <FaShareAlt className="text-white text-lg" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Forward NOC Application</h2>
                        <p className="text-white/80 text-sm">Select districts and departments to forward</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowForwardModal(false)}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <FaTimes className="text-white text-lg" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
                  <div className="p-6 space-y-6">

                    {/* Districts Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-[#891737] rounded-full"></div>
                        <h3 className="text-lg font-semibold text-[#891737]">Select Districts</h3>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[
                          "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Begusarai",
                          "Purnia", "Ara", "Chapra", "Hajipur", "Katihar", "Munger",
                          "Sasaram", "Samastipur", "Motihari", "Siwan", "Dehri", "Bettiah",
                          "Jamalpur", "Jehanabad", "Buxar", "Sitamarhi", "Saharsa", "Araria",
                          "Kishanganj", "Madhepura", "Sheikhpura", "Lakhisarai"
                        ].map((district) => (
                          <label
                            key={district}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${selectedDistricts.hasOwnProperty(district)
                                ? 'bg-[#891737]/10 border-[#891737] text-[#891737]'
                                : 'bg-gray-50 border-gray-200 hover:border-[#891737]/50'
                              }`}
                          >
                            <input
                              type="checkbox"
                              className="hidden"
                              value={district}
                              checked={selectedDistricts.hasOwnProperty(district)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const district = e.target.value;
                                if (checked) {
                                  setSelectedDistricts((prev) => ({
                                    ...prev,
                                    [district]: [],
                                  }));
                                } else {
                                  const updated = { ...selectedDistricts };
                                  delete updated[district];
                                  setSelectedDistricts(updated);
                                }
                              }}
                            />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedDistricts.hasOwnProperty(district)
                                ? 'bg-[#891737] border-[#891737]'
                                : 'border-gray-300'
                              }`}>
                              {selectedDistricts.hasOwnProperty(district) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-sm font-medium">{district}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Departments Selection */}
                    {Object.keys(selectedDistricts).length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-1 h-6 bg-[#891737] rounded-full"></div>
                          <h3 className="text-lg font-semibold text-[#891737]">Select Departments</h3>
                        </div>

                        <div className="space-y-6">
                          {Object.entries(selectedDistricts).map(([district, depts]) => (
                            <div key={district} className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                              <h4 className="text-base font-semibold text-[#891737] mb-4 flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#891737] rounded-full"></div>
                                {district} District
                              </h4>

                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {["DOP", "DTO", "SDPO", "DM", "SP"].map((dept) => (
                                  <label
                                    key={dept}
                                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200 ${depts.includes(dept)
                                        ? 'bg-[#891737] text-white shadow-md'
                                        : 'bg-white border border-gray-200 hover:border-[#891737]/50'
                                      }`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="hidden"
                                      checked={depts.includes(dept)}
                                      onChange={(e) => {
                                        const newDepts = selectedDistricts[district] || [];
                                        const updated = e.target.checked
                                          ? [...newDepts, dept]
                                          : newDepts.filter((d) => d !== dept);

                                        setSelectedDistricts((prev) => ({
                                          ...prev,
                                          [district]: updated,
                                        }));
                                      }}
                                    />
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${depts.includes(dept)
                                        ? 'bg-white border-white'
                                        : 'border-gray-300'
                                      }`}>
                                      {depts.includes(dept) && (
                                        <div className="w-2 h-2 bg-[#891737] rounded-sm"></div>
                                      )}
                                    </div>
                                    <span className="text-sm font-medium">{dept}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaMapMarkerAlt className="text-gray-400 text-xl" />
                        </div>
                        <p className="text-gray-500 text-lg font-medium mb-2">No Districts Selected</p>
                        <p className="text-gray-400 text-sm">Please select at least one district to view departments</p>
                      </div>
                    )}

                    {/* Summary */}
                    {Object.keys(selectedDistricts).length > 0 && (
                      <div className="bg-[#891737]/5 rounded-2xl p-5 border border-[#891737]/20">
                        <h4 className="text-[#891737] font-semibold mb-3 flex items-center gap-2">
                          <div className="w-5 h-5 bg-[#891737] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          Forward Summary
                        </h4>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p><strong>Districts:</strong> {Object.keys(selectedDistricts).length} selected</p>
                          <p><strong>Total Departments:</strong> {Object.values(selectedDistricts).flat().length} selected</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowForwardModal(false)}
                      className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        if (!selectedRow || !selectedRow._id) {
                          alert("No form selected.");
                          return;
                        }

                        if (Object.keys(selectedDistricts).length === 0) {
                          alert("Please select at least one district.");
                          return;
                        }

                        try {
                          const response = await axios.put(
                            `http://localhost:3000/api/forward/${selectedRow._id}`,
                            { forwardedTo: selectedDistricts }
                          );

                          if (response.data.success) {
                            alert("Form forwarded successfully!");
                            setShowForwardModal(false);
                            setShowModal(false);
                          } else {
                            alert("Failed to forward form.");
                          }
                        } catch (error) {
                          console.error("Forwarding failed:", error);
                          alert("Error forwarding the form.");
                        }
                      }}
                      disabled={Object.keys(selectedDistricts).length === 0}
                      className="px-8 py-3 bg-[#891737] hover:bg-[#6e1129] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <FaShareAlt className="text-sm" />
                      Forward Application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      </div >
    </>
  );
}

export default Dashboardactivity;
