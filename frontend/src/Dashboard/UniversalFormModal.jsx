import React, { useEffect } from 'react';
import { FaTimesCircle, FaShareAlt, FaTimes, FaExternalLinkAlt, FaCheckCircle, FaEye } from 'react-icons/fa';

const UniversalFormModal = ({ 
  isOpen, 
  onClose, 
  selectedRow, 
  userRole,
  onForward,
  onApprove,
  onReject,
  onView,
  showActions = true,
  customActions = null
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !selectedRow) return null;

  // Define sections configuration
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

  // Get role-specific actions
  const getRoleActions = () => {
    if (customActions) return customActions;
    
    switch (userRole) {
      case 'admin':
        return (
          <>
            <button
              onClick={() => onForward && onForward(selectedRow)}
              className="bg-[#891737] hover:bg-[#6e1129] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <FaShareAlt className="text-sm" />
                <span>Forward</span>
              </div>
            </button>
            <button 
              onClick={() => onReject && onReject(selectedRow)}
              className="bg-white hover:bg-gray-50 text-[#891737] border border-[#891737] hover:border-[#6e1129] px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <FaTimes className="text-sm" />
                <span>Reject</span>
              </div>
            </button>
          </>
        );
      
      case 'district_admin':
        return (
          <>
            <button
              onClick={() => onApprove && onApprove(selectedRow)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-sm" />
                <span>Approve</span>
              </div>
            </button>
            <button 
              onClick={() => onReject && onReject(selectedRow)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <FaXCircle className="text-sm" />
                <span>Reject</span>
              </div>
            </button>
          </>
        );
      
      case 'filmmaker':
        return (
          <button 
            onClick={onClose}
            className="bg-[#891737] hover:bg-[#6e1129] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <FaEye className="text-sm" />
              <span>Close</span>
            </div>
          </button>
        );
      
      default:
        return (
          <button 
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Close
          </button>
        );
    }
  };

  return (
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
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
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
                  <span className="text-xs font-medium text-gray-700">
                    NOC Application Details - {selectedRow.id ? `NOC-${selectedRow.id}` : 'Draft'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Optional Download Component */}
              {onView && (
                <button
                  onClick={() => onView(selectedRow)}
                  className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  title="Download PDF"
                >
                  <FaExternalLinkAlt className="text-blue-600 text-sm" />
                </button>
              )}
              
              <button
                onClick={onClose}
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
            {sections.map((section, index) => {
              // Filter out empty fields
              const validFields = section.fields.filter(([, key]) => {
                const value = selectedRow[key];
                return value && value !== "" && value !== "N/A";
              });

              // Don't render section if no valid fields
              if (validFields.length === 0) return null;

              return (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Section Header */}
                  <div className="px-4 py-3 border-b border-[#891737]/20">
                    <h3 className="text-lg font-bold text-[#891737] flex items-center gap-2">
                      <div className="w-1 h-5 bg-[#891737] rounded-full"></div>
                      {section.title}
                    </h3>
                  </div>

                  {/* Content Grid */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {validFields.map(([label, key], fieldIndex) => {
                        const value = selectedRow[key];
                        const iconInfo = getIconForField(key);
                        const isUrlValue = isUrl(value);

                        return (
                          <div key={fieldIndex} className="flex flex-col space-y-1">
                            <dt className="text-sm font-semibold text-[#891737] uppercase tracking-wide">
                              {label}
                            </dt>
                            <dd className="text-base text-gray-900 font-medium">
                              {iconInfo && isUrlValue ? (
                                <a
                                  href={value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 hover:bg-[#891737]/20 border border-[#891737]/20 hover:border-[#891737]/40 px-3 py-2 rounded-lg transition-all duration-200 text-[#891737] text-sm font-medium"
                                >
                                  <span className="text-lg">{iconInfo.icon}</span>
                                  <span>View {iconInfo.type === 'certificate' ? 'Certificate' : 'Document'}</span>
                                  <FaExternalLinkAlt className="text-xs" />
                                </a>
                              ) : iconInfo && !isUrlValue ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{iconInfo.icon}</span>
                                  <span>{value}</span>
                                </div>
                              ) : typeof value === 'string' && value.length > 60 ? (
                                <details className="cursor-pointer">
                                  <summary className="hover:text-[#891737] transition-colors">
                                    {value.substring(0, 60)}...
                                  </summary>
                                  <div className="mt-1 text-gray-700 leading-relaxed">
                                    {value}
                                  </div>
                                </details>
                              ) : (
                                <span>{value}</span>
                              )}
                            </dd>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        {showActions && (
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="flex justify-center gap-3 py-4">
              {getRoleActions()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalFormModal;
