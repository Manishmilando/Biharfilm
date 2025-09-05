import React, { useEffect, useState } from "react";
import "../App.css";
import Logo1 from "/src/assets/Logo1.png";
import UserAvatar from "/src/assets/UserAvtar.svg";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ApplyNOCForm from "../NavigationCards/ShootingPermissionFoam";
import ArtistRegistrationForm from "../NavigationCards/AddArtistForm";
import VendorRegistrationForm from "../NavigationCards/VendorForm ";
import ArtistProfile from "./ArtistProfile";
import FilmmakerOverview from "./FilmmakerOverview"; // ✅ new import

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
        return <p className="text-gray-700 text-lg">🛍️ Manage your vendor submissions and supplies.</p>;
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
                    className={`w-full px-4 py-2 flex items-center text-sm font-semibold rounded-lg transition-all duration-200 ${item === activeSection
                        ? "text-[#a92b43] bg-[#f4e4e8]"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                    onClick={
                      item === "Artist Registration"
                        ? handleArtistClick
                        : () => setActiveSection(item)
                    }
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout at Bottom */}
        <div className="p-4 pb-8 pl-16 border-gray-200">
          <button
            onClick={handleLogout}
            className="w-32 px-4 py-2 text-sm font-semibold text-white bg-[#e7000b] rounded-lg hover:bg-[#c1000a] transition-all duration-200"
          >
            <IoIosLogOut className="inline mr-2 text-lg" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-6 bg-[#f9fafb] shadow-sm border-gray-300">
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
          <div className="flex items-center gap-4">
            <img
              src={UserAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-[#a92b43] object-cover"
            />
          </div>
        </div>

        {/* Dynamic Section Content */}
        <div className="p-6">{renderSection()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
