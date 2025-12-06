import React, { useState, useEffect } from "react";
import { Users, UserPlus, Edit2, Trash2, Search, Eye, EyeOff } from "lucide-react";

import axios from "axios";

const DistrictPassword = ({ searchQuery = "" }) => {
    const [districts, setDistricts] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@district1.gov.in",
            password: "******",
            role: "District Admin",
            districtName: "Patna",
            districtId: "DIS001"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@district2.gov.in",
            password: "******",
            role: "District Admin",
            districtName: "Gaya",
            districtId: "DIS002"
        },
        {
            id: 3,
            name: "Robert Johnson",
            email: "robert.j@district3.gov.in",
            password: "******",
            role: "District Admin",
            districtName: "Bhagalpur",
            districtId: "DIS003"
        }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingDistrict, setEditingDistrict] = useState(null);
    const [showPasswords, setShowPasswords] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "District Admin",
        districtName: "",
        districtId: ""
    });

    // Stats
    const totalDistricts = 38; // Total districts in Bihar
    const totalDistrictsCreated = districts.length;

    // Filter districts based on search query
    const filteredDistricts = districts.filter(district =>
        district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        district.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        district.districtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        district.districtId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const togglePasswordVisibility = (id) => {
        setShowPasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAddDistrict = async () => {
        if (formData.name && formData.email && formData.password && formData.districtName && formData.districtId) {
            try {
                const response = await axios.post("http://localhost:3000/api/auth/create-admin", formData);

                if (response.status === 201 || response.status === 200) {
                    const newDistrict = {
                        id: districts.length + 1,
                        ...formData
                    };
                    setDistricts([...districts, newDistrict]);
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        role: "District Admin",
                        districtName: "",
                        districtId: ""
                    });
                    setShowAddModal(false);
                    alert("District Admin created successfully!");
                }
            } catch (error) {
                console.error("Error creating district admin:", error);
                alert("Failed to create District Admin. Please try again.");
            }
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const handleEditDistrict = (district) => {
        setEditingDistrict(district);
        setFormData(district);
        setShowAddModal(true);
    };

    const handleUpdateDistrict = async () => {
        if (formData.password && formData.password !== "******") {
            try {
                const token = localStorage.getItem('authToken');
                await axios.post(
                    `http://localhost:3000/api/auth/update-admin-password/${editingDistrict.id}`,
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

        const updatedDistricts = districts.map(d =>
            d.id === editingDistrict.id ? { ...formData, id: editingDistrict.id } : d
        );
        setDistricts(updatedDistricts);
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "District Admin",
            districtName: "",
            districtId: ""
        });
        setEditingDistrict(null);
        setShowAddModal(false);
    };

    const handleDeleteDistrict = async (id) => {
        if (window.confirm("Are you sure you want to delete this district admin?")) {
            try {
                const token = localStorage.getItem('authToken');
                await axios.delete(
                    `http://localhost:3000/api/auth/delete-admin/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setDistricts(districts.filter(d => d.id !== id));
                alert("District Admin deleted successfully!");
            } catch (error) {
                console.error("Error deleting district admin:", error);
                alert("Failed to delete District Admin.");
            }
        }
    };

    return (
        <>
            {/* Metrics Cards */}
            <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <MetricCard
                        title="Total Districts"
                        value={totalDistricts}
                        icon={<Users className="h-5 w-5" />}
                        color="text-blue-600"
                        bgColor="bg-blue-50"
                    />
                    <MetricCard
                        title="Total Districts Created"
                        value={totalDistrictsCreated}
                        icon={<UserPlus className="h-5 w-5" />}
                        color="text-green-600"
                        bgColor="bg-green-50"
                    />
                </div>
            </section>

            {/* Add District Section */}
            <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Add District</h2>
                    <button
                        onClick={() => {
                            setEditingDistrict(null);
                            setFormData({
                                name: "",
                                email: "",
                                password: "",
                                role: "District Admin",
                                districtName: "",
                                districtId: ""
                            });
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-[#891737] text-white rounded-lg text-sm font-medium hover:bg-[#891737]/90 transition-colors flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add New District
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Password
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    District Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    District ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredDistricts.length > 0 ? (
                                filteredDistricts.map((district) => (
                                    <tr key={district.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {district.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {district.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono">
                                                    {showPasswords[district.id] ? district.password : "••••••••"}
                                                </span>
                                                <button
                                                    onClick={() => togglePasswordVisibility(district.id)}
                                                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                                    title={showPasswords[district.id] ? "Hide password" : "Show password"}
                                                >
                                                    {showPasswords[district.id] ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {district.role}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {district.districtName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {district.districtId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEditDistrict(district)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDistrict(district.id)}
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
                                    <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500">
                                        No districts found
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
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingDistrict ? "Edit District Admin" : "Add New District Admin"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingDistrict(null);
                                    setFormData({
                                        name: "",
                                        email: "",
                                        password: "",
                                        role: "District Admin",
                                        districtName: "",
                                        districtId: ""
                                    });
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <div className="md:col-span-2">
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
                                        <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                            <p className="text-xs font-semibold text-blue-900 mb-1">Password Requirements:</p>
                                            <ul className="text-xs text-blue-700 space-y-0.5 ml-4 list-disc">
                                                <li>Minimum length: 6 characters</li>
                                                <li>Must contain at least one uppercase letter</li>
                                                <li>Must contain at least one number</li>
                                                <li>Must contain at least one special character (!@#$%^&*)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Role <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#891737] focus:border-transparent"
                                        placeholder="Enter role"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        District Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.districtName}
                                        onChange={(e) => setFormData({ ...formData, districtName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#891737] focus:border-transparent"
                                        placeholder="Enter district name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        District ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.districtId}
                                        onChange={(e) => setFormData({ ...formData, districtId: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#891737] focus:border-transparent"
                                        placeholder="Enter district ID"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingDistrict(null);
                                    setFormData({
                                        name: "",
                                        email: "",
                                        password: "",
                                        role: "District Admin",
                                        districtName: "",
                                        districtId: ""
                                    });
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={editingDistrict ? handleUpdateDistrict : handleAddDistrict}
                                className="px-6 py-2 bg-[#891737] text-white rounded-lg hover:bg-[#891737]/90 transition-colors"
                            >
                                {editingDistrict ? "Update District" : "Add District"}
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

export default DistrictPassword;
