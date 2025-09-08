import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Star, 
  Eye, 
  MessageCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit3,
  Plus,
  BarChart3,
  ShoppingBag
} from "lucide-react";

const VendorDashboard = () => {
  const [vendorData, setVendorData] = useState({
    name: "Bihar Film Productions",
    email: "contact@biharfilm.com",
    phone: "+91 9876543210",
    address: "Patna, Bihar, India",
    website: "https://biharfilm.com",
    categories: ["Photography & Videography", "Equipment Rental"],
    joinDate: "2024-01-15",
    logoUrl: "/api/placeholder/80/80"
  });

  const [stats, setStats] = useState({
    totalProducts: 24,
    totalViews: 1247,
    totalInquiries: 89,
    averageRating: 4.6,
    monthlyRevenue: 125000,
    activeBookings: 7
  });

  const [recentProducts, setRecentProducts] = useState([
    {
      id: 1,
      name: "Professional Camera Kit",
      category: "Photography & Videography",
      type: "Cameras",
      price: 5000,
      views: 156,
      inquiries: 12,
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "LED Lighting Setup",
      category: "Equipment Rental", 
      type: "Lighting",
      price: 3000,
      views: 89,
      inquiries: 8,
      image: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Audio Recording Equipment",
      category: "Equipment Rental",
      type: "Sound",
      price: 2500,
      views: 134,
      inquiries: 15,
      image: "/api/placeholder/60/60"
    }
  ]);

  const [recentInquiries, setRecentInquiries] = useState([
    {
      id: 1,
      customerName: "Raj Productions",
      productName: "Professional Camera Kit",
      message: "Need this for a 3-day shoot. What's your availability?",
      date: "2025-09-06",
      status: "pending"
    },
    {
      id: 2,
      customerName: "Mumbai Films",
      productName: "LED Lighting Setup",
      message: "Looking for bulk rental for movie production.",
      date: "2025-09-05",
      status: "responded"
    },
    {
      id: 3,
      customerName: "Creative Studios",
      productName: "Audio Recording Equipment",
      message: "Is this available for next week?",
      date: "2025-09-04",
      status: "pending"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img 
                  src={vendorData.logoUrl} 
                  alt="Vendor Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{vendorData.name}</h1>
                <p className="text-gray-600">Member since {new Date(vendorData.joinDate).toLocaleDateString()}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {vendorData.address}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{stats.averageRating}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-[#a92b4e] hover:bg-[#f27d9c] text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeBookings}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Products */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Products</h2>
              <button className="bg-[#a92b4e] hover:bg-[#f27d9c] text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
            
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category} • {product.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {product.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {product.inquiries}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 text-[#a92b4e] hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
              View All Products
            </button>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
              <button className="text-[#a92b4e] hover:underline text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{inquiry.customerName}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inquiry.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{inquiry.productName}</p>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{inquiry.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(inquiry.date).toLocaleDateString()}
                    </span>
                    <button className="text-[#a92b4e] hover:underline text-xs font-medium">
                      Respond
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#a92b4e] hover:bg-[#a92b4e]/5 transition-colors">
              <div className="w-12 h-12 bg-[#a92b4e]/10 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-[#a92b4e]" />
              </div>
              <span className="text-sm font-medium text-gray-700">Add New Product</span>
            </button>
            
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#a92b4e] hover:bg-[#a92b4e]/5 transition-colors">
              <div className="w-12 h-12 bg-[#a92b4e]/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[#a92b4e]" />
              </div>
              <span className="text-sm font-medium text-gray-700">View Analytics</span>
            </button>
            
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#a92b4e] hover:bg-[#a92b4e]/5 transition-colors">
              <div className="w-12 h-12 bg-[#a92b4e]/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#a92b4e]" />
              </div>
              <span className="text-sm font-medium text-gray-700">Manage Inquiries</span>
            </button>
            
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#a92b4e] hover:bg-[#a92b4e]/5 transition-colors">
              <div className="w-12 h-12 bg-[#a92b4e]/10 rounded-lg flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-[#a92b4e]" />
              </div>
              <span className="text-sm font-medium text-gray-700">Update Profile</span>
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{vendorData.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{vendorData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <p className="font-medium text-gray-900">{vendorData.website}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="font-medium text-gray-900">{vendorData.categories.length} Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
