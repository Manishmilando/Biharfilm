import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, ChevronDown, X, User, Globe, Info, Briefcase, Check } from "lucide-react";

const AddSectionForm = ({ onClose, onProfileCreated, artist, isCreatingProfile }) => {
  const [openSection, setOpenSection] = useState(isCreatingProfile ? "contact" : null);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutUs, setAboutUs] = useState(artist?.description || "");
  const [willingToWork, setWillingToWork] = useState(artist?.role || "");
  const [specialization, setSpecialization] = useState("");
  const [contactDetails, setContactDetails] = useState({
    name: artist?.fullName || "",
    email: artist?.email || "",
    phone: artist?.phoneNumber || "",
    district: artist?.district || "",
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: artist?.facebook || "",
    instagram: artist?.instagram || "",
    twitter: artist?.twitter || "",
    linkedin: artist?.linkedIn || "",
    imdb: artist?.imdbLink || "",
  });
  const [experience, setExperience] = useState({
    filmTitle: "",
    roleInFilm: "",
    durationFrom: "",
    durationTo: "",
    description: "",
    awards: "",
    link: "",
  });

  const API_BASE_URL = "http://localhost:3000/api/artist";
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  // Create new artist profile
  const handleCreateProfile = async () => {
    setIsLoading(true);
    try {
      if (!contactDetails.name || !contactDetails.email || !contactDetails.phone || !contactDetails.district || !willingToWork) {
        alert("Please fill all required contact details and select a role");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("fullName", contactDetails.name);
      formData.append("email", contactDetails.email);
      formData.append("phoneNumber", contactDetails.phone);
      formData.append("district", contactDetails.district);
      formData.append("role", willingToWork);
      formData.append("description", aboutUs || "");
      formData.append("dob", new Date().toISOString());

      if (socialLinks.facebook) formData.append("facebook", socialLinks.facebook);
      if (socialLinks.instagram) formData.append("instagram", socialLinks.instagram);
      if (socialLinks.twitter) formData.append("twitter", socialLinks.twitter);
      if (socialLinks.linkedin) formData.append("linkedIn", socialLinks.linkedin);
      if (socialLinks.imdb) formData.append("imdbLink", socialLinks.imdb);

      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#a92b4e";
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = "white";
      ctx.font = "bold 80px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(contactDetails.name.charAt(0).toUpperCase(), 100, 100);

      canvas.toBlob((blob) => {
        formData.append("image", blob, "avatar.png");
        submitProfileCreation(formData);
      });
    } catch (err) {
      console.error("Error preparing profile:", err);
      alert("Failed to prepare profile");
      setIsLoading(false);
    }
  };

  const submitProfileCreation = async (formData) => {
    try {
      console.log("📤 Sending profile creation request...");

      const response = await fetch(`${API_BASE_URL}/addArtist`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log("📥 Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Artist profile created:", result.data);
        alert("Artist profile created successfully!");
        onProfileCreated(result.data);
        onClose();
      } else {
        const errorData = await response.json();
        console.error("❌ Backend error:", errorData);
        throw new Error(errorData.message || "Failed to create profile");
      }
    } catch (err) {
      console.error("Error creating profile:", err);
      alert(`Failed to create profile: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Add experience
  const handleAddExperience = async () => {
    setIsLoading(true);
    try {
      if (!experience.filmTitle || !experience.roleInFilm || !experience.durationFrom) {
        alert("Please fill in Film Title, Role, and Start Date");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/addExperience`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filmTitle: experience.filmTitle,
          roleInFilm: experience.roleInFilm,
          durationFrom: experience.durationFrom,
          durationTo: experience.durationTo || null,
          description: experience.description,
          awards: experience.awards,
          link: experience.link
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Experience added:", result.data);
        alert("Experience added successfully!");
        setExperience({
          filmTitle: "",
          roleInFilm: "",
          durationFrom: "",
          durationTo: "",
          description: "",
          awards: "",
          link: "",
        });
        setOpenSection(null);
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add experience");
      }
    } catch (err) {
      console.error("Error adding experience:", err);
      alert(`Failed to add experience: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile details
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      console.log("📤 Updating profile...");

      const response = await fetch(`${API_BASE_URL}/updateMyProfile`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: contactDetails.name,
          email: contactDetails.email,
          phoneNumber: contactDetails.phone,
          district: contactDetails.district,
          role: willingToWork,
          description: aboutUs,
          facebook: socialLinks.facebook,
          instagram: socialLinks.instagram,
          twitter: socialLinks.twitter,
          linkedIn: socialLinks.linkedin,
          imdbLink: socialLinks.imdb
        })
      });

      console.log("📥 Update response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Profile updated:", result.data);
        alert("Profile updated successfully!");
        onProfileCreated(result.data);
        onClose();
      } else {
        const errorData = await response.json();
        console.error("❌ Update error:", errorData);
        throw new Error(errorData.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(`Failed to update profile: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Proper submit handler
  const handleSubmit = async () => {
    console.log("🔍 Submit triggered:", {
      openSection,
      isCreatingProfile,
      hasArtist: !!artist
    });

    if (isCreatingProfile && !artist) {
      if (openSection === "contact") {
        await handleCreateProfile();
      } else {
        alert("Please fill contact details first to create your profile");
        setOpenSection("contact");
      }
    } else if (artist) {
      if (openSection === "experience") {
        await handleAddExperience();
      } else {
        await handleUpdateProfile();
      }
    } else {
      alert("Please create your profile first with contact details");
      setOpenSection("contact");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {isCreatingProfile ? "Create Artist Profile" : "Update Profile"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isCreatingProfile ? "Complete your profile information" : "Edit your profile details"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Warning Banner */}
        {isCreatingProfile && !artist && (
          <div className="mx-6 mt-4 p-3 bg-orange-50 border border-orange-100 rounded-lg flex items-start gap-2">
            <Info className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-orange-800">
              Please complete <strong>Contact Details</strong> and select a <strong>Role</strong> to create your profile
            </p>
          </div>
        )}

        {/* Accordion Sections */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)] space-y-2">

          {/* Contact Details Section */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === "contact" ? null : "contact")}
              className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${openSection === "contact" ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {isCreatingProfile ? "Contact Details" : "Update Contact"}
                </span>
                {isCreatingProfile && !artist && (
                  <span className="text-xs text-orange-600 font-medium">Required</span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSection === "contact" ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {openSection === "contact" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="p-4 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                        value={contactDetails.name || ""}
                        onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                        value={contactDetails.phone || ""}
                        onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                        value={contactDetails.email || ""}
                        onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your district"
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                        value={contactDetails.district || ""}
                        onChange={(e) => setContactDetails({ ...contactDetails, district: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Professional Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors appearance-none bg-white"
                        value={willingToWork}
                        onChange={(e) => setWillingToWork(e.target.value)}
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="actor">Actor / Actress</option>
                        <option value="singer">Singer</option>
                        <option value="composer">Composer</option>
                        <option value="musician">Musician</option>
                        <option value="director">Director</option>
                        <option value="producer">Producer</option>
                        <option value="dancer">Dancer</option>
                        <option value="stunt">Stunt / Action Artist</option>
                        <option value="writer">Writer / Script</option>
                        <option value="editor">Editor</option>
                        <option value="cinematographer">Cinematographer</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#891737]/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          {isCreatingProfile ? "Create Profile" : "Save Changes"}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Media Section */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === "social" ? null : "social")}
              className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${openSection === "social" ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Social Media Links</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSection === "social" ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {openSection === "social" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="p-4 space-y-3">
                    {[
                      { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourprofile" },
                      { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourprofile" },
                      { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/yourprofile" },
                      { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourprofile" },
                      { key: "imdb", label: "IMDb", placeholder: "https://www.imdb.com/name/nmXXXXXXX/" }
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}</label>
                        <input
                          type="url"
                          placeholder={placeholder}
                          className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                          value={socialLinks[key] || ""}
                          onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                        />
                      </div>
                    ))}

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#891737]/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Save Links
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About Section */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === "about" ? null : "about")}
              className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${openSection === "about" ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Info className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">About Me</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSection === "about" ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {openSection === "about" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="p-4">
                    <textarea
                      className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors resize-none"
                      rows="4"
                      placeholder="Tell us about yourself and your work..."
                      value={aboutUs}
                      onChange={(e) => setAboutUs(e.target.value)}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full mt-3 px-4 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#891737]/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Save About
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Experience Section */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === "experience" ? null : "experience")}
              className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${openSection === "experience" ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Add Experience</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSection === "experience" ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {openSection === "experience" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="p-4 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Film Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter film title"
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                        value={experience.filmTitle}
                        onChange={(e) => setExperience({ ...experience, filmTitle: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Role in Film <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your role"
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                        value={experience.roleInFilm}
                        onChange={(e) => setExperience({ ...experience, roleInFilm: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                          value={experience.durationFrom}
                          onChange={(e) => setExperience({ ...experience, durationFrom: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          End Date <span className="text-gray-400 text-xs font-normal">Optional</span>
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                          value={experience.durationTo}
                          onChange={(e) => setExperience({ ...experience, durationTo: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
                      <textarea
                        placeholder="Describe your role and contributions..."
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors resize-none"
                        rows="3"
                        value={experience.description}
                        onChange={(e) => setExperience({ ...experience, description: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Awards <span className="text-gray-400 text-xs font-normal">Optional</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Any awards or recognition"
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                        value={experience.awards}
                        onChange={(e) => setExperience({ ...experience, awards: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Link <span className="text-gray-400 text-xs font-normal">Optional</span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/project"
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                        value={experience.link}
                        onChange={(e) => setExperience({ ...experience, link: e.target.value })}
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#891737]/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Add Experience
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionForm;
