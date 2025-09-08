import React, { useState } from "react";

const AddArtistForm = ({ onClose }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    district: "",
    email: "",
    phone: "",
    imdb: "",
    bestFilm: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { placeholder, value } = e.target;
    const key = placeholder
      .toLowerCase()
      .replace(/ /g, "")
      .replace("e-mail", "email")
      .replace("imbdlink", "imdb");
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    // API call here if needed
    onclose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex pb-10 flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
          {/* Upload Image */}
          <div className="flex relative flex-col justify-center self-stretch bg-gray-100 h-[70px] min-h-[70px] rounded-[16px] overflow-hidden w-[70px] cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleImageChange}
            />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover rounded-[16px] z-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center z-0">
                <span className="text-xs text-gray-400 group-hover:text-gray-600 text-center px-2">
                  Click to Upload
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col self-stretch my-auto min-w-[240px]">
            <div className="text-base text-gray-800">Add Artist</div>
            <div className="mt-2 text-sm text-gray-500">
              Fill the form to register the artist with us.
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {[
            "First name",
            "Last name",
            "Role",
            "District",
            "E-mail",
            "Phone",
            "IMBD Link",
            "Best Film",
          ].map((field) => (
            <div key={field} className="relative">
              <input
                type="text"
                placeholder={field}
                onChange={handleInputChange}
                className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary peer"
              />
              <label
                className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem]"
              >
                {field}
              </label>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Description"
            onChange={handleInputChange}
            className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0"
          />
          <label
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem]"
          >
            Description
          </label>
        </div>

        {/* Action Buttons */}
        <div className="sm:flex sm:flex-row-reverse flex gap-4">
          <button
            onClick={handleSubmit}
            className="w-fit rounded-lg text-sm px-5 py-2 h-[50px] border bg-[#a92b43] hover:bg-[#ff8299] text-white transition-all duration-300"
            type="button"
          >
            Save changes
          </button>
          <button
            onClick={onClose}
            className="w-fit rounded-lg text-sm px-5 py-2 h-[50px] border border-primary text-primary bg-transparent focus:ring-4 focus:ring-gray-100"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddArtistForm;
