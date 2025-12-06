import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Building2, PlusCircle, Phone, Mail, MapPin, Globe, Package, X,
    AlertCircle, CheckCircle, Clock, LayoutGrid, LayoutList,
    Calendar, Tag, ExternalLink, ShieldCheck, AlertTriangle,
    Filter, ArrowUpDown
} from "lucide-react";
import AddVendorForm from "./AddVendorForm";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Clean Sortable Vendor Card
const SortableVendorCard = ({ vendor, onClick }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: vendor.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Equipment': 'bg-blue-50 text-blue-600 border-blue-100',
            'Services': 'bg-purple-50 text-purple-600 border-purple-100',
            'Location': 'bg-green-50 text-green-600 border-green-100',
            'Catering': 'bg-orange-50 text-orange-600 border-orange-100',
            'Transportation': 'bg-cyan-50 text-cyan-600 border-cyan-100',
            'Post-Production': 'bg-pink-50 text-pink-600 border-pink-100',
        };
        return colors[category] || 'bg-gray-50 text-gray-600 border-gray-100';
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onClick(vendor)}
            className={`bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all cursor-grab active:cursor-grabbing ${isDragging ? 'ring-2 ring-gray-200' : ''
                }`}
        >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
                <div className="relative flex-shrink-0">
                    <img
                        src={vendor.logoUrl || "https://via.placeholder.com/48"}
                        alt={vendor.vendorName}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                    />
                    {vendor.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                        {vendor.vendorName}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{vendor.email}</p>
                </div>
            </div>

            {/* Category Badge */}
            <div className="mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(vendor.category)}`}>
                    <Tag className="w-3 h-3" />
                    {vendor.category}
                </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{vendor.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{vendor.address}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}</span>
                </div>
                {vendor.website && (
                    <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs text-[#891737] hover:text-[#891737]/80 font-medium"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Visit
                    </a>
                )}
            </div>
        </div>
    );
};

// Clean Kanban Column
const KanbanColumn = ({ title, vendors, icon, count, color, bgColor, description, id }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div className="flex-1 min-w-[340px] max-w-[420px]">
            <div className="bg-gray-50 rounded-xl border border-gray-100 h-full flex flex-col">
                {/* Column Header */}
                <div className="p-4 border-b border-gray-100 bg-white rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center`}>
                                <span className={color}>{icon}</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                                <p className="text-xs text-gray-500">{description}</p>
                            </div>
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {count}
                        </div>
                    </div>
                </div>

                {/* Cards Container */}
                <div ref={setNodeRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
                    <SortableContext items={vendors.map(v => v.id)} strategy={verticalListSortingStrategy}>
                        {vendors.map((vendor) => (
                            <SortableVendorCard key={vendor.id} vendor={vendor} onClick={() => { }} />
                        ))}
                    </SortableContext>
                    {vendors.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className={`w-16 h-16 rounded-lg ${bgColor} flex items-center justify-center mb-3`}>
                                <span className={color}>{icon}</span>
                            </div>
                            <p className="text-sm text-gray-500">No vendors yet</p>
                            <p className="text-xs text-gray-400 mt-1">Drag and drop cards here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const VendorDirectory = ({ searchQuery }) => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [viewMode, setViewMode] = useState("kanban");

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const fetchVendors = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/vendor/getvendors");
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

    const nonVerifiedVendors = filteredVendors.filter(v => !v.isVerified);
    const verifiedVendors = filteredVendors.filter(v => v.isVerified);

    const today = new Date().toISOString().split("T")[0];
    const newVendorsCount = vendors.filter(
        (vendor) => vendor.createdAt && vendor.createdAt.split("T")[0] === today
    ).length;

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeVendor = vendors.find(v => v.id === active.id);

        if (!activeVendor) {
            setActiveId(null);
            return;
        }

        // Check if dropped over a column container or over another vendor
        let targetStatus = null;

        // If dropped over a droppable container (column)
        if (over.id === 'pending' || over.id === 'verified') {
            targetStatus = over.id === 'verified';
        } else {
            // If dropped over another vendor, find that vendor's status
            const overVendor = vendors.find(v => v.id === over.id);
            if (overVendor) {
                targetStatus = overVendor.isVerified;
            }
        }

        // If status needs to change
        if (targetStatus !== null && targetStatus !== activeVendor.isVerified) {
            // Optimistically update UI first
            const previousVendors = [...vendors];
            setVendors(vendors.map(v =>
                v.id === active.id ? { ...v, isVerified: targetStatus } : v
            ));

            try {
                const endpoint = targetStatus
                    ? `http://localhost:3000/api/vendor/${active.id}/verify`
                    : `http://localhost:3000/api/vendor/${active.id}/unverify`;

                const token = localStorage.getItem('authToken');
                await axios.patch(endpoint, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(`✅ Vendor ${active.id} verification status updated to ${targetStatus}`);
            } catch (err) {
                console.error("Failed to update vendor:", err);
                // Revert on error
                setVendors(previousVendors);
            }
        }

        setActiveId(null);
    };

    const handleDragCancel = () => {
        setActiveId(null);
    };

    const activeVendor = vendors.find(v => v.id === activeId);

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                        <p className="text-sm font-medium text-gray-500">Total Vendors</p>
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-gray-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-semibold text-gray-900">{vendors.length}</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                        <p className="text-sm font-medium text-gray-500">Verified</p>
                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-semibold text-gray-900">{verifiedVendors.length}</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                        <p className="text-sm font-medium text-gray-500">Pending Review</p>
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-semibold text-gray-900">{nonVerifiedVendors.length}</p>
                </div>
            </div>

            {/* View Controls */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#891737]/90 rounded-lg transition-colors"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Vendor
                    </button>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode("kanban")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === "kanban"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                        Board
                    </button>
                    <button
                        onClick={() => setViewMode("table")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === "table"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        <LayoutList className="w-4 h-4" />
                        List
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <div className="space-y-3 animate-pulse max-w-md mx-auto">
                        <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    </div>
                </div>
            ) : viewMode === "kanban" ? (
                /* Kanban Board */
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    <div className="flex gap-5 overflow-x-auto pb-4">
                        <KanbanColumn
                            id="pending"
                            title="Pending Review"
                            description="Awaiting verification"
                            vendors={nonVerifiedVendors}
                            icon={<Clock className="w-5 h-5" />}
                            count={nonVerifiedVendors.length}
                            color="text-amber-600"
                            bgColor="bg-amber-50"
                        />
                        <KanbanColumn
                            id="verified"
                            title="Verified"
                            description="Approved vendors"
                            vendors={verifiedVendors}
                            icon={<CheckCircle className="w-5 h-5" />}
                            count={verifiedVendors.length}
                            color="text-green-600"
                            bgColor="bg-green-50"
                        />
                    </div>

                    <DragOverlay>
                        {activeVendor ? (
                            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-xl">
                                <div className="flex items-start gap-3">
                                    <img
                                        src={activeVendor.logoUrl || "https://via.placeholder.com/48"}
                                        alt={activeVendor.vendorName}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{activeVendor.vendorName}</h4>
                                        <p className="text-xs text-gray-500">{activeVendor.category}</p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            ) : (
                /* Table View */
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">#</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Vendor</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Category</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Contact</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Location</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Status</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredVendors.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-5 py-12 text-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                                                <AlertCircle className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-500">No vendors found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVendors.map((vendor, idx) => (
                                        <tr
                                            key={vendor.id}
                                            className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                            onClick={() => setSelectedVendor(vendor)}
                                        >
                                            <td className="px-5 py-3.5 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                {idx + 1}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex-shrink-0">
                                                        <img
                                                            src={vendor.logoUrl || "https://via.placeholder.com/40"}
                                                            alt={vendor.vendorName}
                                                            className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                                        />
                                                        {vendor.isVerified && (
                                                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                                                <CheckCircle className="w-2.5 h-2.5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{vendor.vendorName}</p>
                                                        <p className="text-xs text-gray-500 truncate">{vendor.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                                                    {vendor.category}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-xs text-gray-600 whitespace-nowrap">
                                                {vendor.phoneNumber}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <p className="text-xs text-gray-600 truncate max-w-[200px]" title={vendor.address}>
                                                    {vendor.address}
                                                </p>
                                            </td>
                                            <td className="px-5 py-3.5 whitespace-nowrap">
                                                {vendor.isVerified ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3.5 text-xs text-gray-600 whitespace-nowrap">
                                                {vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            )}

            {/* Vendor Details Modal */}
            {selectedVendor && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900">Vendor Details</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Complete vendor information</p>
                            </div>
                            <button
                                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                                onClick={() => setSelectedVendor(null)}
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto">
                            {/* Profile Section */}
                            <div className="flex items-start gap-4 mb-6">
                                <img
                                    src={selectedVendor.logoUrl || "https://via.placeholder.com/96"}
                                    alt={selectedVendor.vendorName}
                                    className="w-24 h-24 rounded-lg object-cover border border-gray-100"
                                />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{selectedVendor.vendorName}</h3>
                                            <p className="text-sm text-gray-600 font-medium">{selectedVendor.category}</p>
                                        </div>
                                        {selectedVendor.isVerified ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                                                <ShieldCheck className="w-4 h-4" />
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                                                <Clock className="w-4 h-4" />
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="text-xs text-gray-900 truncate">{selectedVendor.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="text-xs text-gray-900">{selectedVendor.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs text-gray-500">Location</p>
                                            <p className="text-xs text-gray-900 line-clamp-2">{selectedVendor.address}</p>
                                        </div>
                                    </div>
                                    {selectedVendor.website && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                                                <Globe className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs text-gray-500">Website</p>
                                                <a
                                                    href={selectedVendor.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-[#891737] hover:text-[#891737]/80 truncate block"
                                                >
                                                    {selectedVendor.website}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Products Section */}
                            {selectedVendor.products && selectedVendor.products.length > 0 && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                                            <Package className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <h4 className="text-sm font-semibold text-gray-900">Products & Services</h4>
                                    </div>
                                    <div className="space-y-2">
                                        {selectedVendor.products.map((product, idx) => (
                                            <div key={idx} className="p-3 bg-white rounded-lg border border-gray-100">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="flex-1">
                                                        <h5 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h5>
                                                        <span className="inline-block px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-xs font-medium">
                                                            {product.type}
                                                        </span>
                                                        {product.description && (
                                                            <p className="text-xs text-gray-600 mt-2">{product.description}</p>
                                                        )}
                                                    </div>
                                                    {product.price && (
                                                        <div className="text-right">
                                                            <p className="text-lg font-semibold text-gray-900">₹{product.price}</p>
                                                            <p className="text-xs text-gray-500">per unit</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedVendor(null)}
                                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Vendor Modal */}
            {showAddModal && (
                <AddVendorForm
                    onClose={() => {
                        setShowAddModal(false);
                        fetchVendors();
                    }}
                />
            )}
        </div>
    );
};

export default VendorDirectory;
