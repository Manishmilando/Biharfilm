import React, { useState, useEffect } from "react";
import { Bell, BellRing, PlusCircle, FileText, X } from "lucide-react";
import AddNotification from "./AddNotification";
import axios from "axios";

const NotificationMain = () => {
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

  // Delete Notification
  const deleteNotification = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      await axios.delete(
        `https://biharfilmbackend-production.up.railway.app/api/notification/${id}`
      );
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // Edit Notification
  const editNotification = (item) => {
    setEditData(item);
    setShowForm(true);
  };

  // Dynamic Counts
  const totalNotifications = notifications.length;
  const newNotifications = notifications.filter((n) => {
    const today = new Date().toISOString().split("T")[0];
    return n.date === today;
  }).length;
  const addNotifications = notifications.filter(
    (n) => n.addedBy === "admin"
  ).length;

  const cards = [
    {
      title: "Total Notifications",
      count: totalNotifications,
      subtitle: "All-time notifications",
      icon: <Bell className="w-5 h-5" />,
      color: "blue",
    },
    {
      title: "New Notifications",
      count: newNotifications,
      subtitle: "Today’s new notifications",
      icon: <BellRing className="w-5 h-5" />,
      color: "green",
    },
    {
      title: "Add Notification",
      count: addNotifications,
      subtitle: "Added manually today",
      icon: <PlusCircle className="w-5 h-5" />,
      color: "purple",
      onClick: () => {
        setEditData(null); // reset for new
        setShowForm(true);
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="bg-white border border-gray-200/60 rounded-xl p-6 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div>
              <div
                className={`flex items-center gap-2 text-${card.color}-600 mb-1`}
              >
                {card.icon}
                <h3 className="text-sm font-semibold">{card.title}</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{card.count}</p>
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            </div>
            <div
              className={`bg-${card.color}-100 text-${card.color}-700 text-xs font-semibold px-2 py-1 rounded-full`}
            >
              +{card.count}
            </div>
          </div>
        ))}
      </div>

      {/* Notifications Table */}
      <div className="bg-white border border-gray-200/60 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications List</h2>

        <table className="w-full border text-left text-sm">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Date</th>
              <th className="p-3">PDF</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium text-gray-800">{item.title}</td>
                <td className="p-3 text-gray-600">{item.description}</td>
                <td className="p-3 text-gray-600">{item.date}</td>
                <td className="p-3">
                  {item.pdf ? (
                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-110 transition" />
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  {/* Edit */}
                  <button
                    onClick={() => editNotification(item)}
                    className="w-5 h-5 text-green-500 cursor-pointer hover:scale-110 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteNotification(item.id)}
                    className="w-5 h-5 text-red-500 cursor-pointer hover:scale-110 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {notifications.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No notifications found.
          </p>
        )}
      </div>

      {/* Add/Edit Notification Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 pt-16">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-5 right-5 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <AddNotification
            editData={editData}
            onClose={() => {
              setShowForm(false);
              setEditData(null);
              fetchNotifications(); // refresh after add/edit
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationMain;
