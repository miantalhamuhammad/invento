"use client"

import { useState } from "react"
import { Camera, Save, Edit, Building, Mail, Phone, MapPin, Globe, FileText, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useGetSupplierProfileQuery, useUpdateSupplierProfileMutation } from "../../redux/services/supplier"

export function ProfilePage({ onShowToast }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({})

  // API queries
  const { data: profileResponse, isLoading, error, refetch } = useGetSupplierProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateSupplierProfileMutation()

  const supplier = profileResponse?.data

  // Initialize profile data when supplier data is loaded
  useState(() => {
    if (supplier) {
      setProfileData({
        supplier_name: supplier.supplier_name || "",
        contact_person: supplier.contact_person || "",
        email: supplier.email || "",
        phone_number: supplier.phone_number || "",
        address: supplier.address || "",
        city: supplier.city || "",
        state: supplier.state || "",
        zip_code: supplier.zip_code || "",
        country: supplier.country || "",
        website: supplier.website || "",
        tax_id: supplier.tax_id || "",
        payment_terms: supplier.payment_terms || "",
        category: supplier.category || "",
        notes: supplier.notes || "",
      })
    }
  }, [supplier])
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Preview in UI
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result); // base64 string
      };
      reader.readAsDataURL(file);

      // Or upload to backend with FormData if needed
      // const formData = new FormData();
      // formData.append("logo", file);
      // await fetch("/api/upload", { method: "POST", body: formData });
    }
  };
  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      await updateProfile(profileData).unwrap()
      setIsEditing(false)
      onShowToast("Profile updated successfully!", "success")
      refetch() // Refresh the profile data
    } catch (error) {
      console.error("Error updating profile:", error)
      onShowToast(error?.data?.message || "Failed to update profile", "error")
    }
  }

  const handleCancel = () => {
    // Reset form data to original values
    if (supplier) {
      setProfileData({
        supplier_name: supplier.supplier_name || "",
        contact_person: supplier.contact_person || "",
        email: supplier.email || "",
        phone_number: supplier.phone_number || "",
        address: supplier.address || "",
        city: supplier.city || "",
        state: supplier.state || "",
        zip_code: supplier.zip_code || "",
        country: supplier.country || "",
        website: supplier.website || "",
        tax_id: supplier.tax_id || "",
        payment_terms: supplier.payment_terms || "",
        category: supplier.category || "",
        notes: supplier.notes || "",
      })
    }
    setIsEditing(false)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600 mb-4">Error loading profile: {error?.data?.message || error.message}</p>
        <Button onClick={refetch} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  if (!supplier) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-600 mb-4">No supplier profile found</p>
        <Button onClick={refetch} variant="outline">
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600">Manage your company information and settings</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Logo and Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={supplier?.logo_url || "/placeholder.svg"}
                  alt="Company Logo"
                  className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
                />
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{supplier.supplier_name}</h3>
              <p className="text-gray-600">{supplier.category}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  {supplier.company_type}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <FileText className="h-4 w-4 mr-2" />
                  {supplier.years_in_business}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Account Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Verification Status</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Account Type</span>
                <span className="text-sm font-medium text-gray-900">Premium Supplier</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm text-gray-900">January 2020</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.supplier_name}
                    onChange={(e) => handleInputChange("supplier_name", e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2">{supplier.supplier_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business License</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.businessLicense}
                    onChange={(e) => handleInputChange("businessLicense", e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2">{supplier.businessLicense}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.tax_id}
                    onChange={(e) => handleInputChange("tax_id", e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2">{supplier.tax_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                ) : (
                  <div className="flex items-center py-2">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`https://${supplier.website}`} className="text-sm text-purple-600 hover:underline">
                      {supplier.website}
                    </a>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
                {isEditing ? (
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.companyType}
                    onChange={(e) => handleInputChange("companyType", e.target.value)}
                  >
                    <option value="Corporation">Corporation</option>
                    <option value="LLC">LLC</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-900 py-2">{supplier.company_type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Category</label>
                {isEditing ? (
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                  >
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Retail">Retail</option>
                    <option value="Services">Services</option>
                    <option value="Technology">Technology</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-900 py-2">{supplier.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.contact_person}
                    onChange={(e) => handleInputChange("contact_person", e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2">{supplier.contact_person}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  <div className="flex items-center py-2">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <p className="text-sm text-gray-900">{supplier.email}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.phone_number}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                  />
                ) : (
                  <div className="flex items-center py-2">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <p className="text-sm text-gray-900">{supplier.phone_number}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.alternatePhone}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                  />
                ) : (
                  <div className="flex items-center py-2">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <p className="text-sm text-gray-900">{supplier.alternatePhone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                {isEditing ? (
                  <textarea
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                ) : (
                  <div className="flex items-start py-2">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                    <p className="text-sm text-gray-900">{supplier.address}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={profileData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{supplier.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={profileData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{supplier.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={profileData.zip_code}
                      onChange={(e) => handleInputChange("zip_code", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{supplier.zip_code}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  {isEditing ? (
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={profileData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-900 py-2">{supplier.country}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
