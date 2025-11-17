import React, { useState } from "react";
import "../App.css";
import Logo1 from "/src/assets/Logo1.png";
import Adminmam from "/src/assets/adminmam.svg";
import { MdSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FileText, CheckCircle, Clock, XCircle, DollarSign } from "lucide-react";
import Dashboardactivity from "./Dashboardactivity";
import Artist from "./Artist";
import { RiContractFill } from "react-icons/ri";
import TenderMain from "../Dashboard/TenderMain";
import NotificationMain from "./NotificationMain";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Overview");

  const handleLogout = () => {
    console.log("Logout triggered");
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const renderSection = () => {
    switch (activeSection) {
      case "Overview":
        return (
          <>
            {/* Metrics Overview Section */}
            <section className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* NOC Metrics */}
                <MetricCard
                  title="Total NOC"
                  value="256"
                  icon={<FileText className="h-5 w-5" />}
                />
                <MetricCard
                  title="Completed NOC"
                  value="228"
                  icon={<CheckCircle className="h-5 w-5" />}
                />
                <MetricCard
                  title="Pending NOC"
                  value="28"
                  icon={<Clock className="h-5 w-5" />}
                />
                <MetricCard
                  title="Rejected NOC"
                  value="4"
                  icon={<XCircle className="h-5 w-5" />}
                />
              </div>

              {/* Subsidy Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Total Subsidy"
                  value="120"
                  icon={<DollarSign className="h-5 w-5" />}
                />
                <MetricCard
                  title="Approved Subsidy"
                  value="85"
                  icon={<CheckCircle className="h-5 w-5" />}
                />
                <MetricCard
                  title="Pending Subsidy"
                  value="23"
                  icon={<Clock className="h-5 w-5" />}
                />
                <MetricCard
                  title="Rejected Subsidy"
                  value="12"
                  icon={<XCircle className="h-5 w-5" />}
                />
              </div>
            </section>

            {/* Activity section */}
            <Dashboardactivity />
          </>
        );
      case "Artist":
        return <Artist />;
      case "Notifications":
        return <NotificationMain />;
      case "Tender":
        return <TenderMain />;
      case "Deleted":
        return (
          <div className="text-gray-600 text-lg">
            🚧 <strong>{activeSection}</strong> section is under construction.
          </div>
        );
      default:
        return <p>Invalid section selected</p>;
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f6f8] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col justify-between py-6 border-r border-gray-200">
        <div>
          <div className="px-6 pb-2 border-b border-gray-200">
            <img src={Logo1} alt="Logo" className="h-16" />
          </div>

          {/* Top Sidebar Navigation */}
          <nav className="mt-6 px-4 space-y-1 text-sm font-medium">
            {[
              { label: "Overview", icon: <MdSpaceDashboard /> },
              { label: "Artist", icon: <FaRegUser /> },
              {
                label: "Notifications",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                    <path
                      fillRule="evenodd"
                      d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ),
              },
              { label: "Tender", icon: <RiContractFill /> },
            ].map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={activeSection === item.label}
                onClick={() => setActiveSection(item.label)}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{activeSection}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search applications..."
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#891737] focus:border-transparent"
            />
            <div className="w-10 h-10 rounded-full bg-[#891737] flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <button
              className="group flex items-center justify-start w-10 h-10 bg-[#891737] rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-md hover:w-32 hover:rounded-full active:translate-x-1 active:translate-y-1"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
              </div>
              <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-sm font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
              </div>
            </button>
          </div>
        </header>

        {/* Section Rendering */}
        <div>{renderSection()}</div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
      active 
        ? "bg-[#891737] text-white shadow-sm" 
        : "text-gray-700 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const MetricCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="bg-gray-100 text-gray-600 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
