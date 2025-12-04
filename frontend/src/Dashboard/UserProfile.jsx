import React, { useState, useRef } from "react";
import { User, Lock, Camera, Save, X, Clock } from "lucide-react";
import UserAvatar from "/src/assets/UserAvtar.svg";

const UserProfile = () => {
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        photo: UserAvatar,
        lastUpdated: "2025-11-28T10:30:00",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        lastChanged: "2025-10-15T14:20:00",
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [tempProfileData, setTempProfileData] = useState(profileData);
    const fileInputRef = useRef(null);

    // Format timestamp
    const formatDateTime = (dateString) => {
        if (!dateString) return "Never";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Handle profile photo change
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfileData({ ...tempProfileData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Save profile changes
    const handleSaveProfile = () => {
        setProfileData({
            ...tempProfileData,
            lastUpdated: new Date().toISOString(),
        });
        setIsEditingProfile(false);
        // Add API call here
    };

    // Cancel profile edit
    const handleCancelProfile = () => {
        setTempProfileData(profileData);
        setIsEditingProfile(false);
    };

    // Save password changes
    const handleSavePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (passwordData.newPassword.length < 8) {
            alert("Password must be at least 8 characters!");
            return;
        }

        // API call to update password
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            lastChanged: new Date().toISOString(),
        });
        setIsEditingPassword(false);
        // Add API call here
    };

    // Cancel password edit
    const handleCancelPassword = () => {
        setPasswordData({
            ...passwordData,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setIsEditingPassword(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                <p className="text-xs text-gray-500 mt-1">
                    Manage your account information and security settings
                </p>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                            <User className="text-gray-600" size={16} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Personal Information</h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Clock size={12} />
                                Last updated: {formatDateTime(profileData.lastUpdated)}
                            </p>
                        </div>
                    </div>
                    {!isEditingProfile && (
                        <button
                            onClick={() => {
                                setIsEditingProfile(true);
                                setTempProfileData(profileData);
                            }}
                            className="px-3 py-1.5 text-xs font-medium text-[#891737] hover:bg-[#891737]/5 rounded-lg transition-colors"
                        >
                            Edit
                        </button>
                    )}
                </div>

                <div className="p-6">
                    {/* Profile Photo */}
                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            Profile Photo
                        </label>
                        <div className="flex items-center gap-4">
                            <img
                                src={isEditingProfile ? tempProfileData.photo : profileData.photo}
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-2 border-gray-100 object-cover"
                            />
                            {isEditingProfile && (
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Camera size={14} />
                                    Change Photo
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        {isEditingProfile ? (
                            <input
                                type="text"
                                value={tempProfileData.name}
                                onChange={(e) =>
                                    setTempProfileData({ ...tempProfileData, name: e.target.value })
                                }
                                className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                                placeholder="Enter your full name"
                            />
                        ) : (
                            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                {profileData.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <p className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                            {profileData.email}
                            <span className="text-xs text-gray-400 ml-2">(Cannot be changed)</span>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    {isEditingProfile && (
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={handleSaveProfile}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#891737]/90 rounded-lg transition-colors"
                            >
                                <Save size={14} />
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancelProfile}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                            <Lock className="text-gray-600" size={16} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Security</h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Clock size={12} />
                                Password last changed: {formatDateTime(passwordData.lastChanged)}
                            </p>
                        </div>
                    </div>
                    {!isEditingPassword && (
                        <button
                            onClick={() => setIsEditingPassword(true)}
                            className="px-3 py-1.5 text-xs font-medium text-[#891737] hover:bg-[#891737]/5 rounded-lg transition-colors"
                        >
                            Change Password
                        </button>
                    )}
                </div>

                {isEditingPassword && (
                    <div className="p-6 space-y-4">
                        {/* Current Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                                }
                                className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                                placeholder="Enter current password"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                                }
                                className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                                placeholder="Enter new password (min. 8 characters)"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                                }
                                className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                                placeholder="Confirm new password"
                            />
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                            <ul className="space-y-1 text-xs text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    At least 8 characters long
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    Mix of letters, numbers, and symbols
                                </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={handleSavePassword}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#891737]/90 rounded-lg transition-colors"
                            >
                                <Save size={14} />
                                Update Password
                            </button>
                            <button
                                onClick={handleCancelPassword}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {!isEditingPassword && (
                    <div className="px-6 py-4 bg-gray-50">
                        <p className="text-xs text-gray-500">
                            Click "Change Password" to update your password securely
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
