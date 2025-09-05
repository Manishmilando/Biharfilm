import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const AddSectionForm = ({ onClose, onSave }) => {
  const [openSection, setOpenSection] = useState(null);
  const [aboutUs, setAboutUs] = useState("");
  const [willingToWork, setWillingToWork] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [contactDetails, setContactDetails] = useState({
    name: "", 
    email: "",
    phone: "",
    district: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    imdb: "",
  });
  const [experience, setExperience] = useState({
    company: "",
    role: "",
    years: "",
  });

  const calculateDuration = (from, to) => {
    if (!from || !to) return "";

    const start = new Date(from);
    const end = new Date(to);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years > 0 ? years + " years " : ""}${
      months > 0 ? months + " months" : ""
    }`.trim();
  };

  const handleSubmit = () => {
    if (openSection === "about") {
      onSave({ aboutUs });
      console.log(aboutUs);
    } else if (openSection === "experience") {
      onSave({ experience });
    } else if (openSection === "willing") {
      onSave({ willingToWork });
    } else if (openSection === "social") {
      onSave({ socialLinks });
    } else if (openSection === "contact") {
      onSave({ contactDetails });
    }
    // Reset form fields after saving the deatails from the form
    setAboutUs("");
    setWillingToWork("");
    setSpecialization("");
    setContactDetails({ email: "", phone: "", district: "" });
    setSocialLinks({
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      imdb: "",
    });
    setExperience({ company: "", role: "", years: "" });
    // Close the form after the submission
    onClose();
    setOpenSection(null);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex justify-center items-center">
        <div className="bg-white p-6 rounded-2xl w-[400px] ">
          <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
          <div className="border-b border-gray-300 py-2">
            <button
              onClick={() =>
                setOpenSection(openSection === "contact" ? null : "contact")
              }
              className="w-full text-left "
            >
              + Add Your Contact Details
            </button>

            <AnimatePresence>
              {openSection === "contact" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden p-3"
                >

                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      Enter Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={contactDetails.name || ""}
                      onChange={(e) =>
                        setContactDetails({
                          ...contactDetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      placeholder="+91 12345 67890"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={contactDetails.phone || ""}
                      onChange={(e) =>
                        setContactDetails({
                          ...contactDetails,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="example@mail.com"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={contactDetails.email || ""}
                      onChange={(e) =>
                        setContactDetails({
                          ...contactDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      District
                    </label>
                    <input
                      type="text"
                      placeholder="Patna"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={contactDetails.district || ""}
                      onChange={(e) =>
                        setContactDetails({
                          ...contactDetails,
                          district: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="mt-2 bg-black text-white px-4 py-1 rounded-lg"
                  >
                    Save
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-b border-gray-300 py-2">
            <button
              onClick={() =>
                setOpenSection(openSection === "social" ? null : "social")
              }
              className="w-full text-left"
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
                  {/* Instagram */}
                  <div className="flex items-center">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      Instagram
                    </label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/yourprofile"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={socialLinks.instagram || ""}
                      onChange={(e) =>
                        setSocialLinks({
                          ...socialLinks,
                          instagram: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Facebook */}
                  <div className="flex items-center ">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      Facebook
                    </label>
                    <input
                      type="url"
                      placeholder="https://facebook.com/yourprofile"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={socialLinks.facebook || ""}
                      onChange={(e) =>
                        setSocialLinks({
                          ...socialLinks,
                          facebook: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Twitter / X */}
                  <div className="flex items-center ">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      Twitter
                    </label>
                    <input
                      type="url"
                      placeholder="https://twitter.com/yourprofile"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={socialLinks.twitter || ""}
                      onChange={(e) =>
                        setSocialLinks({
                          ...socialLinks,
                          twitter: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center ">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={socialLinks.linkedin || ""}
                      onChange={(e) =>
                        setSocialLinks({
                          ...socialLinks,
                          linkedin: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* IMDb */}
                  <div className="flex items-center ">
                    <label className="w-24 text-xs text-gray-700 font-medium">
                      IMDb
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.imdb.com/name/nmXXXXXXX/"
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={socialLinks.imdb || ""}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, imdb: e.target.value })
                      }
                    />
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSubmit}
                    className="mt-2 bg-black text-white px-4 py-1 rounded-lg"
                  >
                    Save
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Willing to Work and Specialized in Card */}
          <div className="border-b border-gray-300 py-2">
            <button
              onClick={() =>
                setOpenSection(openSection === "willing" ? null : "willing")
              }
              className="w-full text-left"
            >
              + Add willing to work and Specialized in
            </button>

            <AnimatePresence>
              {openSection === "willing" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden p-3 space-y-4"
                >
                  {/* Willing to Work as */}
                  <div className="flex items-center gap-3">
                    <label className="w-40 text-gray-700 font-medium">
                      Willing to work as
                    </label>
                    <select
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={willingToWork}
                      onChange={(e) => setWillingToWork(e.target.value)}
                    >
                      <option value="" disabled>
                        Select role
                      </option>
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

                  {/* Specialized in */}
                  <div className="flex items-center gap-3">
                    <label className="w-40 text-gray-700 font-medium">
                      Specialized in
                    </label>
                    <select
                      className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                    >
                      <option value="" disabled>
                        Select specialization
                      </option>
                      <option value="playback">Playback Singing</option>
                      <option value="lyricist">Lyricist</option>
                      <option value="composer">Composer</option>
                      <option value="music_director">Music Director</option>
                      <option value="screenplay">Screenplay Writing</option>
                      <option value="dialogue">Dialogue Writing</option>
                      <option value="choreography">Choreography</option>
                      <option value="vfx">VFX / Editing</option>
                      <option value="cinematography">Cinematography</option>
                    </select>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSubmit}
                    className="mt-2 bg-black text-white px-4 py-1 rounded-lg"
                  >
                    Save
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About Us Card */}
          <div className="border-b border-gray-300 py-2">
            <button
              onClick={() =>
                setOpenSection(openSection === "about" ? null : "about")
              }
              className="w-full text-left "
            >
              + Add About Us
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
                    value={aboutUs}
                    onChange={(e) => setAboutUs(e.target.value)}
                  />
                  <button
                    onClick={handleSubmit}
                    className="mt-2 bg-black text-white px-4 py-1 rounded-lg"
                  >
                    Save
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Experience Card */}
          <div className="">
            <button
              onClick={() =>
                setOpenSection(
                  openSection === "experience" ? null : "experience"
                )
              }
              className="w-full text-left py-2 "
            >
              + Add Experience
              <span className="text-gray-500 text-sm">
                {experience.durationFrom && experience.durationTo
                  ? `(${experience.calculatedDuration})`
                  : ""}
              </span>
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
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        filmTitle: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Role in Film (Actor, Singer, etc.)"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={experience.roleInFilm}
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        roleInFilm: e.target.value,
                      })
                    }
                  />

                  {/* Duration Inputs */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 font-medium mb-1">
                        From
                      </label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        value={experience.durationFrom}
                        onChange={(e) => {
                          const updated = {
                            ...experience,
                            durationFrom: e.target.value,
                          };
                          setExperience({
                            ...updated,
                            calculatedDuration: calculateDuration(
                              updated.durationFrom,
                              updated.durationTo
                            ),
                          });
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 font-medium mb-1">
                        To
                      </label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        value={experience.durationTo}
                        onChange={(e) => {
                          const updated = {
                            ...experience,
                            durationTo: e.target.value,
                          };
                          setExperience({
                            ...updated,
                            calculatedDuration: calculateDuration(
                              updated.durationFrom,
                              updated.durationTo
                            ),
                          });
                        }}
                      />
                    </div>
                  </div>

                  {/* Show Calculated Duration */}
                  {experience.calculatedDuration && (
                    <p className="text-sm text-gray-600">
                      Duration: {experience.calculatedDuration}
                    </p>
                  )}

                  <textarea
                    placeholder="Description"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    rows="2"
                    value={experience.description}
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        description: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Awards (optional)"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={experience.awards}
                    onChange={(e) =>
                      setExperience({ ...experience, awards: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Link (optional)"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    value={experience.link}
                    onChange={(e) =>
                      setExperience({ ...experience, link: e.target.value })
                    }
                  />

                  <button
                    onClick={handleSubmit}
                    className="mt-2 w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Experience
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Close Button */}
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
