import React, { useEffect, useState } from "react";
import "../App.css";
import Logo1 from "/src/assets/Logo1.png";
import UserAvatar from "/src/assets/UserAvtar.svg";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProducerRegistration from "./ProducerRegistration";
import ApplyNOCForm from "../NavigationCards/ShootingPermissionFoam";
import ArtistRegistrationForm from "./AddArtistForm";
import VendorRegistrationForm from "./VendorForm";
import ArtistProfile from "./ArtistProfile";
import FilmmakerOverview from "./FilmmakerOverview";
import VendorDashboard from "./VendorDashboard";
import UserProfile from "./UserProfile";
import AlertBox from "../Components/AlertBox";
import { Lock } from "lucide-react";

import axios from "axios";

const UserDashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [producerRegistrationStatus, setProducerRegistrationStatus] = useState(false);

  const [activeSection, setActiveSection] = useState("Overview");
  const [nocList, setNocList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Alert state
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

  // Alert helper function
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
    // Initialize from localStorage first to avoid blank screen
    const userDataStr = localStorage.getItem("user");
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        if (userData) {
          setUserId(userData.id);
          setUserName(userData.name || userData.email);
          setUserEmail(userData.email);
          if (userData.role) {
            setUserRole(userData.role.toLowerCase());
          }
        }
      } catch (e) {
        console.error("Error parsing initial local storage user data", e);
      }
    }

    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        // If no token, we can't fetch profile. 
        // If we also didn't find user data in local storage, show alert.
        if (!userDataStr) {
          showAlert({
            type: "error",
            title: "Authentication Required",
            message: "Please login to access your dashboard.",
            confirmText: "Login",
            onConfirm: () => {
              navigate("/login", { replace: true });
            }
          });
        }
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile API Response:", response.data);
        const apiData = response.data.user || response.data;
        console.log("👉 Parsed API Data:", apiData);
        console.log("👉 Producer Registration Status:", apiData.producerRegistrations);

        const { id, name, email, role, producerRegistrations } = apiData;

        if (id) setUserId(id);
        if (name) setUserName(name);
        if (email) setUserEmail(email);

        // Safely handle role
        if (role) {
          setUserRole(role.toLowerCase());
        }

        // Handle boolean or array value
        if (producerRegistrations !== undefined) {
          // If it's an array (like [] or [{...}]), check if it has items
          if (Array.isArray(producerRegistrations)) {
            setProducerRegistrationStatus(producerRegistrations.length > 0);
          } else {
            // If it's a boolean or other value
            setProducerRegistrationStatus(!!producerRegistrations);
          }
        }

        // Update localStorage with merged data
        const updatedUser = {
          id: id || userId,
          name: name || userName,
          email: email || userEmail,
          role: role ? role.toLowerCase() : userRole
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        const savedNOCs = JSON.parse(localStorage.getItem("nocApplications")) || [];
        setNocList(savedNOCs);

      } catch (error) {
        console.error("Error fetching profile:", error);
        // We don't necessarily want to block the user if the API fails but we have localStorage data
        // Only show critical error if we have NO user data
        if (!userRole && !userDataStr) {
          if (error.response && error.response.status === 401) {
            showAlert({
              type: "error",
              title: "Session Expired",
              message: "Your session has expired. Please login again.",
              confirmText: "Login",
              onConfirm: () => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
                navigate("/login", { replace: true });
              }
            });
          } else {
            showAlert({
              type: "error",
              title: "Error Loading Profile",
              message: "Failed to load your profile data. Please try again.",
              confirmText: "Retry",
              onConfirm: () => {
                window.location.reload();
              }
            });
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    showAlert({
      type: "warning",
      title: "Logout Confirmation",
      message: "Are you sure you want to logout?",
      confirmText: "Yes, Logout",
      cancelText: "Cancel",
      showCancel: true,
      onConfirm: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userData");

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
    filmmaker: ["Overview", "Producer Registration", "Apply NOC", "Profile"],
    artist: ["Profile"],
    vendor: ["Overview", "Vendor Registration", "Profile"],
  };

  const renderSection = () => {
    console.log("Rendering Section - Active:", activeSection, "Role:", userRole);

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
    if (activeSection === "Profile") {
      return <UserProfile />;
    }
    if (activeSection === "Producer Registration") {
      return <ProducerRegistration />;
    }
    if (activeSection === "Artist Registration") {
      return <ArtistRegistrationForm />;
    }
    if (activeSection === "Vendor Registration") {
      return <VendorRegistrationForm />;
    }

    return (
      <div className="p-4">
        <p className="text-red-500 font-bold">Invalid section</p>
        <p className="text-sm text-gray-500">Active Section: {activeSection}</p>
        <p className="text-sm text-gray-500">User Role: {userRole}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92b43] mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // if (!userRole) {
  //   return null;
  // }

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Alert Component */}
      <AlertBox
        {...alertConfig}
        onClose={closeAlert}
      />

      {/* Sidebar - Enterprise Clean Design */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col">
        {/* Logo Section */}
        <div className="p-5 border-b border-gray-100">
          <img src={Logo1} alt="Logo" className="h-14" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {(sidebarItems[userRole] || []).map((item, idx) => {
              const isLocked = item === "Apply NOC" && !producerRegistrationStatus;

              return (
                <li key={idx}>
                  <button
                    className={`w-full px-4 py-2.5 flex items-center justify-between text-sm font-medium rounded-lg transition-all duration-200 ${item === activeSection
                      ? "text-[#891737] bg-[#891737]/5 border border-[#891737]/10"
                      : isLocked
                        ? "text-gray-400 cursor-not-allowed hover:bg-transparent"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    onClick={() => {
                      if (isLocked) {
                        showAlert({
                          type: "warning",
                          title: "Registration Required",
                          message: "Please complete the Producer Registration form before applying for NOC.",
                          confirmText: "Go to Registration",
                          onConfirm: () => setActiveSection("Producer Registration"),
                          showCancel: true,
                          cancelText: "Close"
                        });
                        return;
                      }

                      if (item === "Artist Registration") {
                        handleArtistClick();
                      } else {
                        setActiveSection(item);
                      }
                    }}
                  >
                    <span>{item}</span>
                    {isLocked && <Lock className="w-4 h-4" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={UserAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-100 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-[#891737] rounded-lg hover:bg-[#891737]/90 transition-all duration-200 flex items-center justify-center"
          >
            <IoIosLogOut className="mr-2 text-base" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Topbar - Clean Design */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{activeSection}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
            <img
              src={UserAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-100 object-cover"
            />
          </div>
        </div>

        {/* Dynamic Section Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;