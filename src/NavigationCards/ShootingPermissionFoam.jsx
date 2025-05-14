import React, { useState } from "react";

const ShootingPermissionForm = () => {
  const [formData, setFormData] = useState({});
  const [showAnnexureA, setShowAnnexureA] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    setShowAnnexureA(true);
    // Add submission logic here
  };

  const renderInput = (label, name, type = "text", isTextarea = false) => {
  return (
    <div className="mb-4">
      <label className="block text-m font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          rows={4}
          value={formData[name] || ""}
          onChange={handleChange}
          required
          className="mt-1 block w-full sm:text-sm border border-gray-300 rounded-lg px-2 py-3"
        />
      ) : type === "file" ? (
        <input
          type="file"
          name={name}
          onChange={handleChange}
          required
          className="mt-1 block w-full sm:text-sm border border-gray-300 rounded-lg px-2 py-3"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          required
          className="mt-1 block w-full sm:text-sm border border-gray-300 rounded-lg px-2 py-3"
        />
      )}
    </div>
  );
};


  return (
    <div className="min-h-screen bg-zinc-300 py-12 px-4 sm:px-6 lg:px-8">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css"
      />
      <div className="max-w-6xl mx-auto bg-[#f3f4f6] p-10 rounded-lg shadow-md ">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-2">
          BIHAR STATE FILM DEVELOPMENT & FINANCE CORPORATION LTD
        </h1>
        <div className="h-0.5 w-py bg-gray-300 mb-5" ></div>
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-10">
          Shooting Permission Application Form
        </h1>
        {!showAnnexureA && (
          <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white px-5 py-5">
            {renderInput("Type of Project", "projectType")}
            {renderInput("Language of the Film/Project", "language")}
            {renderInput("Genre", "genre")}
            {renderInput("Duration of Project", "duration")}
            {renderInput("Title of Project", "title")}
            {renderInput("Director and Main Cast Names", "directorCast")}
            {renderInput("Synopsis of Project (250 words)", "synopsis", "text", true)}
            {renderInput("Producer House", "producerHouse")}
            {renderInput("Production House Address", "productionAddress", "text", true)}
            {renderInput("Contact of Production House", "productionContact")}
            {renderInput("Email ID of Production House", "productionEmail", "email")}
            {renderInput("Production House Constitution", "constitution")}
            {renderInput("Registration Number", "registrationNo")}
            {renderInput("Representative Name", "repName")}
            {renderInput("Designation of Applicant", "designation")}
            {renderInput("Address of Applicant", "applicantAddress", "text", true)}
            {renderInput("Contact of Applicant", "applicantContact")}
            {renderInput("Email ID of Applicant", "applicantEmail", "email")}
            {renderInput("Brief Synopsis (500 words)", "briefSynopsis", "text", true)}
            {renderInput("Main Artist(s) at Location", "mainArtists")}
            {renderInput("No. of Shooting Locations (Annexure A)", "shootingLocations")}
            {renderInput("Drone Permission Required (Yes/No)", "drone", "text")}
            {renderInput("Animal Part of Shooting (Yes/No)", "animalInvolved", "text")}
            {renderInput("Fire/Blasting Scene (Yes/No)", "fireScene", "text")}
            {renderInput("Temporary Structure Creation (Yes/No)", "structure", "text")}
            {renderInput("Other Details (Road Blocks etc.)", "otherDetails", "text", true)}
            {renderInput("Line Producer Details", "lineProducer", "text", true)}
            {renderInput("Police/Security Requirement", "securityDetails", "text", true)}
            {renderInput("Site Contact Person Details", "siteContact", "text", true)}
            {renderInput("In-Film Branding or Asset Use", "brandingDetails", "text", true)}
            {renderInput("MIB Certificate (for International Film)", "mibCertificate", "file")}
            {renderInput("MEA Certificate (for Documentary, AV, Music)", "meaCertificate", "file")}
            {renderInput("Other Particulars", "otherParticulars", "text", true)}
            {renderInput("Authorized Applicant Name", "authApplicant")}
            {renderInput("Seal", "seal")}
            {renderInput("Date", "date", "date")}
            {renderInput("Signature", "signature")}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#a92b4e] hover:bg-[#891737] "
            >
              <i className="mdi mdi-check mr-2" /> Submit Form
            </button>
          </div>
        </form>
        )}
        {showAnnexureA && (
          <div className="mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Annexure A – Shooting Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("Location", "location")}
              {renderInput("Landmark", "landmark")}
              {renderInput("Indoor / Outdoor / Both", "locationType")}
              {renderInput("Start Date & Time", "startDateTime", "datetime-local")}
              {renderInput("Expected End Date & Time", "endDateTime", "datetime-local")}
              {renderInput("Crew/Public Involvement", "crewInvolvement")}
              {renderInput("Tentative count of persons at site", "personCount")}
              {renderInput("Details of Permission Required", "permissionDetails")}
              {renderInput("Location Fee", "locationFee")}
              {renderInput("Security Deposit", "securityDeposit")}
              {renderInput("Payment Ref/DD Number", "paymentRef")}
              {renderInput("Location Manager Details", "locationManager", "text", true)}
              {renderInput("Scene Details (100 words)", "sceneDetails", "text", true)}
              {renderInput("Forest Area Type (if applicable)", "forestType")}
              {renderInput("Forest Area Details", "forestDetails", "text", true)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ShootingPermissionForm;
