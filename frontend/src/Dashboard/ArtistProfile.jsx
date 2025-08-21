import React, { useState } from "react";
import { Pencil } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import UpdateSocialLinks from "./UpdateSocialLinks";
import { GrSettingsOption } from "react-icons/gr";
import { FaImdb } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddSectionForm from "./AddSectionForm";

const ArtistProfile = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAddSectionForm, setshowAddSectionForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(
    "/artistBanner.jpg"
  );

  const handleUpdate = (updatedLinks) => {
    console.log("Updated social links:", updatedLinks);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  const handleSave = () => {
    if (!selectedImage) return alert("No image selected");

    // TODO: Replace this with API upload logic
    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    console.log("Image ready to upload:", selectedImage);
    alert("Profile image saved (simulated)");
  };
  return (
    <div>
      <section class="relative pt-40 pb-14 border-b border-gray-200">
        <input
          type="file"
          accept="image/*"
          id="bannerInput"
          onChange={handleBannerChange}
          className="hidden"
        />

        {/* Image Display with Existing Styling */}
        <img
          src={bannerImage}
          alt="cover-image"
          className="w-full rounded-md absolute top-0 left-0 z-0 h-60 object-cover"
        />

        {/* Button to Trigger Upload */}
        <div className="absolute top-4 right-4 z-10">
          <label
            htmlFor="bannerInput"
            className="bg-black/40 text-white backdrop-blur-sm text-sm px-4 py-1 rounded shadow cursor-pointer hover:bg-black/60 transition"
          >
            Edit Banner
          </label>
        </div>
        <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col justify-center sm:justify-start relative z-10 mb-5">
            <div className="relative w-40 h-40">
              <img
                src={
                  previewImage ||
                  "/placeholderProfile.jpg"
                }
                alt="Profile Preview"
                className="w-full h-full border-4 border-white rounded-full object-cover shadow"
              />
              <label className="absolute bottom-0 right-0 bg-black/40 backdrop-blur-sm  text-white text-xs px-2 py-2 rounded-full cursor-pointer hover:bg-black/70 transition">
                <Pencil />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {previewImage && (
              <button
                onClick={handleSave}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
            )}
          </div>
          <div class="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <div class="block">
              <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-1">
                Manish Kumar{" "}
                <span className="text-xl font-semibold text-gray-400">
                  (Actor)
                </span>
              </h3>
              <p class="font-normal text-base leading-7 text-gray-500"></p>
            </div>

            {/* Social media links Section STARTS here     */}

            <div className="flex items-center gap-[-8px]">
              <button className="rounded-full p-3 bg-gray-900 text-white hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10">
                <FaFacebookF
                  className="text-white hover:text-indigo-600 transition"
                  size={18}
                />
              </button>
              <button className="rounded-full p-3 bg-gray-900 hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10">
                <FaInstagram
                  className="text-white hover:text-indigo-600 transition"
                  size={18}
                />
              </button>
              <button className="rounded-full p-3 bg-gray-900 hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10">
                <FaTwitter
                  className="text-white hover:text-indigo-600 transition"
                  size={18}
                />
              </button>
              <button className="rounded-full p-3 bg-black hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10">
                <FaImdb
                  className="text-white hover:text-indigo-600 transition"
                  size={18}
                />
              </button>
              <button className="rounded-full p-3 bg-gray-900 hover:bg-indigo-100 transition-all duration-500 shadow-md -mr-2 z-10">
                <FaLinkedinIn
                  className="text-white hover:text-indigo-600 transition"
                  size={18}
                />
              </button>
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
            
             {/* Social media links Section END here     */}

          </div>
          <div className="flex items-center gap-2">
        <button
        onClick={() => setshowAddSectionForm(true)}
        className="text-[#a92b43] border text-xs hover:bg-[#a92b43] duration-300 transition transform hover:text-white border-[#a92b43] bg-[#a92b4214] py-1 px-2 rounded-full">Add profile section</button> 
        </div>   

     {showAddSectionForm && (
        <AddSectionForm
          onClose={() => setshowAddSectionForm(false)}
          onSave={handleSave}
        />
      )}

       
          <div class="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
           <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">

                
  {/* Willing to work as STARTS */}
  <div className="flex items-center gap-2">
    <label className="text-gray-700 font-medium">
      Willing to work as
    </label>
    <select
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 text-sm"
      defaultValue=""
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
  <div className="flex items-center gap-2">
    <label className="text-gray-700 font-medium">
      Specialized in
    </label>
    <select
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 text-sm"
      defaultValue=""
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
</div>
 {/* Willing to work as END */}


             {/* Contact section STARTS    */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <ul className="flex items-center max-sm:justify-center max-sm:flex-wrap gap-2.5 text-sm font-medium text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-gray-800">Patna</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-800">manish@gmail.com</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-800">7764993452</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-800">
                    <Pencil className="text-gray-600" size={20} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Contact section END */}
        
      <div className="px-8 mt-5">
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <h1 className="text-gray-800 font-semibold text-lg">About Us</h1>

      <div className="flex items-center gap-2">
        {/* Add Button */}
        <button
          className="rounded-full p-2 hover:bg-gray-100 transition"
          title="Add Experience"
        >
          <IoMdAddCircleOutline className="text-gray-600" size={24} />
        </button>

        {/* Edit Button */}
        <button
          className="rounded-full p-2 hover:bg-gray-100 transition"
          title="Edit Experience"
        >
          <Pencil className="text-gray-600" size={20} />
        </button>
      </div>
    </div>

    {/* Example Experience Item */}
    <div className="p-5">
      
      <p className="text-sm text-gray-600 mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla molestie felis, sed tempus nunc volutpat id. Nunc facilisis, metus iaculis tincidunt dictum, lorem lacus ultrices arcu, sed semper eros risus eu augue. Cras viverra erat nibh, volutpat bibendum eros lobortis id. Praesent vitae erat rhoncus, imperdiet leo at, lacinia nulla.
      </p>      
    </div>
  </div>
</div>

      </section>
      <UpdateSocialLinks
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onUpdate={handleUpdate}
      />
      {/* add experience compoenets */}

      <div className="px-8 mt-5">
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <h1 className="text-gray-800 font-semibold text-lg">Experience</h1>

      <div className="flex items-center gap-2">
        {/* Add Button */}
        <button
          className="rounded-full p-2 hover:bg-gray-100 transition"
          title="Add Experience"
        >
          <IoMdAddCircleOutline className="text-gray-600" size={24} />
        </button>

        {/* Edit Button */}
        <button
          className="rounded-full p-2 hover:bg-gray-100 transition"
          title="Edit Experience"
        >
          <Pencil className="text-gray-600" size={20} />
        </button>
      </div>
    </div>

    {/* Example Experience Item */}
    <div className="p-5">
      <h2 className="text-lg font-semibold text-gray-800">
        Lead Actor – <span className="text-orange-500">The Journey</span>
      </h2>
      <p className="text-sm text-gray-500 mb-1">Jan 2022 – Dec 2023 • 2 yrs</p>
      <p className="text-sm text-gray-600 mb-3">
        Played the lead role in an award-winning film, exploring the theme of resilience and hope.
      </p>

      {/* Extra Film Info */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="px-2 py-1 rounded-full bg-gray-100">
          Role: Actor
        </span>
        <span className="px-2 py-1 rounded-full bg-gray-100">
          Film: The Journey
        </span>
        <span className="px-2 py-1 rounded-full bg-gray-100">
          Award Nominated
        </span>
      </div>
    </div>
  </div>
</div>

      {/* add experience compoenets ends here  */}
    </div>
  );
};

export default ArtistProfile;
