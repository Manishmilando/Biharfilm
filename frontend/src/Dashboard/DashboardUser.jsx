import React, { useEffect, useState } from "react";
import "../App.css";
import Logo1 from "/src/assets/Logo1.png";
import UserAvatar from "/src/assets/UserAvtar.svg";
import { useNavigate } from "react-router-dom";
import ApplyNOCForm from "../NavigationCards/ShootingPermissionFoam";
import ArtistRegistrationForm from "./AddArtistForm";
import VendorRegistrationForm from "../Dashboard/VendorForm";
import ArtistProfile from "./ArtistProfile";
import FilmmakerOverview from "./FilmmakerOverview"; // ✅ new import
import VendorOverview from "./VendorOverview";

const UserDashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [activeSection, setActiveSection] = useState("Overview");
  const [nocList, setNocList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.role) {
      setUserRole(userData.role);
    } else {
      alert("No user role found. Redirecting to login.");
      navigate("/login");
    }
    const savedNOCs = JSON.parse(localStorage.getItem("nocApplications")) || [];
    setNocList(savedNOCs);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleSubmitNOC = (newNOC) => {
    const updatedNOC = { ...newNOC, status: "Submitted" };
    const updated = [...nocList, updatedNOC];
    setNocList(updated);
    localStorage.setItem("nocApplications", JSON.stringify(updated));
    setActiveSection("Overview");
  };

  const sidebarItems = {
    filmmaker: ["Overview", "Apply NOC"],
    artist: ["Profile"],
    vendor: ["Overview", "Vendor Registration"],
  };

  const renderSection = () => {
    if (userRole === "artist" && activeSection === "Profile") {
      return <ArtistProfile />;
    }
    if (activeSection === "Overview") {
      if (userRole === "filmmaker") {
        return <FilmmakerOverview nocList={nocList} />; // ✅ use component
      } else if (userRole === "artist") {
        return <ArtistProfile />;
      } else if (userRole === "vendor") {
        return (
          <VendorOverview />
        );
      }
    }
    if (activeSection === "Apply NOC")
      return <ApplyNOCForm onSubmit={handleSubmitNOC} />;
    if (activeSection === "Artist Registration")
      return <ArtistRegistrationForm />;
    if (activeSection === "Vendor Registration")
      return <VendorRegistrationForm />;

    return <p>Invalid section</p>;
  };

  return (
    <div className="flex h-screen bg-[#f9fafb] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-gray-200">
            <img src={Logo1} alt="Logo" className="h-16" />
          </div>

          <nav className="p-4">
            <ul className="space-y-3">
              {(sidebarItems[userRole] || []).map((item, idx) => (
                <li key={idx}>
                  <button
                    className={`w-full px-4 py-2 flex items-center text-sm font-semibold rounded-lg transition-all duration-200 ${
                      item === activeSection
                        ? "text-[#a92b43] bg-[#f4e4e8]"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveSection(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-6 bg-[#f9fafb] shadow-sm border-b border-gray-300">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            
            <div>
              <h2 className="text-black font-bold text-xl">{activeSection}</h2>
              <h2 className="text-sm text-gray-400">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>
            </div>
          </div>

          {/* Right: Search, Avatar, Logout */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md border border-gray-300 text-sm w-60 focus:outline-none focus:ring-2 focus:ring-[#a92b43]"
            />
            <img
              src={UserAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-[#a92b43] object-cover"
            />
            <button
              className="group flex items-center justify-start w-9 h-9 bg-[#e7000b] rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-full active:translate-x-1 active:translate-y-1"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
              </div>
              <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Section Content */}
        <div className="p-6">{renderSection()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
