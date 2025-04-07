import React, { useState } from "react";
import Reelfilm from "../assets/Reelfilm.svg";
import FilmSubsidyTable from "../Budget/value.jsx";
import InvestmentSubsidyTable from "../Budget/InvestmentSubsidyTable.jsx";
import FilmSubsidy from "../Budget/FilmSubsidy.jsx";
export default function FilmPolicyNOC() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [formData, setFormData] = useState({
    applicant: "",
    title: "",
    location: "",
    dates: "",
    remarks: "",
    script: null,
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "script") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted NOC Data:", formData);
    alert("NOC Application Submitted Successfully!");
  };

  return (
    <div className="grid grid-cols-2 ">
       <div className=" pl-[6rem] pt-[12rem] scale-x-90"> 
        <FilmSubsidyTable />
      </div>
    <div className="min-h-screen w-full bg-white pl-[6rem] flex items-center justify-center relative overflow-hidden ">
     
      {/* Background SVG */}
      <img
        src={Reelfilm}
        alt="Reel Film"
        className="absolute inset-0 ml-[14rem] mt-16  w-[500px] h-auto pointer-events-none"
      />
    
      {/* Login Section */}
      {!isLoggedIn ? (
        <div className="relative z-10 w-[23rem] h-[20rem] bg-white/30   backdrop-blur-2xl rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Login to Apply for NOC</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-6 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-3xl w-full mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Film Policy - NOC Application</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <input
              type="text"
              name="applicant"
              placeholder="Applicant Name"
              value={formData.applicant}
              onChange={handleFormChange}
              className="px-4 py-2 border rounded-xl focus:outline-none"
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Film Title"
              value={formData.title}
              onChange={handleFormChange}
              className="px-4 py-2 border rounded-xl focus:outline-none"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Shooting Location"
              value={formData.location}
              onChange={handleFormChange}
              className="px-4 py-2 border rounded-xl focus:outline-none"
              required
            />
            <input
              type="text"
              name="dates"
              placeholder="Shooting Dates (e.g. 10 Apr - 15 Apr)"
              value={formData.dates}
              onChange={handleFormChange}
              className="px-4 py-2 border rounded-xl focus:outline-none"
              required
            />
            <textarea
              name="remarks"
              placeholder="Purpose / Remarks"
              value={formData.remarks}
              onChange={handleFormChange}
              className="px-4 py-2 border rounded-xl focus:outline-none"
              rows={4}
              required
            />
            <input
              type="file"
              name="script"
              accept=".pdf,.doc,.docx"
              onChange={handleFormChange}
              className="px-4 py-2 border rounded-xl"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              Submit NOC Application
            </button>
          </form>
          
        </div>
      )}
      
    </div>
    <div className="     pl-30 pb-14 ">
      <InvestmentSubsidyTable />
    </div>
    <div className="mt-18 ml-10">
    <FilmSubsidy />
    </div>
    </div>
  );
}
