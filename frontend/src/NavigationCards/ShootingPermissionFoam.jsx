import React, { useState, useEffect } from "react";
import axios from "axios";

const Response = () => {
  const [formData, setFormData] = useState({
    projectInformation: {
      typeOfProject: "",
      language: "",
      genre: "",
      duration: "",
      title: "",
      directorAndMainCast: "",
    },
    productionHouseDetails: {
      producerHouse: "",
      synopsis: "",
      contactOfProductionHouse: "",
      productionHouseAddress: "",
      emailOfProductionHouse: "",
      productionHouseConstitution: "",
    },
    applicantDetails: {
      registrationNumber: "",
      representativeName: "",
      designationOfApplicant: "",
      addressOfApplicant: "",
      contactOfApplicant: "",
      emailOfApplicant: "",
    },
    creativeandcast: {
      briefSynopsis: "",
      mainArtistsAtLocation: "",
      numberOfShootingLocations: "",
      dronePermissionRequired: "",
      animalPartOfShooting: "",
    },
    technicalRequirements: {
      fireOrBlastingScene: "",
      temporaryStructureCreation: "",
      otherDetails: "",
      lineProducerDetails: "",
      policeOrSecurityRequirements: "",
      siteContactPersonalDetails: "",
    },
    legalAndBranding: {
      mibCertificate: "",
      meaCertificate: "",
      inFilmBrandingOrAssetUse: "",
      otherParticulars: "",
    },
    declaration: {
      authorizedApplicantName: "",
      seal: "",
      date: "",
      signature: "",
    },
    annexureA: {
      location: "",
      landmark: "",
      locationType: "",
      startDateTime: "",
      endDateTime: "",
      crewInvolvement: "",
      personCount: "",
      permissionDetails: "",
      locationFee: "",
      securityDeposit: "",
      paymentRef: "",
      locationManager: "",
      sceneDetails: "",
      forestType: "",
      forestDetails: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("projectinformation");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [saveStatus, setSaveStatus] = useState("idle");

  const onSubmit = async () => {
  try {
    setSaveStatus("saving");
    const formToSubmit = new FormData();

    Object.entries(formData).forEach(([sectionKey, sectionData]) => {
      Object.entries(sectionData).forEach(([fieldKey, fieldValue]) => {
        if (fieldValue instanceof File) {
          formToSubmit.append(fieldKey, fieldValue);
        } else {
          formToSubmit.append(fieldKey, fieldValue);
        }
      });
    });

    const response = await axios.post(
      "https://biharfilmbackend-production.up.railway.app/api/noc/submit",
      formToSubmit,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setSaveStatus("success");
    setNotification({
      show: true,
      message: "Application submitted successfully!",
      type: "success",
    });

    // Clear localStorage after successful submission
    const keys = [
      "projectInformation",
      "productionHouseDetails",
      "applicantDetails",
      "creativeandcast",
      "technicalRequirements",
      "legalAndBranding",
      "declaration",
      "annexureA",
    ];
    keys.forEach(key => localStorage.removeItem(key));

    // Reset form data to initial state
    setFormData({
      projectInformation: {
        typeOfProject: "",
        language: "",
        genre: "",
        duration: "",
        title: "",
        directorAndMainCast: "",
      },
      productionHouseDetails: {
        producerHouse: "",
        synopsis: "",
        contactOfProductionHouse: "",
        productionHouseAddress: "",
        emailOfProductionHouse: "",
        productionHouseConstitution: "",
      },
      applicantDetails: {
        registrationNumber: "",
        representativeName: "",
        designationOfApplicant: "",
        addressOfApplicant: "",
        contactOfApplicant: "",
        emailOfApplicant: "",
      },
      creativeandcast: {
        briefSynopsis: "",
        mainArtistsAtLocation: "",
        numberOfShootingLocations: "",
        dronePermissionRequired: "",
        animalPartOfShooting: "",
      },
      technicalRequirements: {
        fireOrBlastingScene: "",
        temporaryStructureCreation: "",
        otherDetails: "",
        lineProducerDetails: "",
        policeOrSecurityRequirements: "",
        siteContactPersonalDetails: "",
      },
      legalAndBranding: {
        mibCertificate: "",
        meaCertificate: "",
        inFilmBrandingOrAssetUse: "",
        otherParticulars: "",
      },
      declaration: {
        authorizedApplicantName: "",
        seal: "",
        date: "",
        signature: "",
      },
      annexureA: {
        location: "",
        landmark: "",
        locationType: "",
        startDateTime: "",
        endDateTime: "",
        crewInvolvement: "",
        personCount: "",
        permissionDetails: "",
        locationFee: "",
        securityDeposit: "",
        paymentRef: "",
        locationManager: "",
        sceneDetails: "",
        forestType: "",
        forestDetails: "",
      },
    });

    // Reset to first section
    setActiveSection("projectinformation");

    console.log("✅ Form submitted:", response.data);
  } catch (err) {
    setSaveStatus("error");
    setNotification({
      show: true,
      message: "Failed to submit application. Please try again.",
      type: "error",
    });
    console.error("❌ Error:", err);
  }

  setTimeout(() => {
    setNotification({ show: false, message: "", type: "" });
    setSaveStatus("idle");
  }, 3000);
};


  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (section, field, file) => {
    if (!file) return;

    // File size validation (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setNotification({
        show: true,
        message: "File size must be less than 5MB",
        type: "warning",
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
      return;
    }

    // File type validation
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setNotification({
        show: true,
        message: "Please upload a valid file format (PDF, DOC, DOCX, JPG, PNG)",
        type: "warning",
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: file,
      },
    }));

    setNotification({
      show: true,
      message: `File uploaded successfully: ${file.name}`,
      type: "success",
    });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 2000);
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const keys = [
      "projectInformation",
      "productionHouseDetails",
      "applicantDetails",
      "creativeandcast",
      "technicalRequirements",
      "legalAndBranding",
      "declaration",
      "annexureA",
    ];

    keys.forEach((key) => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);

          // Handle file objects that were stored as metadata
          Object.keys(parsedData).forEach((fieldKey) => {
            if (
              parsedData[fieldKey] &&
              typeof parsedData[fieldKey] === "object" &&
              parsedData[fieldKey].isFile
            ) {
              parsedData[fieldKey] = {
                name: parsedData[fieldKey].name,
                size: parsedData[fieldKey].size,
                type: parsedData[fieldKey].type,
                lastModified: parsedData[fieldKey].lastModified,
                isStoredFile: true,
              };
            }
          });

          setFormData((prev) => ({ ...prev, [key]: parsedData }));
        } catch (error) {
          console.warn(`Error parsing stored data for ${key}:`, error);
        }
      }
    });
    setLoading(false);
  }, []);

  const renderInputField = (key, value, sectionName, sectionTitle) => {
    const formattedKey = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    // Custom label mapping
    const labelMappings = {
      language: "Language Of The Film/Project",
      synopsis: "Synopsis Of Project (250 words)",
      emailOfProductionHouse: "Email ID of Production House",
      emailOfApplicant: "Email ID of Applicant",
      briefSynopsis: "Brief Synopsis (500 Words)",
      mainArtistsAtLocation: "Main Artist(s) at location",
      numberOfShootingLocations: "No. of Shooting Locations (Annexure A)",
      fireOrBlastingScene: "Fire/Blasting Scene",
      otherDetails: "Other Details (Road Blocks etc.)",
      policeOrSecurityRequirements: "Police/Security Requirements",
      mibCertificate: "MIB Certificate (for International Film)",
      meaCertificate: "MEA Certificate (for Documentary, AV, Music)",
      inFilmBrandingOrAssetUse: "In-Film Branding or Assets Use",
      authorizedApplicantName: "Authorized Applicant Name",
      startDateTime: "Start Date & Time",
      endDateTime: "Expected End Date & Time",
      crewInvolvement: "Crew/Public Involvement",
      personCount: "Tentative count of persons at site",
      permissionDetails: "Details of Permission Required",
      locationFee: "Location Fee",
      securityDeposit: "Security Deposit",
      paymentRef: "Payment Ref/DD Number",
      locationManager: "Location Manager Details",
      sceneDetails: "Scene Details (100 words)",
      forestType: "Forest Area Type (if applicable)",
      forestDetails: "Forest Area Details",
    };

    const displayLabel = labelMappings[key] || formattedKey;

    // Input type determination
    let inputType = "text";
    if (key.toLowerCase().includes("datetime") || 
        (key.toLowerCase().includes("date") && key.toLowerCase().includes("time"))) {
      inputType = "datetime-local";
    } else if (key.toLowerCase().includes("date")) {
      inputType = "date";
    } else if (key.toLowerCase().includes("email")) {
      inputType = "email";
    } else if (key.toLowerCase().includes("contact")) {
      inputType = "tel";
    } else if (["personCount", "locationFee", "securityDeposit"].includes(key)) {
      inputType = "number";
    }

    // Field type categorization
    const yesNoFields = [
      "dronePermissionRequired",
      "animalPartOfShooting",
      "fireOrBlastingScene",
      "policeOrSecurityRequirements",
      "temporaryStructureCreation",
    ];

    const fileUploadFields = ["mibCertificate", "meaCertificate", "seal", "signature"];

    const textareaFields = [
      "synopsis",
      "briefSynopsis",
      "sceneDetails",
      "permissionDetails",
      "locationManager",
      "forestDetails",
      "otherDetails",
      "otherParticulars",
    ];

    const dropdownFields = {
      locationType: ["Indoor", "Outdoor", "Both"],
      forestType: [
        "",
        "Reserved Forest",
        "Protected Forest",
        "National Park",
        "Wildlife Sanctuary",
        "Not Applicable",
      ],
    };

    let inputElement;

    // Common input styles with thinner focus ring (ring-1 instead of ring-2)
    const inputClasses = "block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] transition-all duration-200 text-base bg-gray-50 hover:bg-white focus:bg-white caret-[#800000] leading-normal";
    const selectClasses = "block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] transition-all duration-200 text-base bg-gray-50 hover:bg-white focus:bg-white leading-normal";
    const textareaClasses = "block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] transition-all duration-200 resize-none text-base bg-gray-50 hover:bg-white focus:bg-white caret-[#800000] leading-normal";

    if (yesNoFields.includes(key)) {
      inputElement = (
        <select
          id={`${sectionName}-${key}`}
          value={value}
          onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
          className={selectClasses}
        >
          <option value="">Select an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    } else if (dropdownFields[key]) {
      inputElement = (
        <select
          id={`${sectionName}-${key}`}
          value={value}
          onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
          className={selectClasses}
        >
          <option value="">Select an option</option>
          {dropdownFields[key].map((option) => (
            <option key={option} value={option}>
              {option || "Not Applicable"}
            </option>
          ))}
        </select>
      );
    } else if (textareaFields.includes(key)) {
      inputElement = (
        <textarea
          id={`${sectionName}-${key}`}
          value={value}
          onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
          rows={key === "briefSynopsis" || key === "synopsis" ? 4 : 3}
          className={textareaClasses}
          placeholder={
            key === "briefSynopsis"
              ? "Max 500 words"
              : key === "synopsis"
              ? "Max 250 words"
              : key === "sceneDetails"
              ? "Max 100 words"
              : ""
          }
        />
      );
    } else if (fileUploadFields.includes(key)) {
      inputElement = (
        <div className="space-y-3">
          <div className="relative">
            <input
              type="file"
              id={`${sectionName}-${key}`}
              accept="image/*,application/pdf,.doc,.docx"
              onChange={(e) => handleFileChange(sectionName, key, e.target.files[0])}
              className="block w-full text-base text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#800000]/10 file:text-[#800000] hover:file:bg-[#800000]/20 transition-all duration-200 border border-gray-300 rounded-md p-2 bg-gray-50 hover:bg-white focus:bg-white focus:outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000]"
            />
          </div>
          <small className="text-gray-500 text-sm block">
            Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
          </small>
          {value && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
              <div className="flex items-center">
                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-3"></span>
                <div>
                  <p className="font-medium">File uploaded: {value.name || value}</p>
                  {value.isStoredFile && (
                    <p className="text-gray-500 text-xs mt-1">(Previously uploaded)</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      inputElement = (
        <input
          type={inputType}
          id={`${sectionName}-${key}`}
          value={value}
          onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
          className={inputClasses}
        />
      );
    }

    return (
      <div key={key} className="space-y-2">
        <label
          htmlFor={`${sectionName}-${key}`}
          className="block text-sm font-semibold text-gray-700"
        >
          {displayLabel}
          {key === "email" || key === "emailOfProductionHouse" || key === "emailOfApplicant" ? (
            <span className="text-red-500 ml-1">*</span>
          ) : null}
        </label>
        {inputElement}
      </div>
    );
  };

  const renderSection = (title, data, icon, sectionName) => {
    const sectionMapping = {
      projectInformation: "projectinformation",
      productionHouseDetails: "productionhousedetails",
      applicantDetails: "applicantdetails",
      creativeandcast: "creativeandcast",
      technicalRequirements: "technicalrequirements",
      legalAndBranding: "legalandbranding",
      declaration: "declaration",
      annexureA: "annexurea",
    };

    const mappedSectionName = sectionMapping[sectionName] || sectionName;

    if (activeSection !== "all" && activeSection !== mappedSectionName) return null;

    const isLastSection = mappedSectionName === "annexurea";
    const isFirstSection = mappedSectionName === "projectinformation";

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8 transition-all duration-300 hover:shadow-md">
        <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-[#a92b4e] to-[#8a2340] rounded-lg flex items-center justify-center mr-4">
            <span className="text-white text-lg font-bold">
              {mappedSectionName === "projectinformation" ? "1" :
               mappedSectionName === "productionhousedetails" ? "2" :
               mappedSectionName === "applicantdetails" ? "3" :
               mappedSectionName === "creativeandcast" ? "4" :
               mappedSectionName === "technicalrequirements" ? "5" :
               mappedSectionName === "legalandbranding" ? "6" :
               mappedSectionName === "declaration" ? "7" : "8"}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">Please fill all required fields</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(data).map(([key, value]) =>
            renderInputField(key, value, sectionName, title)
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
          <div>
            {!isFirstSection && (
              <button
                type="button"
                onClick={handleGoBack}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a92b4e] transition-all duration-200"
              >
                ← Go Back
              </button>
            )}
          </div>

          <div>
            {isLastSection ? (
              <button
                type="submit"
                className={`inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-[#a92b4e] to-[#8a2340] hover:from-[#8a2340] hover:to-[#a92b4e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a92b4e] transition-all duration-200 ${
                  saveStatus === "saving" ? "opacity-70 cursor-wait" : ""
                }`}
                disabled={saveStatus === "saving"}
              >
                {saveStatus === "saving"
                  ? "Submitting..."
                  : saveStatus === "success"
                  ? "✓ Submitted!"
                  : "Submit Application →"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveAndContinue}
                className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-[#a92b4e] to-[#8a2340] hover:from-[#8a2340] hover:to-[#a92b4e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a92b4e] transition-all duration-200"
              >
                Save & Continue →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTabs = () => {
    const tabs = [
      { id: "projectinformation", label: "Project Info", step: 1 },
      { id: "productionhousedetails", label: "Production House", step: 2 },
      { id: "applicantdetails", label: "Applicant Details", step: 3 },
      { id: "creativeandcast", label: "Creative & Cast", step: 4 },
      { id: "technicalrequirements", label: "Technical", step: 5 },
      { id: "legalandbranding", label: "Legal & Branding", step: 6 },
      { id: "declaration", label: "Declaration", step: 7 },
      { id: "annexurea", label: "Annexure A", step: 8 },
    ];

    return (
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              className={`relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === tab.id
                  ? "bg-gradient-to-r from-[#a92b4e] to-[#8a2340] text-white shadow-lg transform scale-105"
                  : isSectionCompleted(tab.id)
                  ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="inline-flex items-center">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                  activeSection === tab.id
                    ? "bg-white/20 text-white"
                    : isSectionCompleted(tab.id)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {isSectionCompleted(tab.id) ? "✓" : tab.step}
                </span>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Section completion validation
  const isSectionCompleted = (sectionId) => {
    const sectionData = {
      projectinformation: formData.projectInformation,
      productionhousedetails: formData.productionHouseDetails,
      applicantdetails: formData.applicantDetails,
      creativeandcast: formData.creativeandcast,
      technicalrequirements: formData.technicalRequirements,
      legalandbranding: formData.legalAndBranding,
      declaration: formData.declaration,
      annexurea: formData.annexureA,
    };

    const data = sectionData[sectionId];
    if (!data) return false;

    // Check if all required fields have values
    const requiredFields = Object.keys(data).filter(key => {
      // Define which fields are required for each section
      const optionalFields = ["otherDetails", "otherParticulars", "forestDetails"];
      return !optionalFields.includes(key);
    });

    return requiredFields.every(field => {
      const value = data[field];
      return value && value !== "";
    });
  };

  // Navigation helper functions
  const getNextSection = (currentSection) => {
    const sections = [
      "projectinformation",
      "productionhousedetails", 
      "applicantdetails",
      "creativeandcast",
      "technicalrequirements",
      "legalandbranding",
      "declaration",
      "annexurea",
    ];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  };

  const getPreviousSection = (currentSection) => {
    const sections = [
      "projectinformation",
      "productionhousedetails",
      "applicantdetails", 
      "creativeandcast",
      "technicalrequirements",
      "legalandbranding",
      "declaration",
      "annexurea",
    ];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
  };

  const saveCurrentSection = () => {
    const sectionKey = Object.keys(formData).find((key) => {
      const mapping = {
        projectInformation: "projectinformation",
        productionHouseDetails: "productionhousedetails",
        applicantDetails: "applicantdetails",
        creativeandcast: "creativeandcast",
        technicalRequirements: "technicalrequirements",
        legalAndBranding: "legalandbranding",
        declaration: "declaration",
        annexureA: "annexurea",
      };
      return mapping[key] === activeSection;
    });

    if (sectionKey) {
      const sectionData = { ...formData[sectionKey] };

      // Convert File objects to storable format
      Object.keys(sectionData).forEach((key) => {
        if (sectionData[key] instanceof File) {
          sectionData[key] = {
            name: sectionData[key].name,
            size: sectionData[key].size,
            type: sectionData[key].type,
            lastModified: sectionData[key].lastModified,
            isFile: true,
          };
        }
      });

      localStorage.setItem(sectionKey, JSON.stringify(sectionData));
      setNotification({
        show: true,
        message: "Section saved successfully!",
        type: "success",
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 2000);
    }
  };

  const handleGoBack = () => {
    const previousSection = getPreviousSection(activeSection);
    if (previousSection) {
      setActiveSection(previousSection);
    }
  };

  const validateCurrentSection = () => {
    // Basic validation - can be expanded as needed
    const sectionData = {
      projectinformation: formData.projectInformation,
      productionhousedetails: formData.productionHouseDetails,
      applicantdetails: formData.applicantDetails,
      creativeandcast: formData.creativeandcast,
      technicalrequirements: formData.technicalRequirements,
      legalandbranding: formData.legalAndBranding,
      declaration: formData.declaration,
      annexurea: formData.annexureA,
    };

    const data = sectionData[activeSection];
    if (!data) return ["Section data not found"];

    const errors = [];
    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        const fieldName = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
        errors.push(`${fieldName} is required`);
      }
    });

    return errors;
  };

  const handleSaveAndContinue = () => {
    const errors = validateCurrentSection();

    if (errors.length > 0) {
      setNotification({
        show: true,
        message: `Please fill all required fields: ${errors.slice(0, 3).join(", ")}${errors.length > 3 ? "..." : ""}`,
        type: "warning",
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 5000);
      return;
    }

    saveCurrentSection();
    const nextSection = getNextSection(activeSection);
    if (nextSection) {
      setTimeout(() => {
        setActiveSection(nextSection);
      }, 300);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#a92b4e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center max-w-sm ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "warning"
              ? "bg-yellow-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span className="mr-3">
            {notification.type === "success" ? "✓" : 
             notification.type === "warning" ? "⚠" : "✗"}
          </span>
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Bihar State Film Development
            </h1>
            <h2 className="text-2xl font-semibold text-[#a92b4e] mb-4">
              & Finance Corporation Ltd
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#a92b4e] to-[#8a2340] mx-auto rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Application Form for Seeking Permission to Shoot in Bihar
          </p>
        </div>

        {/* Progress Tabs */}
        {renderTabs()}

        {/* Form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}>
          {renderSection("Project Information", formData.projectInformation, "", "projectInformation")}
          {renderSection("Production House Details", formData.productionHouseDetails, "", "productionHouseDetails")}
          {renderSection("Applicant Details", formData.applicantDetails, "", "applicantDetails")}
          {renderSection("Creative And Cast", formData.creativeandcast, "", "creativeandcast")}
          {renderSection("Technical Requirements", formData.technicalRequirements, "", "technicalRequirements")}
          {renderSection("Legal And Branding", formData.legalAndBranding, "", "legalAndBranding")}
          {renderSection("Declaration", formData.declaration, "", "declaration")}
          {renderSection("Annexure A - Location Details", formData.annexureA, "", "annexureA")}
        </form>
      </div>
    </div>
  );
};

export default Response;
