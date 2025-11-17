import React, { useEffect } from 'react';
import { FaTimesCircle, FaShareAlt, FaTimes, FaExternalLinkAlt, FaCheckCircle, FaEye, FaDownload } from 'react-icons/fa';
// ✅ CORRECT - Import as side effect
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import NOCTimeline from './NOCTimeline';


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
        ["Authorized Applicant", "authorizedApplicantName"],
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

const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header with Logo and Title
    doc.setFillColor(137, 23, 55);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('BSFDFC NOC Application', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Department of Art & Culture, Govt. of Bihar', pageWidth / 2, 23, { align: 'center' });
    doc.text(`NOC ID: ${selectedRow.id ? `NOC-${selectedRow.id}` : 'Draft'}`, pageWidth / 2, 29, { align: 'center' });

    yPosition = 45;

    // Status Badge
    const status = selectedRow.status || 'Pending';
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Status: ${status}`, 15, yPosition);
    yPosition += 10;

    // Iterate through sections and add to PDF
    sections.forEach((section) => {
      const validFields = section.fields.filter(([, key]) => {
        const value = selectedRow[key];
        return value && value !== "" && value !== "N/A";
      });

      if (validFields.length === 0) return;

      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }

      // Section Title
      doc.setFillColor(137, 23, 55);
      doc.rect(15, yPosition - 5, pageWidth - 30, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(section.title, 17, yPosition);
      yPosition += 10;

      // Section Content - Table format
      const tableData = validFields.map(([label, key]) => {
        let value = selectedRow[key];
        
        // Handle URLs
        if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
          value = '[Document URL Available]';
        }
        
        // Truncate long text
        if (typeof value === 'string' && value.length > 80) {
          value = value.substring(0, 80) + '...';
        }

        return [label, value];
      });

      // ✅ CORRECTED: Use autoTable as imported function
      autoTable(doc, {
        startY: yPosition,
        head: [['Field', 'Value']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [50, 50, 50]
        },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: 'bold' },
          1: { cellWidth: 120 }
        },
        margin: { left: 15, right: 15 },
        didDrawPage: (data) => {
          // Footer
          doc.setFontSize(8);
          doc.setTextColor(128, 128, 128);
          doc.text(
            `Generated on: ${new Date().toLocaleString('en-IN')}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
          );
          doc.text(
            `Page ${doc.internal.getNumberOfPages()}`,
            pageWidth - 20,
            pageHeight - 10,
            { align: 'right' }
          );
        }
      });

      yPosition = doc.lastAutoTable.finalY + 8;
    });

    // Timeline Information (if available)
    if (selectedRow.timeline && selectedRow.timeline.length > 0) {
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFillColor(137, 23, 55);
      doc.rect(15, yPosition - 5, pageWidth - 30, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Application Timeline', 17, yPosition);
      yPosition += 10;

      const timelineData = selectedRow.timeline.map((event) => [
        event.status || 'N/A',
        event.timestamp ? new Date(event.timestamp).toLocaleString('en-IN') : 'N/A',
        event.remarks || '-'
      ]);

      // ✅ CORRECTED: Use autoTable as imported function
      autoTable(doc, {
        startY: yPosition,
        head: [['Status', 'Timestamp', 'Remarks']],
        body: timelineData,
        theme: 'grid',
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [50, 50, 50]
        },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 60 },
          2: { cellWidth: 80 }
        },
        margin: { left: 15, right: 15 }
      });
    }

    // Save PDF
    const fileName = `NOC_${selectedRow.id || 'Draft'}_${selectedRow.title || 'Application'}.pdf`.replace(/\s+/g, '_');
    doc.save(fileName);
  };


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
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-200 flex flex-col">
        
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
              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-[#891737] hover:bg-[#6e1129] text-white rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md font-semibold"
                title="Download NOC as PDF"
              >
                <FaDownload className="text-sm" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>

              {/* Optional View Button */}
              {onView && (
                <button
                  onClick={() => onView(selectedRow)}
                  className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  title="View External"
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

        {/* CONTENT - Grid layout with 2 columns */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0">
          
          {/* LEFT SIDE - Form Data (2 columns) */}
          <div className="lg:col-span-2 border-r border-gray-200 p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-160px)]">
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
                  <div className="px-4 py-3 border-b border-[#891737]/20 bg-gray-50">
                    <h3 className="text-lg font-bold text-[#891737] flex items-center gap-2">
                      <div className="w-1 h-5 bg-[#891737] rounded-full"></div>
                      {section.title}
                    </h3>
                  </div>

                  {/* Content Grid */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
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

          {/* RIGHT SIDE - Timeline (1 column) */}
          <div className="lg:col-span-1 bg-gray-50 p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
            <NOCTimeline nocForm={selectedRow} />
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
