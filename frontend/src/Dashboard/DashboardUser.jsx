import React, { useEffect, useState } from "react";
import "../App.css";
import Logo1 from "/src/assets/Logo1.png";
import UserAvatar from "/src/assets/UserAvtar.svg";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ApplyNOCForm from "../NavigationCards/ShootingPermissionFoam";
import ArtistRegistrationForm from "../Dashboard/AddArtistForm";
import VendorRegistrationForm from "../Dashboard/VendorForm";
import ArtistProfile from "./ArtistProfile";
import FilmmakerOverview from "./FilmmakerOverview";
import VendorDashboard from "./VendorDashboard";
import AlertBox from "../Components/AlertBox"; // ✅ Import AlertBox

const UserDashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [activeSection, setActiveSection] = useState("Overview");
  const [nocList, setNocList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  // ✅ Alert helper function
  const showAlert = (config) => {
    setAlertConfig({
      isOpen: true,
      type: config.type || "info",
      title: config.title || "",
      message: config.message || "",
      confirmText: config.confirmText || "OK",
      cancelText: config.cancelText || "Cancel",
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
    const userDataStr = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");
    
    console.log('UserDashboard - Token:', token ? 'Present' : 'Missing');
    console.log('UserDashboard - User Data:', userDataStr);

    if (!token || !userDataStr) {
      console.error('No auth data found in UserDashboard');
      
      // ✅ Show alert before redirect
      showAlert({
        type: "error",
        title: "Authentication Required",
        message: "Please login to access your dashboard.",
        confirmText: "Login",
        onConfirm: () => {
          navigate("/login", { replace: true });
        }
      });
      return;
    }

    try {
      const userData = JSON.parse(userDataStr);
      console.log('UserDashboard - Parsed User:', userData);

      if (userData?.role) {
        setUserRole(userData.role);
        setUserName(userData.name || userData.email);
        console.log('User role set to:', userData.role);
      } else {
        console.error('User data missing role field:', userData);
        
        // ✅ Show alert for missing role
        showAlert({
          type: "error",
          title: "Invalid User Data",
          message: "User role information is missing. Please login again.",
          confirmText: "Login",
          onConfirm: () => {
            navigate("/login", { replace: true });
          }
        });
        return;
      }

      const savedNOCs = JSON.parse(localStorage.getItem("nocApplications")) || [];
      setNocList(savedNOCs);
      
    } catch (error) {
      console.error('Failed to parse user data:', error);
      
      // ✅ Show alert for parse error
      showAlert({
        type: "error",
        title: "Error Loading Profile",
        message: "Failed to load your profile data. Please login again.",
        confirmText: "Login",
        onConfirm: () => {
          navigate("/login", { replace: true });
        }
      });
      return;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    // ✅ Show confirmation alert before logout
    showAlert({
      type: "warning",
      title: "Logout Confirmation",
      message: "Are you sure you want to logout?",
      confirmText: "Yes, Logout",
      cancelText: "Cancel",
      showCancel: true,
      onConfirm: () => {
        // Clear all auth data
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userData");
        
        // ✅ Show success message then redirect
        showAlert({
          type: "success",
          title: "Logged Out",
          message: "You have been successfully logged out.",
          confirmText: "OK",
          autoClose: true,
          duration: 2000,
          onConfirm: () => {
            navigate("/login", { replace: true });
          }
        });
        
        // Fallback redirect after 2 seconds
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    });
  };

  const handleSubmitNOC = (newNOC) => {
    const updatedNOC = { ...newNOC, status: "Submitted" };
    const updated = [...nocList, updatedNOC];
    setNocList(updated);
    localStorage.setItem("nocApplications", JSON.stringify(updated));
    setActiveSection("Overview");
    
    // ✅ Show success alert
    showAlert({
      type: "success",
      title: "NOC Submitted!",
      message: "Your NOC application has been submitted successfully.",
      confirmText: "Great!",
      autoClose: true,
      duration: 3000
    });
  };

  const handleArtistClick = () => {
    setActiveSection("Artist Registration");
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
        return <FilmmakerOverview nocList={nocList} />;
      } else if (userRole === "artist") {
        return <ArtistProfile />;
      } else if (userRole === "vendor") {
        return <VendorDashboard />;
      }
    }
    if (activeSection === "Apply NOC") {
      return <ApplyNOCForm onSubmit={handleSubmitNOC} />;
    }
    if (activeSection === "Artist Registration") {
      return <ArtistRegistrationForm />;
    }
    if (activeSection === "Vendor Registration") {
      return <VendorRegistrationForm />;
    }

    return <p className="text-gray-600">Invalid section</p>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92b43] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userRole) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#f9fafb] font-sans">
      {/* ✅ Custom Alert Component */}
      <AlertBox
        {...alertConfig}
        onClose={closeAlert}
      />

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

        {/* User Info Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={UserAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-[#a92b43] object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-[#e7000b] rounded-lg hover:bg-[#c1000a] transition-all duration-200 flex items-center justify-center"
          >
            <IoIosLogOut className="mr-2 text-lg" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-6 bg-[#f9fafb] shadow-sm border-b border-gray-200">
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
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
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
