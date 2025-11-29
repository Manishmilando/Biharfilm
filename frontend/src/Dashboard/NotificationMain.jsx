import React, { useState, useEffect } from "react";
import { Bell, BellRing, PlusCircle, FileText, X, Edit, Trash2 } from "lucide-react";
import AddNotification from "./AddNotification";
import axios from "axios";

const NotificationMain = ({ searchQuery }) => {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch Notifications from API
  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(
        "https://biharfilmbackend-production.up.railway.app/api/notification/notifications"
      );
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter notifications based on search query
  const filteredNotifications = notifications.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.notificationTitle?.toLowerCase().includes(query) ||
      item.notificationDescription?.toLowerCase().includes(query)
    );
  });

  // Delete Notification
  const deleteNotification = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      await axios.delete(
        `https://biharfilmbackend-production.up.railway.app/api/notification/deleteNotification/${id}`
      );
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // Edit Notification
  const editNotification = (item) => {
    // Map backend fields to frontend expected props if needed, or pass directly
    // The AddNotification component expects: title, date, description
    // Backend returns: notificationTitle, notificationDate, notificationDescription
    const mappedItem = {
      id: item.id,
      title: item.notificationTitle,
      date: item.notificationDate,
      description: item.notificationDescription,
      pdf: item.notificationPdf
    };
    setEditData(mappedItem);
    setShowForm(true);
  };

  // Dynamic Counts
  const totalNotifications = notifications.length;
  const newNotifications = notifications.filter((n) => {
    const today = new Date().toISOString().split("T")[0];
    return n.notificationDate === today;
  }).length;

  // Assuming 'addedBy' might not be present or different, we'll just count manual adds if we can distinguish, 
  // otherwise maybe just show total or something else. For now, let's keep the logic if 'addedBy' exists, else 0.
  const addNotifications = notifications.filter(
    (n) => n.addedBy === "admin"
  ).length;

  const cards = [
    {
      title: "Total Notifications",
      count: totalNotifications,
      subtitle: "All-time notifications",
      icon: <Bell className="w-5 h-5" />,
      color: "text-[#a92b4e]",
      bgColor: "bg-[#a92b4e]/10",
      borderColor: "border-[#a92b4e]/20"
    },
    {
      title: "New Notifications",
      count: newNotifications,
      subtitle: "Today’s new notifications",
      icon: <BellRing className="w-5 h-5" />,
      color: "text-[#a92b4e]",
      bgColor: "bg-[#a92b4e]/10",
      borderColor: "border-[#a92b4e]/20"
    },
    {
      title: "Add Notification",
      count: "New", // Static text or dynamic count
      subtitle: "Click to add new",
      icon: <PlusCircle className="w-5 h-5" />,
      color: "text-white",
      bgColor: "bg-[#a92b4e]",
      borderColor: "border-[#a92b4e]",
      isAction: true,
      onClick: () => {
        setEditData(null); // reset for new
        setShowForm(true);
      },
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className={`rounded-xl p-6 flex items-center justify-between transition-all duration-300 ${card.isAction
              ? "bg-[#a92b4e] text-white shadow-lg shadow-[#a92b4e]/30 hover:-translate-y-1 cursor-pointer"
              : "bg-white border border-gray-200 hover:shadow-md"
              }`}
          >
            <div>
              <div
                className={`flex items-center gap-2 mb-2 ${!card.isAction ? "text-[#a92b4e]" : "text-white/90"}`}
              >
                {card.icon}
                <h3 className="text-sm font-semibold">{card.title}</h3>
              </div>
              <p className={`text-3xl font-bold ${!card.isAction ? "text-gray-800" : "text-white"}`}>{card.count}</p>
              <p className={`text-xs mt-1 ${!card.isAction ? "text-gray-500" : "text-white/80"}`}>{card.subtitle}</p>
            </div>
            {!card.isAction && (
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${card.bgColor} ${card.color}`}
              >
                <Bell className="w-5 h-5" />
              </div>
            )}
            {card.isAction && (
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <PlusCircle className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notifications Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Notifications List</h2>
          <span className="text-xs font-medium px-2.5 py-1 bg-[#a92b4e]/10 text-[#a92b4e] rounded-full">
            {filteredNotifications.length} Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold w-1/4">Title</th>
                <th className="px-6 py-4 font-semibold w-1/3">Description</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-center">Attachment</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredNotifications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Bell className="w-8 h-8 text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">No notifications found</p>
                      <p className="text-gray-400 text-xs mt-1">Try adjusting your search or add a new notification</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredNotifications.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{item.notificationTitle}</td>
                    <td className="px-6 py-4 text-gray-600 line-clamp-2 max-w-xs">{item.notificationDescription}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.notificationDate}</td>
                    <td className="px-6 py-4 text-center">
                      {item.notificationPdf ? (
                        <a
                          href={item.notificationPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="View PDF"
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => editNotification(item)}
                          className="p-2 text-gray-500 hover:text-[#a92b4e] hover:bg-[#a92b4e]/5 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deleteNotification(item.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Notification Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="w-full max-w-lg animate-in fade-in zoom-in duration-200">
            <AddNotification
              editData={editData}
              onClose={() => {
                setShowForm(false);
                setEditData(null);
                fetchNotifications(); // refresh after add/edit
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMain;
