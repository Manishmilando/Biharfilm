import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";

const AddSectionForm = ({ onClose, onProfileCreated, artist, isCreatingProfile }) => {
  const [openSection, setOpenSection] = useState(isCreatingProfile ? "contact" : null); // ✅ Open contact by default
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

  const API_BASE_URL = "https://biharfilmbackend-production.up.railway.app/api/artist";
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  // ✅ Create new artist profile
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
      
      // Add social links if provided
      if (socialLinks.facebook) formData.append("facebook", socialLinks.facebook);
      if (socialLinks.instagram) formData.append("instagram", socialLinks.instagram);
      if (socialLinks.twitter) formData.append("twitter", socialLinks.twitter);
      if (socialLinks.linkedin) formData.append("linkedIn", socialLinks.linkedin);
      if (socialLinks.imdb) formData.append("imdbLink", socialLinks.imdb);

      // Create a dummy image file
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

  // ✅ Add experience
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
        
        // Reload page to show new experience
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

  // ✅ Update profile details
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      console.log("📤 Updating profile...");
      
      const response = await fetch(`${API_BASE_URL}/updateMyProfile`, { // ✅ Removed trailing slash
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

  // ✅ FIXED: Proper submit handler
  const handleSubmit = async () => {
    console.log("🔍 Submit triggered:", {
      openSection,
      isCreatingProfile,
      hasArtist: !!artist
    });

    // ✅ Creating profile - MUST fill contact first
    if (isCreatingProfile && !artist) {
      if (openSection === "contact") {
        await handleCreateProfile();
      } else {
        alert("Please fill contact details first to create your profile");
        setOpenSection("contact");
      }
    }
    // ✅ Profile exists - can update or add experience
    else if (artist) {
      if (openSection === "experience") {
        await handleAddExperience();
      } else {
        await handleUpdateProfile();
      }
    }
    // ✅ No profile and trying other sections
    else {
      alert("Please create your profile first with contact details");
      setOpenSection("contact");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex justify-center items-center">
        <div className="bg-white p-6 rounded-2xl w-[400px] max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">
            {isCreatingProfile ? "🎬 Create Artist Profile" : "✏️ Update Profile"}
          </h2>

          {/* ✅ Show warning if creating profile */}
          {isCreatingProfile && !artist && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-800">
                ⚠️ Please fill <strong>Contact Details</strong> and select a <strong>Role</strong> first
              </p>
            </div>
          )}

          {/* Contact Details Section */}
          <div className="border-b border-gray-300 py-2">
            <button
              onClick={() => setOpenSection(openSection === "contact" ? null : "contact")}
              className={`w-full text-left font-medium ${isCreatingProfile && !artist ? 'text-orange-600' : ''}`}
            >
              {isCreatingProfile ? "✨ Add Your Contact Details (Required)" : "+ Update Contact Details"}
            </button>

            <AnimatePresence>
              {openSection === "contact" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden p-3 space-y-3"
                >
                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Salman Khan"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={contactDetails.name || ""}
                      onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">Phone *</label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={contactDetails.phone || ""}
                      onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">Email *</label>
                    <input
                      type="email"
                      placeholder="salman@khan.com"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={contactDetails.email || ""}
                      onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">District *</label>
                    <input
                      type="text"
                      placeholder="Mumbai"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={contactDetails.district || ""}
                      onChange={(e) => setContactDetails({ ...contactDetails, district: e.target.value })}
                    />
                  </div>

                  {/* ✅ NEW: Role selection in contact section */}
                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">Role *</label>
                    <select
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={willingToWork}
                      onChange={(e) => setWillingToWork(e.target.value)}
                    >
                      <option value="" disabled>Select role</option>
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
                    className="mt-2 w-full bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                    {isLoading ? "Saving..." : (isCreatingProfile ? "Create Profile" : "Save")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Media Links Section */}
          <div className="border-b border-gray-300 py-2">
            <button
              onClick={() => setOpenSection(openSection === "social" ? null : "social")}
              className="w-full text-left font-medium"
            >
              + Add Social Media Links
            </button>

            <AnimatePresence>
              {openSection === "social" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden p-3 space-y-3"
                >
                  {[
                    { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourprofile" },
                    { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourprofile" },
                    { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/yourprofile" },
                    { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourprofile" },
                    { key: "imdb", label: "IMDb", placeholder: "https://www.imdb.com/name/nmXXXXXXX/" }
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className="flex items-center">
                      <label className="w-24 text-xs text-gray-700 font-medium">{label}</label>
                      <input
                        type="url"
                        placeholder={placeholder}
                        className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={socialLinks[key] || ""}
                        onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                      />
                    </div>
                  ))}

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="mt-2 bg-black text-white px-4 py-1 rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About Section */}
          <div className="border-b border-gray-300 py-2">
            <button
              onClick={() => setOpenSection(openSection === "about" ? null : "about")}
              className="w-full text-left font-medium"
            >
              + Add About
            </button>

            <AnimatePresence>
              {openSection === "about" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden p-3"
                >
                  <textarea
                    className="w-full border border-gray-400 p-2 rounded-lg"
                    rows="3"
                    placeholder="Write about yourself..."
                    value={aboutUs}
                    onChange={(e) => setAboutUs(e.target.value)}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="mt-2 bg-black text-white px-4 py-1 rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Experience Section */}
          <div className="">
            <button
              onClick={() => setOpenSection(openSection === "experience" ? null : "experience")}
              className="w-full text-left py-2 font-medium"
            >
              + Add Experience
            </button>

            <AnimatePresence>
              {openSection === "experience" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden p-4 space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Film Title"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={experience.filmTitle}
                    onChange={(e) => setExperience({ ...experience, filmTitle: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Role in Film"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={experience.roleInFilm}
                    onChange={(e) => setExperience({ ...experience, roleInFilm: e.target.value })}
                  />

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 font-medium mb-1">From</label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        value={experience.durationFrom}
                        onChange={(e) => setExperience({ ...experience, durationFrom: e.target.value })}
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 font-medium mb-1">To</label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        value={experience.durationTo}
                        onChange={(e) => setExperience({ ...experience, durationTo: e.target.value })}
                      />
                    </div>
                  </div>

                  <textarea
                    placeholder="Description"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    rows="2"
                    value={experience.description}
                    onChange={(e) => setExperience({ ...experience, description: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Awards (optional)"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={experience.awards}
                    onChange={(e) => setExperience({ ...experience, awards: e.target.value })}
                  />

                  <input
                    type="url"
                    placeholder="Link (optional)"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={experience.link}
                    onChange={(e) => setExperience({ ...experience, link: e.target.value })}
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="mt-2 w-full bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                    {isLoading ? "Saving..." : "Add Experience"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full border text-gray-500 border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionForm;
