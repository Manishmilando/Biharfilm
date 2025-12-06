import React, { useState, useEffect } from "react";
import { Pencil, Loader, AlertCircle, Trash2 } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import UpdateSocialLinks from "./UpdateSocialLinks";
import { FaImdb } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddSectionForm from "./AddSectionForm";
import AlertBox from "../Components/AlertBox";

const ArtistProfile = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAddSectionForm, setshowAddSectionForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerImage, setBannerImage] = useState("/bannerArtist.jpg");

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Edit states
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [editedExperience, setEditedExperience] = useState({});
  const [isEditingSaving, setIsEditingSaving] = useState(false);
  const [editingAbout, setEditingAbout] = useState(false);
  const [editedAbout, setEditedAbout] = useState("");

  // ✅ Alert state
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
    onConfirm: null,
    autoClose: false
  });

  const API_BASE_URL = "http://localhost:3000/api/artist";
  const token = localStorage.getItem("authToken");

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userEmail = userData.email || "user@email.com";
  const userName = userData.name || "Artist Name";

  // ✅ Alert helper function
  const showAlert = (config) => {
    setAlertConfig({
      isOpen: true,
      type: config.type || "info",
      title: config.title || "",
      message: config.message || "",
      confirmText: config.confirmText || "OK",
      showCancel: config.showCancel || false,
      onConfirm: config.onConfirm || null,
      autoClose: config.autoClose || false,
      duration: config.duration || 3000
    });
  };

  const closeAlert = () => {
    setAlertConfig({ ...alertConfig, isOpen: false });
  };

  useEffect(() => {
    const fetchArtistProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/myProfileWithExperiences`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Artist profile fetched:", result.data);
          setArtist(result.data);

          if (result.data.image) {
            setPreviewImage(result.data.image);
          }
        } else if (response.status === 404) {
          console.log("No artist profile found - user can create one");
          setArtist(null);
          setError(null);
        } else if (response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("authToken");

          showAlert({
            type: "error",
            title: "Session Expired",
            message: "Your session has expired. Please login again.",
            confirmText: "Login",
            onConfirm: () => {
              window.location.href = "/login";
            }
          });
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching artist profile:", err);
        setError("Failed to load artist profile");

        showAlert({
          type: "error",
          title: "Failed to Load Profile",
          message: "Unable to load your artist profile. Please try again.",
          confirmText: "Retry",
          onConfirm: () => {
            window.location.reload();
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArtistProfile();
  }, [token]);

  const handleProfileCreated = (newArtist) => {
    console.log("✅ Artist profile created:", newArtist);
    setArtist(newArtist);
    setshowAddSectionForm(false);
    if (newArtist.image) {
      setPreviewImage(newArtist.image);
    }
  };

  const handleUpdate = (updatedLinks) => {
    console.log("Updated social links:", updatedLinks);
    setArtist(prev => ({
      ...prev,
      ...updatedLinks
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlert({
          type: "warning",
          title: "File Too Large",
          message: "File must be less than 5MB. Please choose a smaller image.",
          confirmText: "OK"
        });
        return;
      }
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setBannerImage(imageURL);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) {
      showAlert({
        type: "warning",
        title: "No Image Selected",
        message: "Please select an image to upload.",
        confirmText: "OK"
      });
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(`${API_BASE_URL}/updateMyProfile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Profile image saved:", result.data);
        setArtist(result.data);
        setSelectedImage(null);

        showAlert({
          type: "success",
          title: "Profile Updated!",
          message: "Your profile image has been saved successfully.",
          confirmText: "Great!",
          autoClose: true,
          duration: 3000
        });
      } else {
        throw new Error("Failed to save image");
      }
    } catch (err) {
      console.error("Error saving image:", err);

      showAlert({
        type: "error",
        title: "Upload Failed",
        message: `Failed to save image: ${err.message}`,
        confirmText: "OK"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Edit Experience
  const handleEditExperience = (exp) => {
    setEditingExperienceId(exp.id);
    setEditedExperience({
      filmTitle: exp.filmTitle,
      roleInFilm: exp.roleInFilm,
      durationFrom: exp.durationFrom,
      durationTo: exp.durationTo,
      description: exp.description,
      awards: exp.awards,
      link: exp.link
    });
  };

  // ✅ Save Experience
  const handleSaveExperience = async () => {
    if (!editedExperience.filmTitle || !editedExperience.roleInFilm) {
      showAlert({
        type: "warning",
        title: "Missing Fields",
        message: "Please fill in Film Title and Role.",
        confirmText: "OK"
      });
      return;
    }

    setIsEditingSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/updateExperience/${editingExperienceId}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedExperience)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Experience updated:", result.data);

        // Update artist state
        setArtist(prev => ({
          ...prev,
          experiences: prev.experiences.map(exp =>
            exp.id === editingExperienceId ? result.data : exp
          )
        }));

        setEditingExperienceId(null);

        showAlert({
          type: "success",
          title: "Experience Updated!",
          message: "Your experience has been updated successfully.",
          confirmText: "Great!",
          autoClose: true,
          duration: 3000
        });
      } else {
        throw new Error("Failed to update experience");
      }
    } catch (err) {
      console.error("Error updating experience:", err);
      showAlert({
        type: "error",
        title: "Update Failed",
        message: `Failed to update experience: ${err.message}`,
        confirmText: "OK"
      });
    } finally {
      setIsEditingSaving(false);
    }
  };

  // ✅ Delete Experience
  const handleDeleteExperience = (expId) => {
    showAlert({
      type: "warning",
      title: "Delete Experience?",
      message: "Are you sure you want to delete this experience? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      showCancel: true,
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/deleteExperience/${expId}`, {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            console.log("✅ Experience deleted");

            // Update artist state
            setArtist(prev => ({
              ...prev,
              experiences: prev.experiences.filter(exp => exp.id !== expId)
            }));

            showAlert({
              type: "success",
              title: "Experience Deleted!",
              message: "Your experience has been deleted successfully.",
              confirmText: "OK",
              autoClose: true,
              duration: 3000
            });
          } else {
            throw new Error("Failed to delete experience");
          }
        } catch (err) {
          console.error("Error deleting experience:", err);
          showAlert({
            type: "error",
            title: "Delete Failed",
            message: `Failed to delete experience: ${err.message}`,
            confirmText: "OK"
          });
        }
      }
    });
  };

  // ✅ Edit About
  const handleEditAbout = () => {
    setEditingAbout(true);
    setEditedAbout(artist.description || "");
  };

  // ✅ Save About
  const handleSaveAbout = async () => {
    setIsEditingSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/updateMyProfile`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: editedAbout })
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ About updated:", result.data);

        setArtist(result.data);
        setEditingAbout(false);

        showAlert({
          type: "success",
          title: "About Updated!",
          message: "Your about section has been updated successfully.",
          confirmText: "Great!",
          autoClose: true,
          duration: 3000
        });
      } else {
        throw new Error("Failed to update about");
      }
    } catch (err) {
      console.error("Error updating about:", err);
      showAlert({
        type: "error",
        title: "Update Failed",
        message: `Failed to update about: ${err.message}`,
        confirmText: "OK"
      });
    } finally {
      setIsEditingSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#a92b4e] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-blue-50 p-6 rounded-lg">
          <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-blue-600 mb-4">Complete your artist profile to get started!</p>
          <button
            onClick={() => setshowAddSectionForm(true)}
            className="bg-[#a92b4e] text-white px-6 py-2 rounded-lg hover:bg-[#891737] transition"
          >
            + Create Artist Profile
          </button>

          {showAddSectionForm && (
            <AddSectionForm
              onClose={() => setshowAddSectionForm(false)}
              onProfileCreated={handleProfileCreated}
              isCreatingProfile={true}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ Custom Alert Component */}
      <AlertBox
        {...alertConfig}
        onClose={closeAlert}
      />

      <section className="relative pt-40 pb-14 border-b border-gray-200">
        <input
          type="file"
          accept="image/*"
          id="bannerInput"
          onChange={handleBannerChange}
          className="hidden"
        />

        <img
          src={bannerImage}
          alt="cover-image"
          className="w-full rounded-md absolute top-0 left-0 z-0 h-60 object-cover"
        />

        <div className="absolute top-4 right-4 z-10">
          <label
            htmlFor="bannerInput"
            className="bg-black/40 text-white backdrop-blur-sm text-sm px-4 py-1 rounded shadow cursor-pointer hover:bg-black/60 transition"
          >
            Edit Banner
          </label>
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col justify-center sm:justify-start relative z-10 mb-5">
            <div className="relative w-40 h-40">
              <img
                src={previewImage || "/placeholderProfile.jpg"}
                alt="Profile Preview"
                className="w-full h-full border-4 border-white rounded-full object-cover shadow"
              />
              <label className="absolute bottom-0 right-0 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-2 rounded-full cursor-pointer hover:bg-black/70 transition">
                <Pencil />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {selectedImage && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="mt-3 bg-black text-white px-4 py-2 rounded transition disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : null}
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1">
                {artist.fullName}{" "}
                <span className="text-xl font-semibold text-gray-400">
                  ({artist.role})
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-[-8px]">
              {artist.facebook && (
                <a
                  href={artist.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-3 bg-gray-900 text-white hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10"
                >
                  <FaFacebookF
                    className="text-white hover:text-indigo-600 transition"
                    size={18}
                  />
                </a>
              )}
              {artist.instagram && (
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-3 bg-gray-900 hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10"
                >
                  <FaInstagram
                    className="text-white hover:text-indigo-600 transition"
                    size={18}
                  />
                </a>
              )}
              {artist.twitter && (
                <a
                  href={artist.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-3 bg-gray-900 hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10"
                >
                  <FaTwitter
                    className="text-white hover:text-indigo-600 transition"
                    size={18}
                  />
                </a>
              )}
              {artist.imdbLink && (
                <a
                  href={artist.imdbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-3 bg-black hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10"
                >
                  <FaImdb
                    className="text-white hover:text-indigo-600 transition"
                    size={18}
                  />
                </a>
              )}
              {artist.linkedIn && (
                <a
                  href={artist.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-3 bg-gray-900 hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10"
                >
                  <FaLinkedinIn
                    className="text-white hover:text-indigo-600 transition"
                    size={18}
                  />
                </a>
              )}
              <button
                onClick={() => setShowForm(true)}
                className="rounded-full p-3 hover:p-5 bg-gray-900 hover:bg-indigo-100 transition-all duration-500 shadow-md z-0"
              >
                <Pencil
                  className="text-white hover:text-indigo-600 transition"
                  size={18}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setshowAddSectionForm(true)}
              className="text-[#a92b43] border text-xs hover:bg-[#a92b43] duration-300 transition transform hover:text-white border-[#a92b43] bg-[#a92b4214] py-1 px-2 rounded-full"
            >
              {artist ? "Edit profile section" : "Add profile section"}
            </button>
          </div>

          {showAddSectionForm && (
            <AddSectionForm
              onClose={() => setshowAddSectionForm(false)}
              onProfileCreated={handleProfileCreated}
              artist={artist}
              isCreatingProfile={false}
            />
          )}

          <div className="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <label className="text-gray-700 font-medium">
                  Willing to work as
                </label>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 text-sm"
                  value={artist.role || ""}
                  disabled
                >
                  <option value="">{artist.role}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-gray-700 font-medium">
                  Specialized in
                </label>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 text-sm"
                  defaultValue=""
                  disabled
                >
                  <option value="">-</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <ul className="flex items-center max-sm:justify-center max-sm:flex-wrap gap-2.5 text-sm font-medium text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-gray-800">{artist.district}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-800">{artist.email}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-800">{artist.phoneNumber}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-800 cursor-pointer">
                    <Pencil className="text-gray-600" size={20} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ About Section with Edit/Delete */}
        <div className="px-8 mt-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h1 className="text-gray-800 font-semibold text-lg">About</h1>
              <div className="flex items-center gap-2">
                {editingAbout ? (
                  <>
                    <button
                      onClick={() => setEditingAbout(false)}
                      className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAbout}
                      disabled={isEditingSaving}
                      className="px-3 py-1 text-sm font-medium text-white bg-[#a92b4e] hover:bg-[#891737] rounded transition disabled:opacity-50"
                    >
                      {isEditingSaving ? "Saving..." : "Save"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditAbout}
                    className="rounded-full p-2 hover:bg-gray-100 transition"
                    title="Edit Bio"
                  >
                    <Pencil className="text-gray-600" size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="p-5">
              {editingAbout ? (
                <textarea
                  value={editedAbout}
                  onChange={(e) => setEditedAbout(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92b4e] resize-none"
                  rows="4"
                  placeholder="Write your bio..."
                />
              ) : (
                <p className="text-sm text-gray-600 mb-3">
                  {artist.description || "No bio added yet"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Experience Section with Edit/Delete */}
        <div className="px-8 mt-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h1 className="text-gray-800 font-semibold text-lg">Experience</h1>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setshowAddSectionForm(true)}
                  className="rounded-full p-2 hover:bg-gray-100 transition"
                  title="Add Experience"
                >
                  <IoMdAddCircleOutline className="text-gray-600" size={24} />
                </button>
              </div>
            </div>

            <div className="p-5">
              {artist.experiences && artist.experiences.length > 0 ? (
                artist.experiences.map((exp) => (
                  <div key={exp.id} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                    {editingExperienceId === exp.id ? (
                      // ✅ Edit Mode
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editedExperience.filmTitle}
                          onChange={(e) => setEditedExperience({ ...editedExperience, filmTitle: e.target.value })}
                          placeholder="Film Title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92b4e]"
                        />
                        <input
                          type="text"
                          value={editedExperience.roleInFilm}
                          onChange={(e) => setEditedExperience({ ...editedExperience, roleInFilm: e.target.value })}
                          placeholder="Role"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92b4e]"
                        />
                        <textarea
                          value={editedExperience.description}
                          onChange={(e) => setEditedExperience({ ...editedExperience, description: e.target.value })}
                          placeholder="Description"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92b4e] resize-none"
                          rows="2"
                        />
                        <input
                          type="text"
                          value={editedExperience.awards || ""}
                          onChange={(e) => setEditedExperience({ ...editedExperience, awards: e.target.value })}
                          placeholder="Awards (optional)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92b4e]"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingExperienceId(null)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveExperience}
                            disabled={isEditingSaving}
                            className="flex-1 px-3 py-2 bg-[#a92b4e] text-white rounded-lg hover:bg-[#891737] transition disabled:opacity-50"
                          >
                            {isEditingSaving ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      // ✅ View Mode
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <h2 className="text-lg font-semibold text-gray-800">
                            <span className="text-orange-500">{exp.filmTitle}</span>
                          </h2>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditExperience(exp)}
                              className="p-2 hover:bg-gray-100 rounded transition"
                              title="Edit"
                            >
                              <Pencil className="text-gray-600" size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="p-2 hover:bg-red-100 rounded transition"
                              title="Delete"
                            >
                              <Trash2 className="text-red-600" size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                          {new Date(exp.durationFrom).getFullYear()} – {exp.durationTo ? new Date(exp.durationTo).getFullYear() : 'Present'}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="py-1">
                            <span className="font-bold">Role:</span> {exp.roleInFilm}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-gray-100">
                            Film: {exp.filmTitle}
                          </span>
                          {exp.awards && (
                            <span className="px-2 py-1 rounded-full bg-gray-100">
                              {exp.awards}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No experiences added yet</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <UpdateSocialLinks
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onUpdate={handleUpdate}
        artist={artist}
      />
    </div>
  );
};

export default ArtistProfile;
