import React, { useState } from "react";
import { Users, UserPlus, Edit2, Trash2, Search, Eye, EyeOff, Film, Store, Palette } from "lucide-react";

import axios from "axios";

const UserManager = ({ searchQuery = "" }) => {
    const [activeTab, setActiveTab] = useState("Filmmaker");

    // Mock Data for each category
    const [filmmakers, setFilmmakers] = useState([
        { id: 1, name: "Raj Kumar", email: "raj@film.com", password: "password123", role: "Filmmaker" },
        { id: 2, name: "Priya Singh", email: "priya@prod.com", password: "securepass", role: "Filmmaker" },
    ]);

    const [vendors, setVendors] = useState([
        { id: 1, name: "Camera Rentals", email: "info@camera.com", password: "rentals2024", role: "Vendor" },
        { id: 2, name: "Patna Catering", email: "food@patna.com", password: "yummyfood", role: "Vendor" },
    ]);

    const [artists, setArtists] = useState([
        { id: 1, name: "Amitabh B", email: "amit@actor.com", password: "bigb", role: "Artist" },
        { id: 2, name: "Shreya G", email: "shreya@music.com", password: "melody", role: "Artist" },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showPasswords, setShowPasswords] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Helper to get current data based on active tab
    const getCurrentData = () => {
        switch (activeTab) {
            case "Filmmaker": return { data: filmmakers, setter: setFilmmakers, icon: <Film className="w-5 h-5" />, color: "text-blue-600", bgColor: "bg-blue-50" };
            case "Vendor": return { data: vendors, setter: setVendors, icon: <Store className="w-5 h-5" />, color: "text-purple-600", bgColor: "bg-purple-50" };
            case "Artist": return { data: artists, setter: setArtists, icon: <Palette className="w-5 h-5" />, color: "text-pink-600", bgColor: "bg-pink-50" };
            default: return { data: [], setter: () => { }, icon: <Users className="w-5 h-5" />, color: "text-gray-600", bgColor: "bg-gray-50" };
        }
    };

    const { data: currentUsers, setter: setCurrentSetter, icon: currentIcon, color: currentColor, bgColor: currentBgColor } = getCurrentData();

    // Stats
    const totalUsers = currentUsers.length;

    // Filter users based on search query
    const filteredUsers = currentUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const togglePasswordVisibility = (id) => {
        setShowPasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAddUser = () => {
        if (formData.name && formData.email && formData.password) {
            const newUser = {
                id: Date.now(), // Simple ID generation
                ...formData,
                role: activeTab
            };
            setCurrentSetter([...currentUsers, newUser]);
            setFormData({ name: "", email: "", password: "" });
            setShowAddModal(false);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, password: user.password });
        setShowAddModal(true);
    };

    const handleUpdateUser = async () => {
        if (formData.password) {
            try {
                const token = localStorage.getItem('authToken');
                await axios.post(
                    `http://localhost:3000/api/auth/change-user-password/${editingUser.id}`,
                    { password: formData.password },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                alert("Password updated successfully!");
            } catch (error) {
                console.error("Error updating password:", error);
                alert("Failed to update password.");
            }
        }

        const updatedUsers = currentUsers.map(u =>
            u.id === editingUser.id ? { ...u, ...formData } : u
        );
        setCurrentSetter(updatedUsers);
        setFormData({ name: "", email: "", password: "" });
        setEditingUser(null);
        setShowAddModal(false);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm(`Are you sure you want to delete this ${activeTab}?`)) {
            setCurrentSetter(currentUsers.filter(u => u.id !== id));
        }
    };

    return (
        <>
            {/* Tabs */}
            <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6 w-fit">
                {["Filmmaker", "Vendor", "Artist"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            w-32 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                            ${activeTab === tab
                                ? "bg-white text-[#891737] shadow"
                                : "text-gray-600 hover:bg-white/[0.12] hover:text-[#891737]"
                            }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Metrics Cards */}
            <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <MetricCard
                        title={`Total ${activeTab}s`}
                        value={totalUsers}
                        icon={currentIcon}
                        color={currentColor}
                        bgColor={currentBgColor}
                    />
                </div>
            </section>

            {/* User List Section */}
            <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">{activeTab} Directory</h2>
                    <button
                        onClick={() => {
                            setEditingUser(null);
                            setFormData({ name: "", email: "", password: "" });
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-[#891737] text-white rounded-lg text-sm font-medium hover:bg-[#891737]/90 transition-colors flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add New {activeTab}
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Password</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono">
                                                    {showPasswords[user.id] ? user.password : "••••••••"}
                                                </span>
                                                <button
                                                    onClick={() => togglePasswordVisibility(user.id)}
                                                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                                    title={showPasswords[user.id] ? "Hide password" : "Show password"}
                                                >
                                                    {showPasswords[user.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-sm text-gray-500">
                                        No {activeTab.toLowerCase()}s found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingUser ? `Edit ${activeTab}` : `Add New ${activeTab}`}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingUser(null);
                                    setFormData({ name: "", email: "", password: "" });
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#891737] focus:border-transparent"
                                        placeholder="Enter name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#891737] focus:border-transparent"
                                        placeholder="Enter email"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#891737] focus:border-transparent"
                                        placeholder="Enter password"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingUser(null);
                                    setFormData({ name: "", email: "", password: "" });
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={editingUser ? handleUpdateUser : handleAddUser}
                                className="px-6 py-2 bg-[#891737] text-white rounded-lg hover:bg-[#891737]/90 transition-colors"
                            >
                                {editingUser ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const MetricCard = ({ title, value, icon, color, bgColor }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center ${color}`}>
                    {icon}
                </div>
            </div>

            <div>
                <p className="text-3xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

export default UserManager;
