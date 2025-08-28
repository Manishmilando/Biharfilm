import { useEffect, useState } from "react";
import axios from "axios";
import { FaShareAlt, FaTimesCircle, FaTimes } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { RefreshCw } from 'lucide-react';

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
        ); // api
        setCases(response.data.data);
        setError(null);
      } catch (err) {
        setError("🛜 Failed to load data. Please ensure the server is running.");
        console.error("Failed to fetch NOC forms:", err);
      } finally{
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

  const renderSection = (title, fields) => (
    <div className="mb-6">
      <h3 className="text-md font-semibold border-b pb-1 mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {fields.map(([label, key]) => (
          <div key={key}>
            <span className="font-semibold text-red-500">{label}:</span>{" "}
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
              <span>{selectedRow[key]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (

    <>
    <button onClick={() => window.location.reload()} className="mb-4 px-2 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
          <RefreshCw size={15} />
    </button>
    <div>
      
    </div>
    <div className="relative">
      {/* Table Container */}
      
      <div className="overflow-x-auto rounded-2xl bg-white border border-gray-200 min-h-96">

       {error ? (
  <>
  

    <div className="text-red-600  p-4 rounded-lg my-4">
      {error}
    </div>
  </>
) : loading ? (
  <div className="py-10 px-10">
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
    </div>
) : (
 <table className="min-w-full table-auto  rounded-2xl">
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
                <td className="px-4 py-2">
                  {caseDetail.emailOfProductionHouse}
                </td>
                <td className="px-4 py-2">
                  {new Date(caseDetail.startDateTime).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(caseDetail.endDateTime).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                <div className="mb-1 capitalize">{caseDetail.status}</div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                className={`h-2 rounded-full ${
                caseDetail.status === "approved"
                ? "bg-green-500"
                : caseDetail.status === "forwarded"
                ? "bg-blue-500"
                : caseDetail.status === "rejected"
                ?  "bg-red-500"
          : "bg-yellow-500" // default for submitted or unknown
      }`}
      style={{ width: "100%" }}
    ></div>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
)}

        
      </div>

      {showModal && selectedRow && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">NOC Application Details</h2>
              <div className="flex gap-4">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    alert("Download functionality not implemented")
                  }
                >
                  <IoMdDownload className="text-2xl" />
                </button>
                <button onClick={closeModal}>
                  <FaTimesCircle className="text-red-500 text-2xl" />
                </button>
              </div>
            </div>

            {renderSection("Project Information", [
              ["Type", "typeOfProject"],
              ["Language", "language"],
              ["Genre", "genre"],
              ["Duration", "duration"],
              ["Title", "title"],
              ["Director & Cast", "directorAndMainCast"],
            ])}
            {renderSection("Production Details", [
              ["Production House", "producerHouse"],
              ["Synopsis", "synopsis"],
              ["Contact", "contactOfProductionHouse"],
              ["Address", "productionHouseAddress"],
              ["Email", "emailOfProductionHouse"],
              ["Constitution", "productionHouseConstitution"],
            ])}
            {renderSection("Applicant Information", [
              ["Registration No", "registrationNumber"],
              ["Representative", "representativeName"],
              ["Designation", "designationOfApplicant"],
              ["Address", "addressOfApplicant"],
              ["Contact", "contactOfApplicant"],
              ["Email", "emailOfApplicant"],
            ])}
            {renderSection("Creative Details", [
              ["Brief Synopsis", "briefSynopsis"],
              ["Main Artists", "mainArtistsAtLocation"],
              ["No. of Locations", "numberOfShootingLocations"],
              ["Drone Used", "dronePermissionRequired"],
              ["Animal Involved", "animalPartOfShooting"],
            ])}
            {renderSection("Technical & Security", [
              ["Fire Scene", "fireOrBlastingScene"],
              ["Structure", "temporaryStructureCreation"],
              ["Other Details", "otherDetails"],
              ["Line Producer", "lineProducerDetails"],
              ["Security", "policeOrSecurityRequirement"],
              ["Site Contact", "siteContactPersonDetails"],
            ])}
            {renderSection("Legal/Branding", [
              ["MIB Certificate", "mibCertificate"],
              ["MEA Certificate", "meaCertificate"],
              ["Branding", "inFilmBrandingOrAssetUse"],
              ["Other Particulars", "otherParticulars"],
            ])}
            {renderSection("Declaration", [
              ["Authorized Applicant", "authApplicant"],
              ["Seal", "seal"],
              ["Date", "date"],
              ["Signature", "signature"],
            ])}
            {renderSection("Annexure A", [
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
            ])}

            <div className="mt-6 flex justify-center gap-6">
              <button
                onClick={() => setShowForwardModal(true)}
                className="relative group w-32 h-10 border-2 border-[#a92b43] text-black rounded-md overflow-hidden"
              >
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium transition-opacity duration-300 group-hover:opacity-0">
                  <FaShareAlt className="mr-2" /> Forward
                </span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125">
                  <FaShareAlt className="text-[#a92b43]" />
                </span>
              </button>
              <button className="relative group w-32 h-10 border-2 border-[#a92b43] text-black rounded-md overflow-hidden">
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium transition-opacity duration-300 group-hover:opacity-0">
                  <FaTimes className="mr-2" /> Reject
                </span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125">
                  <FaTimes className="text-[#a92b43]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showForwardModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Forward NOC</h2>
              <button onClick={() => setShowForwardModal(false)}>
                <FaTimesCircle className="text-red-500 text-xl" />
              </button>
            </div>

            {/* District Checkboxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b pb-4 mb-4">
              {[
                "Patna",
                "Gaya",
                "Bhagalpur",
                "Muzaffarpur",
                "Darbhanga",
                "Begusarai",
                "Purnia",
                "Ara",
                "Chapra",
                "Hajipur",
                "Katihar",
                "Munger",
                "Sasaram",
                "Samastipur",
                "Motihari",
                "Siwan",
                "Dehri",
                "Bettiah",
                "Jamalpur",
                "Jehanabad",
                "Buxar",
                "Sitamarhi",
                "Saharsa",
                "Araria",
                "Kishanganj",
                "Madhepura",
                "Sheikhpura",
                "Lakhisarai",
              ].map((district) => (
                <label key={district} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
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
                  <span>{district}</span>
                </label>
              ))}
            </div>

            {/* Department Checkboxes for Each District */}
            {Object.keys(selectedDistricts).length > 0 ? (
              Object.entries(selectedDistricts).map(([district, depts]) => (
                <div key={district} className="mb-4">
                  <h4 className="text-sm font-semibold text-[#a92b43] mb-1">
                    {district}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["DOP", "DTO", "SDPO", "DM", "SP"].map((dept) => (
                      <label key={dept} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox"
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
                        <span>{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                Select districts to view departments.
              </p>
            )}

            <div className="text-center mt-6">
              <button
                onClick={async () => {
                  if (!selectedRow || !selectedRow._id) {
                    alert("No form selected.");
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
                className="bg-[#a92b43] text-white px-6 py-2 rounded-lg"
              >
                Forward
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
