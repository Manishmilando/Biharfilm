import React, { useState } from "react";

const AddArtistForm = ({onclose}) => {
    const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };
    return (
       <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

<div className="bg-white p-10 rounded-lg shadow-lg">
    
<div className="flex pb-10 flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
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

      <div className="flex flex-col self-stretch my-auto min-w-[240px]">
        <div className="text-base text-gray-800">Add Artist</div>
        <div className="mt-2 text-sm text-gray-500">
          Fill the form to register the artist with us.
        </div>
      </div>
    </div>
  

  <div className="grid grid-cols-2 gap-6 mb-10">
    <div id="input" className="relative">
      <input
        type="text"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="First name"
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        First name
      </label>
    </div>

    <div id="input" className="relative">
      <input
        type="text"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="Last name"
        value=""
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        Last name
      </label>
    </div>

    <div id="input" className="relative">
      <input
        type="text"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="Role"
        value=""
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        Role
      </label>
    </div>

    <div id="input" className="relative">
      <input
        type="text"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="District Name"
        value=""
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        District
      </label>
    </div>

    <div id="input" className="relative">
      <input
        type="text"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="E-mail"
        value=""
        disabled=""
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        E-mail
      </label>
    </div>

    <div id="input" className="relative">
      <input
        type="phone"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="Phone"
        value=""
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        Phone
      </label>
    </div>

    <div id="input" className="relative">
      <input
        type="phone"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="IMBD Link"
        value=""
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        IMBD Link
      </label>
    </div>

    <div id="input" className="relative">
      <input
        type="phone"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="Best Film"
        value=""
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        Best Film
      </label>
    </div>
  </div>
  <div id="input" className="relative">
    <div className="mb-6">
        <input
        type="phone"
        id="floating_outlined"
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-[#a92b43]/20 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder="Desciption"
        value=""
      />
      <label
        for="floating_outlined"
        className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        Desciption
      </label>
        </div>
        </div>

  <div className="sm:flex sm:flex-row-reverse flex gap-4">
    <button
      className="w-fit rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border bg-[#a92b43] hover:bg-[#ff8299] focus:bg-[#ff9eb0] border-[#a92b43]-violet- text-white focus:ring-4 focus:ring-[#a92b43]/20 hover:ring-4 hover:ring-[#a92b4250] transition-all duration-300"
      type="button"
    >
      <div className="flex gap-2 items-center">Save changes</div>
    </button>
    <button
      onClick={onclose}
      className="w-fit rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border bg-transparent border-primary text-primary focus:ring-4 focus:ring-gray-100"
      type="button"
    >
      Cancel
    </button>
  </div>
</div>
 

        </div>
    )
}

export default AddArtistForm
