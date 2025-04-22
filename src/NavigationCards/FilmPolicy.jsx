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
    <div className="min-h-screen w-full bg-white grid grid-cols-1 xl:grid-cols-2 gap-6 px-4 xl:px-16 py-10">
      
      {/* LEFT BLOCK (TABLES) */}
      <div className="flex flex-col gap-10">
        <FilmSubsidyTable />
        <div className="hidden lg:block">
          <InvestmentSubsidyTable />
        </div>
      </div>
      {/* FILM SUBSIDY SECTION FOR SMALL SCREENS */}
      <div className="xl:hidden col-span-full">
        <FilmSubsidy />
      </div>

      {/* RIGHT BLOCK (LOGIN or FORM) */}
      <div className="relative flex items-center justify-center">
        {/* Background Reel - full opacity + shadow */}
        <img
          src={Reelfilm}
          alt="Reel Film"
          className="absolute top-10 right-10 w-64 md:w-96 opacity-100 drop-shadow-lg pointer-events-none z-0"
        />

        {!isLoggedIn ? (
          <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Login to Apply for NOC</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
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
          <div className="relative z-10 w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Film Policy - NOC Application
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="applicant"
                placeholder="Applicant Name"
                value={formData.applicant}
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-xl focus:outline-none col-span-full md:col-span-1"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Film Title"
                value={formData.title}
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-xl focus:outline-none col-span-full md:col-span-1"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Shooting Location"
                value={formData.location}
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-xl focus:outline-none col-span-full md:col-span-1"
                required
              />
              <input
                type="text"
                name="dates"
                placeholder="Shooting Dates (e.g. 10 Apr - 15 Apr)"
                value={formData.dates}
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-xl focus:outline-none col-span-full md:col-span-1"
                required
              />
              <textarea
                name="remarks"
                placeholder="Purpose / Remarks"
                value={formData.remarks}
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-xl focus:outline-none col-span-full"
                rows={4}
                required
              />
              <input
                type="file"
                name="script"
                accept=".pdf,.doc,.docx"
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-xl col-span-full"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition col-span-full"
              >
                Submit NOC Application
              </button>
            </form>
          </div>
        )}
      </div>

      
    </div>
  );
}
