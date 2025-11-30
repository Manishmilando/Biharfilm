import React, { useState } from 'react';
import { Upload, X, Building2, Phone, Mail, MapPin, Globe, Package, Plus } from 'lucide-react';

const AddVendorForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        vendorName: '',
        category: '',
        phoneNumber: '',
        email: '',
        address: '',
        website: '',
        products: []
    });

    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        type: '',
        description: '',
        price: ''
    });

    const categories = [
        'Photography & Videography',
        'Catering Services',
        'Decorations & Lighting',
        'Music & Entertainment',
        'Transportation',
        'Venues & Locations',
        'Costumes & Makeup',
        'Equipment Rental',
        'Post-Production',
        'Other'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert('File size should be less than 10MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            setLogoFile(file);
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
        }
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addProduct = () => {
        if (currentProduct.name && currentProduct.type) {
            setFormData(prev => ({
                ...prev,
                products: [...prev.products, { ...currentProduct }]
            }));
            setCurrentProduct({
                name: '',
                type: '',
                description: '',
                price: ''
            });
            setShowProductForm(false);
        }
    };

    const removeProduct = (index) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        if (!formData.vendorName.trim()) {
            alert('Please enter vendor name');
            return false;
        }
        if (!formData.category) {
            alert('Please select a category');
            return false;
        }
        if (!formData.phoneNumber.trim()) {
            alert('Please enter phone number');
            return false;
        }
        if (!formData.email.trim()) {
            alert('Please enter email address');
            return false;
        }
        if (!formData.address.trim()) {
            alert('Please enter address');
            return false;
        }
        if (!logoFile) {
            alert('Please upload a logo');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = new FormData();

            submitData.append('vendorName', formData.vendorName.trim());
            submitData.append('category', formData.category);
            submitData.append('phoneNumber', formData.phoneNumber.trim());
            submitData.append('email', formData.email.trim());
            submitData.append('address', formData.address.trim());

            if (formData.website && formData.website.trim()) {
                submitData.append('website', formData.website.trim());
            }

            if (formData.products && formData.products.length > 0) {
                formData.products.forEach((product, index) => {
                    submitData.append(`products[${index}][name]`, product.name);
                    submitData.append(`products[${index}][type]`, product.type);
                    if (product.description) {
                        submitData.append(`products[${index}][description]`, product.description);
                    }
                    if (product.price) {
                        submitData.append(`products[${index}][price]`, product.price);
                    }
                });
            }

            submitData.append('logo', logoFile);

            const response = await fetch('https://biharfilmbackend-production.up.railway.app/api/vendor/addvendors', {
                method: 'POST',
                body: submitData,
            });

            if (!response.ok) {
                let errorMessage = `Server error: ${response.status} ${response.statusText}`;
                try {
                    const errorText = await response.text();
                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.message || errorMessage;
                    } catch {
                        errorMessage = errorText;
                    }
                } catch (textError) {
                    console.error('Could not read error response:', textError);
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();

            if (result.success) {
                alert('Vendor registered successfully!');
                if (onClose) onClose();
            } else {
                throw new Error(result.message || 'Registration failed');
            }

        } catch (error) {
            console.error('Submit error:', error);
            alert(`Registration failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#a92b4e] to-[#891737] px-6 py-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center space-x-3">
                        <Building2 className="w-6 h-6 text-white" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Add New Vendor</h2>
                            <p className="text-white/80 text-xs">Register a new vendor to the directory</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-6 custom-scrollbar">
                    <form onSubmit={handleSubmit}>
                        {/* Logo Upload Section */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Company Logo *
                            </label>
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    {logoPreview ? (
                                        <div className="w-24 h-24 rounded-lg border-2 border-gray-200 overflow-hidden">
                                            <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                                            <Upload className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                        id="logo-upload"
                                    />
                                    <label
                                        htmlFor="logo-upload"
                                        className="inline-flex items-center px-4 py-2 bg-[#a92b4e] text-white rounded-lg hover:bg-[#891737] transition-colors cursor-pointer text-sm"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Logo
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Building2 className="w-4 h-4 inline mr-1" />
                                    Vendor Name *
                                </label>
                                <input
                                    type="text"
                                    name="vendorName"
                                    value={formData.vendorName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent transition-all text-sm"
                                    placeholder="Enter company name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent transition-all text-sm"
                                >
                                    <option value="">Select category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent transition-all text-sm"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent transition-all text-sm"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    Address *
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={2}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent transition-all resize-none text-sm"
                                    placeholder="Enter complete address"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Globe className="w-4 h-4 inline mr-1" />
                                    Website (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent transition-all text-sm"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-md font-semibold text-gray-800 flex items-center">
                                    <Package className="w-4 h-4 mr-2" />
                                    Products & Services (Optional)
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowProductForm(true)}
                                    className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                                >
                                    <Plus className="w-3 h-3 mr-1.5" />
                                    Add Product
                                </button>
                            </div>

                            {/* Product List */}
                            {formData.products.length > 0 && (
                                <div className="space-y-3 mb-4">
                                    {formData.products.map((product, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                                                    <p className="text-xs text-gray-600 mt-0.5">Type: {product.type}</p>
                                                    {product.description && (
                                                        <p className="text-xs text-gray-600 mt-0.5">{product.description}</p>
                                                    )}
                                                    {product.price && (
                                                        <p className="text-xs font-medium text-green-600 mt-0.5">₹{product.price}</p>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(index)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Product Form */}
                            {showProductForm && (
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Add New Product/Service</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Product Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={currentProduct.name}
                                                onChange={handleProductChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent text-sm"
                                                placeholder="Enter product name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Product Type *
                                            </label>
                                            <input
                                                type="text"
                                                name="type"
                                                value={currentProduct.type}
                                                onChange={handleProductChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent text-sm"
                                                placeholder="e.g., Service, Equipment"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={currentProduct.description}
                                                onChange={handleProductChange}
                                                rows={2}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent resize-none text-sm"
                                                placeholder="Brief description"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Price (₹)
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={currentProduct.price}
                                                onChange={handleProductChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a92b4e] focus:border-transparent text-sm"
                                                placeholder="Enter price"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3 mt-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowProductForm(false);
                                                setCurrentProduct({ name: '', type: '', description: '', price: '' });
                                            }}
                                            className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-xs"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={addProduct}
                                            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
                                        >
                                            Add Product
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm mr-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-[#a92b4e] hover:bg-[#891737] text-white rounded-lg font-medium shadow-md shadow-[#a92b4e]/20 flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95 text-sm"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Vendor'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVendorForm;
