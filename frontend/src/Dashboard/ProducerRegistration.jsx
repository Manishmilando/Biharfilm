import React, { useState, useEffect } from "react";
import axios from "axios";

const ProducerRegistration = () => {
  const [formData, setFormData] = useState({
    companyDetails: {
      productionCompanyName: "",
      companyType: "",
      fullAddress: "",
      pinCode: "",
      state: "",
      country: "",
      email: "",
      contactNumber: "",
      authorizedRepresentative: "",
    },
    producerDocumentation: {
      companyIdentificationNumber: "",
      companyIdentificationDocument: null,
      pan: "",
      panDocument: null,
      gstRegistrationNumber: "",
      gstCertificate: null,
    },
    lineProducerDetails: {
      lineProducerCompanyType: "",
      lineProducerCompanyName: "",
      lineProducerName: "",
      lineProducerPan: "",
      lineProducerAddress: "",
      lineProducerPinCode: "",
      lineProducerState: "",
      lineProducerEmail: "",
      lineProducerMobile: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [saveStatus, setSaveStatus] = useState("idle");
  const [validationErrors, setValidationErrors] = useState({});

  // Company type options
  const companyTypeOptions = [
    "Limited company",
    "Private limited company",
    "Unregistered partnership",
    "Limited Liability partnership",
    "Registered partnership",
    "Sole proprietorship",
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const validatePinCode = (pinCode) => {
    const pinCodeRegex = /^[0-9]{6}$/;
    return pinCodeRegex.test(pinCode);
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateGST = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  // Handle input change with validation
  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));

    // Clear validation error for this field
    setValidationErrors((prev) => ({
      ...prev,
      [`${section}.${field}`]: "",
    }));
  };

  const handleFileChange = (section, field, file) => {
    if (!file) return;

    // File size validation based on field
    let maxSize = 10 * 1024 * 1024; // 10MB default
    if (field === "panDocument") {
      maxSize = 1 * 1024 * 1024; // 1MB for PAN
    }

    if (file.size > maxSize) {
      setNotification({
        show: true,
        message: `File size must be less than ${maxSize / (1024 * 1024)}MB`,
        type: "warning",
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
      return;
    }

    // File type validation - only PDF
    if (file.type !== "application/pdf") {
      setNotification({
        show: true,
        message: "Please upload a PDF file only",
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

  // Validate current step
  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      const { companyDetails } = formData;

      if (!companyDetails.productionCompanyName.trim()) {
        errors["companyDetails.productionCompanyName"] = "Production Company Name is required";
      }
      if (!companyDetails.companyType) {
        errors["companyDetails.companyType"] = "Company Type is required";
      }
      if (!companyDetails.fullAddress.trim()) {
        errors["companyDetails.fullAddress"] = "Full Address is required";
      }
      if (!companyDetails.pinCode) {
        errors["companyDetails.pinCode"] = "Pin code is required";
      } else if (!validatePinCode(companyDetails.pinCode)) {
        errors["companyDetails.pinCode"] = "Pin code must be 6 digits";
      }
      if (!companyDetails.state.trim()) {
        errors["companyDetails.state"] = "State is required";
      }
      if (!companyDetails.country.trim()) {
        errors["companyDetails.country"] = "Country is required";
      }
      if (!companyDetails.email) {
        errors["companyDetails.email"] = "Email ID is required";
      } else if (!validateEmail(companyDetails.email)) {
        errors["companyDetails.email"] = "Please enter a valid email address";
      }
      if (!companyDetails.contactNumber) {
        errors["companyDetails.contactNumber"] = "Contact Number is required";
      } else if (!validateMobileNumber(companyDetails.contactNumber)) {
        errors["companyDetails.contactNumber"] = "Contact Number must be 10 digits";
      }
      if (!companyDetails.authorizedRepresentative.trim()) {
        errors["companyDetails.authorizedRepresentative"] = "Authorized Representative is required";
      }
    } else if (step === 2) {
      const { producerDocumentation } = formData;

      if (!producerDocumentation.companyIdentificationNumber.trim()) {
        errors["producerDocumentation.companyIdentificationNumber"] = "Company Identification Number is required";
      }
      if (!producerDocumentation.companyIdentificationDocument) {
        errors["producerDocumentation.companyIdentificationDocument"] = "Company Identification Document is required";
      }
      if (!producerDocumentation.pan) {
        errors["producerDocumentation.pan"] = "PAN is required";
      } else if (!validatePAN(producerDocumentation.pan.toUpperCase())) {
        errors["producerDocumentation.pan"] = "Please enter a valid PAN (e.g., ABCDE1234F)";
      }
      if (!producerDocumentation.panDocument) {
        errors["producerDocumentation.panDocument"] = "Copy of PAN is required";
      }
      if (!producerDocumentation.gstRegistrationNumber) {
        errors["producerDocumentation.gstRegistrationNumber"] = "GST Registration Number is required";
      } else if (!validateGST(producerDocumentation.gstRegistrationNumber.toUpperCase())) {
        errors["producerDocumentation.gstRegistrationNumber"] = "Please enter a valid GST Number";
      }
      if (!producerDocumentation.gstCertificate) {
        errors["producerDocumentation.gstCertificate"] = "GST Registration Certificate is required";
      }
    } else if (step === 3) {
      const { lineProducerDetails } = formData;

      if (!lineProducerDetails.lineProducerCompanyType) {
        errors["lineProducerDetails.lineProducerCompanyType"] = "Line Producer Company Type is required";
      }
      if (!lineProducerDetails.lineProducerCompanyName.trim()) {
        errors["lineProducerDetails.lineProducerCompanyName"] = "Line Producer Company Name is required";
      }
      if (!lineProducerDetails.lineProducerName.trim()) {
        errors["lineProducerDetails.lineProducerName"] = "Line Producer Name is required";
      }
      if (!lineProducerDetails.lineProducerPan) {
        errors["lineProducerDetails.lineProducerPan"] = "PAN Number is required";
      } else if (!validatePAN(lineProducerDetails.lineProducerPan.toUpperCase())) {
        errors["lineProducerDetails.lineProducerPan"] = "Please enter a valid PAN (e.g., ABCDE1234F)";
      }
      if (!lineProducerDetails.lineProducerAddress.trim()) {
        errors["lineProducerDetails.lineProducerAddress"] = "Full Address is required";
      }
      if (!lineProducerDetails.lineProducerPinCode) {
        errors["lineProducerDetails.lineProducerPinCode"] = "Pin code is required";
      } else if (!validatePinCode(lineProducerDetails.lineProducerPinCode)) {
        errors["lineProducerDetails.lineProducerPinCode"] = "Pin code must be 6 digits";
      }
      if (!lineProducerDetails.lineProducerState.trim()) {
        errors["lineProducerDetails.lineProducerState"] = "State is required";
      }
      if (!lineProducerDetails.lineProducerEmail) {
        errors["lineProducerDetails.lineProducerEmail"] = "Email ID is required";
      } else if (!validateEmail(lineProducerDetails.lineProducerEmail)) {
        errors["lineProducerDetails.lineProducerEmail"] = "Please enter a valid email address";
      }
      if (!lineProducerDetails.lineProducerMobile) {
        errors["lineProducerDetails.lineProducerMobile"] = "Mobile Number is required";
      } else if (!validateMobileNumber(lineProducerDetails.lineProducerMobile)) {
        errors["lineProducerDetails.lineProducerMobile"] = "Mobile Number must be 10 digits";
      }
    }

    return errors;
  };

  const onSubmit = async () => {
    try {
      setSaveStatus("saving");

      const token = localStorage.getItem("authToken");

      if (!token) {
        setNotification({
          show: true,
          message: "Please login to submit the form",
          type: "error",
        });
        setSaveStatus("idle");
        return;
      }

      const formToSubmit = new FormData();

      // Append all form fields to FormData
      Object.entries(formData).forEach(([sectionKey, sectionData]) => {
        Object.entries(sectionData).forEach(([fieldKey, fieldValue]) => {
          if (fieldValue instanceof File) {
            formToSubmit.append(fieldKey, fieldValue);
          } else if (fieldValue && fieldValue !== "") {
            formToSubmit.append(fieldKey, fieldValue);
          }
        });
      });

      const response = await axios.post(
        "http://localhost:3000/api/producer/register",
        formToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Producer registration submitted:", response.data);

      setSaveStatus("success");
      setNotification({
        show: true,
        message: "Producer registration submitted successfully!",
        type: "success",
      });

      // Mark producer registration as completed
      localStorage.setItem("producerRegistrationCompleted", "true");

      // Clear localStorage after successful submission
      localStorage.removeItem("companyDetails");
      localStorage.removeItem("producerDocumentation");
      localStorage.removeItem("lineProducerDetails");

      // Reset form
      setTimeout(() => {
        setFormData({
          companyDetails: {
            productionCompanyName: "",
            companyType: "",
            fullAddress: "",
            pinCode: "",
            state: "",
            country: "",
            email: "",
            contactNumber: "",
            authorizedRepresentative: "",
          },
          producerDocumentation: {
            companyIdentificationNumber: "",
            companyIdentificationDocument: null,
            pan: "",
            panDocument: null,
            gstRegistrationNumber: "",
            gstCertificate: null,
          },
          lineProducerDetails: {
            lineProducerCompanyType: "",
            lineProducerCompanyName: "",
            lineProducerName: "",
            lineProducerPan: "",
            lineProducerAddress: "",
            lineProducerPinCode: "",
            lineProducerState: "",
            lineProducerEmail: "",
            lineProducerMobile: "",
          },
        });
        setActiveStep(1);
      }, 2000);

    } catch (err) {
      console.error("❌ Error submitting form:", err);

      setSaveStatus("error");

      let errorMessage = "Failed to submit registration. Please try again.";

      if (err.response?.status === 401) {
        errorMessage = "Session expired. Please login again.";
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else if (err.response?.status === 400) {
        errorMessage = err.response.data?.message || "Invalid form data. Please check all fields.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setNotification({
        show: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
        setSaveStatus("idle");
      }, 5000);
    }
  };

  // Load saved data from localStorage
  useEffect(() => {
    const keys = ["companyDetails", "producerDocumentation", "lineProducerDetails"];

    keys.forEach((key) => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);

          // Handle file objects
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

  // Save current step to localStorage
  const saveCurrentStep = () => {
    const sectionKeys = {
      1: "companyDetails",
      2: "producerDocumentation",
      3: "lineProducerDetails",
    };

    const sectionKey = sectionKeys[activeStep];
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
    }
  };

  const handleNext = () => {
    const errors = validateStep(activeStep);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setNotification({
        show: true,
        message: "Please fill all required fields correctly",
        type: "warning",
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
      return;
    }

    saveCurrentStep();
    setValidationErrors({});

    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render input fields with validation
  const renderInputField = (section, field, label, type = "text", required = true, options = null) => {
    const value = formData[section][field];
    const errorKey = `${section}.${field}`;
    const hasError = validationErrors[errorKey];

    const inputClasses = `block w-full px-4 py-2 rounded-md border ${hasError ? "border-red-500" : "border-gray-300"
      } shadow-sm focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] transition-all duration-200 text-base bg-gray-50 hover:bg-white focus:bg-white caret-[#800000] leading-normal`;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {options ? (
          <select
            value={value}
            onChange={(e) => handleInputChange(section, field, e.target.value)}
            className={inputClasses}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => {
              let inputValue = e.target.value;

              // Auto-format inputs
              if (field.includes("pan") || field.includes("Pan")) {
                inputValue = inputValue.toUpperCase();
              }
              if (field.includes("gst") || field.includes("Gst")) {
                inputValue = inputValue.toUpperCase();
              }
              if (type === "tel") {
                inputValue = inputValue.replace(/\D/g, "").slice(0, 10);
              }
              if (field.includes("pinCode") || field.includes("PinCode")) {
                inputValue = inputValue.replace(/\D/g, "").slice(0, 6);
              }

              handleInputChange(section, field, inputValue);
            }}
            className={inputClasses}
            placeholder={label}
          />
        )}

        {hasError && (
          <p className="text-red-500 text-sm mt-1">{hasError}</p>
        )}
      </div>
    );
  };

  const renderFileUpload = (section, field, label, maxSize = "10 MB", required = true) => {
    const value = formData[section][field];
    const errorKey = `${section}.${field}`;
    const hasError = validationErrors[errorKey];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="space-y-3">
          <div className="relative">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(section, field, e.target.files[0])}
              className={`block w-full text-base text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#800000]/10 file:text-[#800000] hover:file:bg-[#800000]/20 transition-all duration-200 border ${hasError ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 bg-gray-50 hover:bg-white focus:bg-white focus:outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000]`}
            />
          </div>
          <small className="text-gray-500 text-sm block">
            Upload 1 supported file: PDF. Max {maxSize}.
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
          {hasError && (
            <p className="text-red-500 text-sm mt-1">{hasError}</p>
          )}
        </div>
      </div>
    );
  };

  // Render Step 1: Company Details
  const renderStep1 = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
      <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-r from-[#a92b4e] to-[#8a2340] rounded-lg flex items-center justify-center mr-4">
          <span className="text-white text-lg font-bold">1</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Details</h2>
          <p className="text-sm text-gray-500 mt-1">Please fill all required fields</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderInputField("companyDetails", "productionCompanyName", "Production Company Name")}
        {renderInputField("companyDetails", "companyType", "Company Type", "text", true, companyTypeOptions)}
        {renderInputField("companyDetails", "fullAddress", "Full Address")}
        {renderInputField("companyDetails", "pinCode", "Pin code", "text")}
        {renderInputField("companyDetails", "state", "State")}
        {renderInputField("companyDetails", "country", "Country")}
        {renderInputField("companyDetails", "email", "E-Mail ID", "email")}
        {renderInputField("companyDetails", "contactNumber", "Contact No. (Mobile)", "tel")}
        {renderInputField("companyDetails", "authorizedRepresentative", "Authorized Representative")}
      </div>

      <div className="flex justify-end mt-10 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-[#a92b4e] to-[#8a2340] hover:from-[#8a2340] hover:to-[#a92b4e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a92b4e] transition-all duration-200"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  );

  // Render Step 2: Producer Documentation
  const renderStep2 = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
      <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-r from-[#a92b4e] to-[#8a2340] rounded-lg flex items-center justify-center mr-4">
          <span className="text-white text-lg font-bold">2</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Producer Documentation</h2>
          <p className="text-sm text-gray-500 mt-1">Upload all required documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderInputField("producerDocumentation", "companyIdentificationNumber", "Company Identification Number or Other Similar Registration Number")}
        {renderFileUpload("producerDocumentation", "companyIdentificationDocument", "Company Identification Number or Other Similar Registration Document (Self Attested and Scanned)", "10 MB")}
        {renderInputField("producerDocumentation", "pan", "PAN")}
        {renderFileUpload("producerDocumentation", "panDocument", "Copy of PAN (Self Attested and Scanned)", "1 MB")}
        {renderInputField("producerDocumentation", "gstRegistrationNumber", "GST Registration Number")}
        {renderFileUpload("producerDocumentation", "gstCertificate", "Copy of GST Registration Certificate (Self Attested and Scanned)", "10 MB")}
      </div>

      <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a92b4e] transition-all duration-200"
        >
          ← Go Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-[#a92b4e] to-[#8a2340] hover:from-[#8a2340] hover:to-[#a92b4e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a92b4e] transition-all duration-200"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  );

  // Render Step 3: Line Producer Details
  const renderStep3 = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
      <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-r from-[#a92b4e] to-[#8a2340] rounded-lg flex items-center justify-center mr-4">
          <span className="text-white text-lg font-bold">3</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Line Producer Details</h2>
          <p className="text-sm text-gray-500 mt-1">Please fill all required fields</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderInputField("lineProducerDetails", "lineProducerCompanyType", "Line Producer Company Type", "text", true, companyTypeOptions)}
        {renderInputField("lineProducerDetails", "lineProducerCompanyName", "Line Producer Company Name (If it is a company)")}
        {renderInputField("lineProducerDetails", "lineProducerName", "Line Producer Name (Representative Name in case of a company)")}
        {renderInputField("lineProducerDetails", "lineProducerPan", "PAN Number")}
        {renderInputField("lineProducerDetails", "lineProducerAddress", "Full Address")}
        {renderInputField("lineProducerDetails", "lineProducerPinCode", "Pin code", "text")}
        {renderInputField("lineProducerDetails", "lineProducerState", "State")}
        {renderInputField("lineProducerDetails", "lineProducerEmail", "E-Mail Id", "email")}
        {renderInputField("lineProducerDetails", "lineProducerMobile", "Mobile Number", "tel")}
      </div>

      <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a92b4e] transition-all duration-200"
        >
          ← Go Back
        </button>
        <button
          type="submit"
          className={`inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-[#a92b4e] to-[#8a2340] hover:from-[#8a2340] hover:to-[#a92b4e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a92b4e] transition-all duration-200 ${saveStatus === "saving" ? "opacity-70 cursor-wait" : ""
            }`}
          disabled={saveStatus === "saving"}
        >
          {saveStatus === "saving"
            ? "Submitting..."
            : saveStatus === "success"
              ? "✓ Submitted!"
              : "Submit Registration →"}
        </button>
      </div>
    </div>
  );

  // Step indicator
  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: "Company Details" },
      { number: 2, title: "Producer Documentation" },
      { number: 3, title: "Line Producer Details" },
    ];

    return (
      <div className="mb-10">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${activeStep === step.number
                    ? "bg-gradient-to-r from-[#a92b4e] to-[#8a2340] text-white shadow-lg transform scale-110"
                    : activeStep > step.number
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {activeStep > step.number ? "✓" : step.number}
                </div>
                <p
                  className={`mt-2 text-xs font-medium ${activeStep === step.number ? "text-[#a92b4e]" : "text-gray-500"
                    }`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24 h-1 mx-4 rounded-full transition-all duration-200 ${activeStep > step.number ? "bg-green-500" : "bg-gray-200"
                    }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
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
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center max-w-sm ${notification.type === "success"
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
            Producer Registration Form
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          const errors = validateStep(3);
          if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setNotification({
              show: true,
              message: "Please fill all required fields correctly",
              type: "warning",
            });
            setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
            return;
          }
          onSubmit();
        }}>
          {activeStep === 1 && renderStep1()}
          {activeStep === 2 && renderStep2()}
          {activeStep === 3 && renderStep3()}
        </form>
      </div>
    </div>
  );
};

export default ProducerRegistration;
