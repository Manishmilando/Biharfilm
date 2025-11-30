import React, { useEffect, useState } from "react";
import axios from "axios";
import { Building2, PlusCircle, Phone, Mail, MapPin, Globe, Package, X, AlertCircle, Search } from "lucide-react";
import AddVendorForm from "./AddVendorForm";

const VendorDirectory = ({ searchQuery }) => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchVendors = async () => {
        try {
            const res = await axios.get("https://biharfilmbackend-production.up.railway.app/api/vendor/getvendors");
            setVendors(res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch vendors:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    // Filter vendors based on search query
    const filteredVendors = vendors.filter((vendor) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            vendor.vendorName?.toLowerCase().includes(query) ||
            vendor.category?.toLowerCase().includes(query) ||
            vendor.address?.toLowerCase().includes(query) ||
            vendor.email?.toLowerCase().includes(query)
        );
    });

    // Count new vendors added today
    const today = new Date().toISOString().split("T")[0];
    const newVendorsCount = vendors.filter(
        (vendor) => vendor.createdAt && vendor.createdAt.split("T")[0] === today
    ).length;

    const cards = [
        {
            title: "Total Vendors",
            count: vendors.length,
            subtitle: "Registered vendors",
            icon: <Building2 className="w-5 h-5" />,
            color: "text-[#a92b4e]",
            bgColor: "bg-[#a92b4e]/10",
            borderColor: "border-[#a92b4e]/20"
        },
        {
            title: "New Vendors",
            count: newVendorsCount,
            subtitle: "Registered today",
            icon: <Building2 className="w-5 h-5" />,
            color: "text-[#a92b4e]",
            bgColor: "bg-[#a92b4e]/10",
            borderColor: "border-[#a92b4e]/20"
        },
        {
            title: "Add Vendor",
            count: "New",
            subtitle: "Register new vendor",
            icon: <PlusCircle className="w-5 h-5" />,
            color: "text-white",
            bgColor: "bg-[#a92b4e]",
            borderColor: "border-[#a92b4e]",
            isAction: true,
            onClick: () => setShowAddModal(true),
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
                                {card.icon}
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

            {/* Vendors Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800">Vendor Directory</h2>
                    <span className="text-xs font-medium px-2.5 py-1 bg-[#a92b4e]/10 text-[#a92b4e] rounded-full">
                        {filteredVendors.length} Total
                    </span>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading vendor data...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
                                    <th className="px-6 py-4 font-semibold w-16">#</th>
                                    <th className="px-6 py-4 font-semibold">Vendor</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Contact</th>
                                    <th className="px-6 py-4 font-semibold">Address</th>
                                    <th className="px-6 py-4 font-semibold">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredVendors.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <AlertCircle className="w-8 h-8 text-gray-300 mb-3" />
                                                <p className="text-gray-500 font-medium">No vendors found</p>
                                                <p className="text-gray-400 text-xs mt-1">Try adjusting your search or add a new vendor</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVendors.map((vendor, idx) => (
                                        <tr
                                            key={vendor.id || idx}
                                            className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                                            onClick={() => setSelectedVendor(vendor)}
                                        >
                                            <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={vendor.logoUrl || "https://via.placeholder.com/40"}
                                                        alt={vendor.vendorName}
                                                        className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{vendor.vendorName}</p>
                                                        {vendor.website && (
                                                            <a
                                                                href={vendor.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                Website
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    {vendor.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <div className="flex flex-col text-xs">
                                                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {vendor.email}</span>
                                                    <span className="flex items-center gap-1 text-gray-400"><Phone className="w-3 h-3" /> {vendor.phoneNumber}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{vendor.address}</td>
                                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                {vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Vendor Details Modal */}
            {selectedVendor && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                        {/* Header Background */}
                        <div className="h-32 bg-gradient-to-r from-[#a92b4e] to-[#891737] relative shrink-0">
                            <button
                                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition"
                                onClick={() => setSelectedVendor(null)}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-8 pb-8 overflow-y-auto custom-scrollbar">
                            <div className="relative flex justify-between items-end -mt-12 mb-6">
                                <img
                                    src={selectedVendor.logoUrl || "https://via.placeholder.com/150"}
                                    alt={selectedVendor.vendorName}
                                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg bg-white"
                                />
                            </div>

                            <div className="text-center sm:text-left mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">{selectedVendor.vendorName}</h2>
                                <p className="text-[#a92b4e] font-medium">{selectedVendor.category}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span>{selectedVendor.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{selectedVendor.phoneNumber}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <span>{selectedVendor.address}</span>
                                    </div>
                                    {selectedVendor.website && (
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Globe className="w-4 h-4 text-gray-400" />
                                            <a href={selectedVendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {selectedVendor.website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Products/Services Section */}
                            {selectedVendor.products && selectedVendor.products.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-[#a92b4e]" />
                                        Products & Services
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {selectedVendor.products.map((product, idx) => (
                                            <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                                                        <p className="text-xs text-gray-500 mt-0.5">{product.type}</p>
                                                        {product.description && (
                                                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                                        )}
                                                    </div>
                                                    {product.price && (
                                                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                                            ₹{product.price}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Add Vendor Modal */}
            {showAddModal && <AddVendorForm onClose={() => {
                setShowAddModal(false);
                fetchVendors(); // Refresh list after adding
            }} />}
        </div>
    );
};

export default VendorDirectory;
