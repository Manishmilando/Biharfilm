import React, { useState, useEffect } from "react";
import { 
  Building2, Package, Star, Eye, MessageCircle, Calendar, MapPin, Phone, Mail, Globe,
  Edit3, Plus, BarChart3, X, Save, Loader, AlertCircle, CheckCircle, User, Camera,
  Image as ImageIcon, DollarSign
} from "lucide-react";
import AlertBox from "../Components/AlertBox"; // ✅ Import AlertBox

const VendorDashboard = () => {
  const [vendorId, setVendorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);

  const [vendorData, setVendorData] = useState({
    id: null,
    vendorName: "",
    category: "",
    phoneNumber: "",
    email: "",
    address: "",
    website: "",
    logoUrl: "",
    products: [],
    createdAt: new Date().toISOString()
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalViews: 1247,
    totalInquiries: 89,
    averageRating: 4.6,
    monthlyRevenue: 125000,
    activeBookings: 7
  });

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);

  const [productFormData, setProductFormData] = useState({
    name: '',
    type: '',
    description: '',
    price: ''
  });

  const [profileFormData, setProfileFormData] = useState({
    vendorName: '',
    category: '',
    phoneNumber: '',
    email: '',
    address: '',
    website: ''
  });

  // ✅ Alert state
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

  const API_BASE_URL = "https://biharfilmbackend-production.up.railway.app/api/vendor";
  const API_BASE_URL_PRODUCTS = "https://biharfilmbackend-production.up.railway.app/api/vendorproduct";
  const token = localStorage.getItem("authToken");

  // ✅ Alert helper function
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
    const fetchVendorProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          setError("Please login first to access vendor dashboard");
          setLoading(false);
          return;
        }

        console.log("📡 Fetching vendor profile by userId...");

        const response = await fetch(`${API_BASE_URL}/myVendorProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Vendor profile fetched:", result.data);

          setVendorData(result.data);
          setVendorId(result.data.id);
          
          setStats(prev => ({
            ...prev,
            totalProducts: result.data.products?.length || 0
          }));

          setProfileFormData({
            vendorName: result.data.vendorName || '',
            category: result.data.category || '',
            phoneNumber: result.data.phoneNumber || '',
            email: result.data.email || '',
            address: result.data.address || '',
            website: result.data.website || ''
          });

          if (result.data.logoUrl) {
            setLogoPreview(result.data.logoUrl);
          }
        } else if (response.status === 404) {
          console.log("❌ No vendor profile found - showing profile creation");
          setVendorId(null);
          setError(null);
        } else if (response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("authToken");
          
          showAlert({
            type: "error",
            title: "Session Expired",
            message: "Your session has expired. Please login again.",
            confirmText: "Login",
            onConfirm: () => {
              window.location.href = "/login";
            }
          });
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching vendor profile:", err);
        setError("Failed to load vendor profile. Please try again.");
        
        showAlert({
          type: "error",
          title: "Failed to Load Profile",
          message: "Unable to load your vendor profile. Please try again.",
          confirmText: "Retry",
          onConfirm: () => {
            window.location.reload();
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, [token]);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setProfileUpdateLoading(true);

    try {
      if (!profileFormData.vendorName || !profileFormData.category || !profileFormData.phoneNumber || !profileFormData.email || !profileFormData.address) {
        showAlert({
          type: "warning",
          title: "Missing Fields",
          message: "Please fill in all required fields",
          confirmText: "OK"
        });
        setProfileUpdateLoading(false);
        return;
      }

      if (!logoFile) {
        showAlert({
          type: "warning",
          title: "Logo Required",
          message: "Please upload a logo for your vendor profile",
          confirmText: "OK"
        });
        setProfileUpdateLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('vendorName', profileFormData.vendorName);
      formData.append('category', profileFormData.category);
      formData.append('phoneNumber', profileFormData.phoneNumber);
      formData.append('email', profileFormData.email);
      formData.append('address', profileFormData.address);
      formData.append('website', profileFormData.website || '');
      formData.append('logo', logoFile);

      console.log("📤 Creating new vendor...");

      const response = await fetch(`${API_BASE_URL}/addvendors`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Vendor created:", result.data);

        setVendorId(result.data.id);
        setVendorData(result.data);
        setShowEditProfileModal(false);
        setLogoPreview(null);
        setLogoFile(null);

        showAlert({
          type: "success",
          title: "Profile Created!",
          message: "Your vendor profile has been created successfully. Now add your products!",
          confirmText: "Great!",
          autoClose: true,
          duration: 3000
        });
      } else if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create profile');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create profile');
      }
    } catch (err) {
      console.error("Error creating profile:", err);
      showAlert({
        type: "error",
        title: "Creation Failed",
        message: `Failed to create profile: ${err.message}`,
        confirmText: "OK"
      });
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileUpdateLoading(true);

    try {
      if (!profileFormData.vendorName || !profileFormData.category || !profileFormData.phoneNumber || !profileFormData.email || !profileFormData.address) {
        showAlert({
          type: "warning",
          title: "Missing Fields",
          message: "Please fill in all required fields",
          confirmText: "OK"
        });
        setProfileUpdateLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('vendorName', profileFormData.vendorName);
      formData.append('category', profileFormData.category);
      formData.append('phoneNumber', profileFormData.phoneNumber);
      formData.append('email', profileFormData.email);
      formData.append('address', profileFormData.address);
      formData.append('website', profileFormData.website || '');

      if (logoFile) {
        formData.append('logo', logoFile);
      }

      console.log("📤 Updating vendor profile...");

      const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Vendor updated:", result.data);

        setVendorData(result.data);
        setShowEditProfileModal(false);
        setLogoPreview(null);
        setLogoFile(null);

        showAlert({
          type: "success",
          title: "Profile Updated!",
          message: "Your profile has been updated successfully.",
          confirmText: "Great!",
          autoClose: true,
          duration: 3000
        });
      } else if (response.status === 403) {
        showAlert({
          type: "error",
          title: "Unauthorized",
          message: "You cannot update this vendor profile.",
          confirmText: "OK"
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      showAlert({
        type: "error",
        title: "Update Failed",
        message: `Failed to update profile: ${err.message}`,
        confirmText: "OK"
      });
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!productFormData.name || !productFormData.type || !productFormData.description) {
        showAlert({
          type: "warning",
          title: "Missing Fields",
          message: "Please fill in all required fields (Name, Type, Description)",
          confirmText: "OK"
        });
        setIsSubmitting(false);
        return;
      }

      if (!vendorId) {
        showAlert({
          type: "warning",
          title: "Profile Required",
          message: "Please create your vendor profile first",
          confirmText: "OK"
        });
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('name', productFormData.name);
      formData.append('type', productFormData.type);
      formData.append('description', productFormData.description);
      formData.append('price', productFormData.price ? parseFloat(productFormData.price) : 0);

      if (productImageFile) {
        formData.append('image', productImageFile);
      }

      console.log("📤 Adding product to vendor:", vendorId);

      const response = await fetch(`${API_BASE_URL_PRODUCTS}/vendors/${vendorId}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Product added:", result.data);

        const refreshResponse = await fetch(`${API_BASE_URL}/myVendorProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (refreshResponse.ok) {
          const refreshResult = await refreshResponse.json();
          setVendorData(refreshResult.data);
          setStats(prev => ({
            ...prev,
            totalProducts: refreshResult.data.products?.length || 0
          }));
        }

        setProductFormData({ name: '', type: '', description: '', price: '' });
        setProductImagePreview(null);
        setProductImageFile(null);
        setShowAddProductModal(false);

        showAlert({
          type: "success",
          title: "Product Added!",
          message: "Your product has been added successfully.",
          confirmText: "Great!",
          autoClose: true,
          duration: 3000
        });
      } else if (response.status === 403) {
        showAlert({
          type: "error",
          title: "Unauthorized",
          message: "You cannot add products to this vendor.",
          confirmText: "OK"
        });
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to add product: ${response.status}`);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      showAlert({
        type: "error",
        title: "Failed to Add Product",
        message: `Failed to add product: ${err.message}`,
        confirmText: "OK"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    showAlert({
      type: "warning",
      title: "Delete Product?",
      message: "Are you sure you want to delete this product? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      showCancel: true,
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_BASE_URL_PRODUCTS}/products/${productId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            console.log("✅ Product deleted");
            
            const refreshResponse = await fetch(`${API_BASE_URL}/myVendorProfile`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (refreshResponse.ok) {
              const refreshResult = await refreshResponse.json();
              setVendorData(refreshResult.data);
              setStats(prev => ({
                ...prev,
                totalProducts: refreshResult.data.products?.length || 0
              }));
            }

            showAlert({
              type: "success",
              title: "Product Deleted!",
              message: "Product has been deleted successfully.",
              confirmText: "OK",
              autoClose: true,
              duration: 3000
            });
          } else if (response.status === 403) {
            showAlert({
              type: "error",
              title: "Unauthorized",
              message: "You cannot delete this product.",
              confirmText: "OK"
            });
          } else {
            throw new Error('Failed to delete product');
          }
        } catch (err) {
          console.error("Error deleting product:", err);
          showAlert({
            type: "error",
            title: "Delete Failed",
            message: `Failed to delete product: ${err.message}`,
            confirmText: "OK"
          });
        }
      }
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlert({
          type: "warning",
          title: "File Too Large",
          message: "File must be less than 5MB. Please choose a smaller image.",
          confirmText: "OK"
        });
        return;
      }

      setLogoFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlert({
          type: "warning",
          title: "File Too Large",
          message: "File must be less than 5MB. Please choose a smaller image.",
          confirmText: "OK"
        });
        return;
      }

      setProductImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData(prev => ({ ...prev, [name]: value }));
  };

  const getStatColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
    };
    return colorMap[color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#a92b4e] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600">Fetching your profile...</p>
        </div>
      </div>
    );
  }

  if (error && vendorId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-lg bg-white rounded-xl p-6 shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#a92b4e] hover:bg-[#891737] text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
if (!vendorId) {
  return (
    <>

      <AlertBox {...alertConfig} onClose={closeAlert} />

      {/* Main screen */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-lg bg-white rounded-xl p-6 shadow-lg">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Create Your Vendor Profile</h2>
          <p className="text-gray-600 mb-4">Set up your vendor profile to start showcasing your products!</p>
          <button
            onClick={() => setShowEditProfileModal(true)}
            className="bg-[#a92b4e] hover:bg-[#891737] text-white px-6 py-2 rounded-lg"
          >
            + Create Profile
          </button>
        </div>
      </div>

      {/* ✅ ADD MODAL HERE - Inside the same return block */}
      {showEditProfileModal && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#a92b4e] text-white rounded-t-xl">
              <h2 className="font-bold">{vendorId ? 'Edit Profile' : 'Create Profile'}</h2>
              <button onClick={() => setShowEditProfileModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={vendorId ? handleUpdateProfile : handleCreateProfile} className="p-4 space-y-4">
              <div className="text-center">
                <label className="cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#a92b4e] to-[#891737] flex items-center justify-center overflow-hidden mx-auto">
                    {logoPreview || vendorData.logoUrl ? (
                      <img src={logoPreview || vendorData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm font-medium mt-2">Click to upload logo</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name *</label>
                  <input
                    type="text"
                    name="vendorName"
                    value={profileFormData.vendorName}
                    onChange={handleProfileInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={profileFormData.category}
                    onChange={handleProfileInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Photography & Videography">Photography & Videography</option>
                    <option value="Equipment Rental">Equipment Rental</option>
                    <option value="Production Services">Production Services</option>
                    <option value="Post Production">Post Production</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profileFormData.phoneNumber}
                    onChange={handleProfileInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={profileFormData.email}
                    onChange={handleProfileInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent"
                    placeholder="vendor@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  name="address"
                  value={profileFormData.address}
                  onChange={handleProfileInputChange}
                  required
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent resize-none"
                  placeholder="Complete address..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  name="website"
                  value={profileFormData.website}
                  onChange={handleProfileInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={profileUpdateLoading}
                  className="flex-1 bg-[#a92b4e] hover:bg-[#891737] text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {profileUpdateLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {profileUpdateLoading ? 'Saving...' : (vendorId ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* ✅ Custom Alert Component */}
      <AlertBox
        {...alertConfig}
        onClose={closeAlert}
      />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#a92b4e] to-[#891737] flex items-center justify-center overflow-hidden">
                  {vendorData.logoUrl ? (
                    <img src={vendorData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                {vendorId && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {vendorData.vendorName || "Set up your profile"}
                </h1>
                <p className="text-gray-600">
                  {vendorData.category || "Select category"} • Member since {new Date(vendorData.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {vendorData.address || "Add address"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowEditProfileModal(true)}
              className="bg-[#a92b4e] hover:bg-[#891737] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              {vendorId ? 'Edit Profile' : 'Create Profile'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { label: "Products", value: stats.totalProducts, icon: Package, color: "blue" },
            { label: "Views", value: stats.totalViews.toLocaleString(), icon: Eye, color: "green" },
            { label: "Inquiries", value: stats.totalInquiries, icon: MessageCircle, color: "purple" },
            { label: "Rating", value: stats.averageRating, icon: Star, color: "yellow" },
            { label: "Revenue", value: `₹${(stats.monthlyRevenue/1000)}K`, icon: DollarSign, color: "red" },
            { label: "Bookings", value: stats.activeBookings, icon: Calendar, color: "orange" }
          ].map((stat, index) => {
            const colors = getStatColorClasses(stat.color);
            return (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Products</h2>
              {vendorId && (
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="bg-[#a92b4e] hover:bg-[#891737] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              )}
            </div>

            <div className="space-y-3">
              {vendorData.products && vendorData.products.length > 0 ? (
                vendorData.products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.imageUrl || "/api/placeholder/48/48"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.type}</p>
                      <p className="text-xs text-gray-500 mt-1">{product.description.substring(0, 50)}...</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {product.price ? `₹${product.price.toLocaleString()}` : 'Price not set'}
                      </p>
                      {vendorId && (
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 text-xs hover:underline mt-1"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">No products yet</h3>
                  <p className="text-gray-600 mb-4">
                    {vendorId ? 'Add your first product to get started' : 'Create your vendor profile first'}
                  </p>
                  {vendorId && (
                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="bg-[#a92b4e] hover:bg-[#891737] text-white px-4 py-2 rounded-lg"
                    >
                      Add Product
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              {[
                { icon: Phone, label: "Phone", value: vendorData.phoneNumber || "Add phone" },
                { icon: Mail, label: "Email", value: vendorData.email || "Add email" },
                { icon: Globe, label: "Website", value: vendorData.website || "Add website" },
                { icon: Building2, label: "Category", value: vendorData.category || "Select category" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#a92b4e]/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-[#a92b4e]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && vendorId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#a92b4e] text-white rounded-t-xl">
              <h2 className="font-bold">Add New Product</h2>
              <button onClick={() => setShowAddProductModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="p-4 space-y-4">
              <div className="text-center">
                <label className="cursor-pointer">
                  <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 mx-auto">
                    {productImagePreview ? (
                      <img src={productImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={productFormData.name}
                    onChange={handleProductInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent"
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    name="type"
                    value={productFormData.type}
                    onChange={handleProductInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Sound">Sound</option>
                    <option value="Props">Props</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={productFormData.description}
                  onChange={handleProductInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent resize-none"
                  placeholder="Product description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={productFormData.price}
                  onChange={handleProductInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#a92b4e] hover:bg-[#891737] text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}    
    </div>
  );
};

export default VendorDashboard;
