"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Upload, Eye, EyeOff } from "lucide-react"
import { apiService } from "../../services/api"

export function SupplierRegistration({ onBackToLogin, onShowToast }) {
  const [formData, setFormData] = useState({
    // Account Information (required for User model)
    username: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Company Information (required for Supplier model)
    companyName: "",
    contactPerson: "",
    phone: "",

    // Optional Company Information
    businessLicense: "",
    taxId: "",
    website: "",
    companyType: "",
    alternatePhone: "",

    // Address Information (optional)
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Business Details (optional)
    businessCategory: "",
    yearsInBusiness: "",
    annualRevenue: "",
    paymentTerms: "",
    notes: "",

    // Documents (optional - not implemented in backend yet)
    companyLogo: null,
    businessCertificate: null,
    taxCertificate: null,

    // Terms (required)
    agreeToTerms: false,
    agreeToPrivacy: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (field, file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setErrors((prev) => ({ ...prev, [field]: "File size must be less than 5MB" }))
      return
    }
    setFormData((prev) => ({ ...prev, [field]: file }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      // Company information - only companyName is required, others are optional
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required"
      // Make business license and tax ID optional
      // if (!formData.businessLicense.trim()) newErrors.businessLicense = "Business license is required"
      // if (!formData.taxId.trim()) newErrors.taxId = "Tax ID is required"
      // if (!formData.companyType) newErrors.companyType = "Company type is required"
    }

    if (step === 2) {
      // Contact information - contactPerson, email, and phone are required
      if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      // Make address fields optional
      // if (!formData.address.trim()) newErrors.address = "Address is required"
      // if (!formData.city.trim()) newErrors.city = "City is required"
      // if (!formData.state.trim()) newErrors.state = "State is required"
      // if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
      // if (!formData.country.trim()) newErrors.country = "Country is required"
    }

    if (step === 3) {
      // Business details are optional
      // if (!formData.businessCategory) newErrors.businessCategory = "Business category is required"
      // if (!formData.yearsInBusiness) newErrors.yearsInBusiness = "Years in business is required"
    }

    if (step === 4) {
      // Account setup - add username validation
      if (!formData.username.trim()) newErrors.username = "Username is required"
      else if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters"
      if (!formData.password) newErrors.password = "Password is required"
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"
      if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the privacy policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep(4)) return

    setIsSubmitting(true)

    try {
      // Prepare data for API call - map frontend fields to backend expected fields
      const registrationData = {
        // User account data (required)
        username: formData.username,
        email: formData.email,
        password: formData.password,

        // Supplier profile data (required fields)
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        phone: formData.phone,

        // Optional fields - only send if they have values
        ...(formData.businessLicense && { businessLicense: formData.businessLicense }),
        ...(formData.taxId && { taxId: formData.taxId }),
        ...(formData.website && { website: formData.website }),
        ...(formData.companyType && { companyType: formData.companyType }),
        ...(formData.alternatePhone && { alternatePhone: formData.alternatePhone }),
        ...(formData.address && { address: formData.address }),
        ...(formData.city && { city: formData.city }),
        ...(formData.state && { state: formData.state }),
        ...(formData.zipCode && { zipCode: formData.zipCode }),
        ...(formData.country && { country: formData.country }),
        ...(formData.businessCategory && { businessCategory: formData.businessCategory }),
        ...(formData.yearsInBusiness && { yearsInBusiness: formData.yearsInBusiness }),
        ...(formData.annualRevenue && { annualRevenue: formData.annualRevenue }),
        ...(formData.paymentTerms && { paymentTerms: formData.paymentTerms }),
        ...(formData.notes && { notes: formData.notes }),
      }

      // Call the API
      const response = await apiService.registerSupplier(registrationData)

      // Show success message
      onShowToast(
        response.message || "Registration submitted successfully! Your account is pending approval.",
        "success"
      )

      // Redirect to login after successful registration
      setTimeout(() => {
        onBackToLogin()
      }, 2000)
    } catch (error) {
      console.error("Registration error:", error)
      // Show error message from API response or fallback
      const errorMessage = error.message || "Registration failed. Please try again."
      onShowToast(errorMessage, "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
        <p className="text-gray-600">Tell us about your company</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            placeholder="Enter company name"
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business License Number *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.businessLicense ? "border-red-500" : "border-gray-300"}`}
            value={formData.businessLicense}
            onChange={(e) => handleInputChange("businessLicense", e.target.value)}
            placeholder="Enter business license number"
          />
          {errors.businessLicense && <p className="text-red-500 text-sm mt-1">{errors.businessLicense}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.taxId ? "border-red-500" : "border-gray-300"}`}
            value={formData.taxId}
            onChange={(e) => handleInputChange("taxId", e.target.value)}
            placeholder="Enter tax ID"
          />
          {errors.taxId && <p className="text-red-500 text-sm mt-1">{errors.taxId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Type *</label>
          <select
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.companyType ? "border-red-500" : "border-gray-300"}`}
            value={formData.companyType}
            onChange={(e) => handleInputChange("companyType", e.target.value)}
          >
            <option value="">Select company type</option>
            <option value="corporation">Corporation</option>
            <option value="llc">LLC</option>
            <option value="partnership">Partnership</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
            <option value="other">Other</option>
          </select>
          {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="https://www.yourcompany.com"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Contact & Address Information</h2>
        <p className="text-gray-600">How can we reach you?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.contactPerson ? "border-red-500" : "border-gray-300"}`}
            value={formData.contactPerson}
            onChange={(e) => handleInputChange("contactPerson", e.target.value)}
            placeholder="Enter contact person name"
          />
          {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter email address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.alternatePhone}
            onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
            placeholder="Enter alternate phone number"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
          <textarea
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
            rows="3"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Enter complete address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.city ? "border-red-500" : "border-gray-300"}`}
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Enter city"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.state ? "border-red-500" : "border-gray-300"}`}
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            placeholder="Enter state"
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.zipCode ? "border-red-500" : "border-gray-300"}`}
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            placeholder="Enter ZIP code"
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
          <select
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.country ? "border-red-500" : "border-gray-300"}`}
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
          >
            <option value="">Select country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="other">Other</option>
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Business Details & Documents</h2>
        <p className="text-gray-600">Tell us more about your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Category *</label>
          <select
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.businessCategory ? "border-red-500" : "border-gray-300"}`}
            value={formData.businessCategory}
            onChange={(e) => handleInputChange("businessCategory", e.target.value)}
          >
            <option value="">Select category</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="wholesale">Wholesale</option>
            <option value="retail">Retail</option>
            <option value="services">Services</option>
            <option value="technology">Technology</option>
            <option value="construction">Construction</option>
            <option value="food-beverage">Food & Beverage</option>
            <option value="textiles">Textiles</option>
            <option value="automotive">Automotive</option>
            <option value="other">Other</option>
          </select>
          {errors.businessCategory && <p className="text-red-500 text-sm mt-1">{errors.businessCategory}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business *</label>
          <select
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.yearsInBusiness ? "border-red-500" : "border-gray-300"}`}
            value={formData.yearsInBusiness}
            onChange={(e) => handleInputChange("yearsInBusiness", e.target.value)}
          >
            <option value="">Select years</option>
            <option value="0-1">0-1 years</option>
            <option value="2-5">2-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-20">11-20 years</option>
            <option value="20+">20+ years</option>
          </select>
          {errors.yearsInBusiness && <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.annualRevenue}
            onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
          >
            <option value="">Select range</option>
            <option value="0-100k">$0 - $100K</option>
            <option value="100k-500k">$100K - $500K</option>
            <option value="500k-1m">$500K - $1M</option>
            <option value="1m-5m">$1M - $5M</option>
            <option value="5m+">$5M+</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload("companyLogo", e.target.files[0])}
                className="hidden"
                id="companyLogo"
              />
              <label htmlFor="companyLogo" className="cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.companyLogo ? formData.companyLogo.name : "Upload Logo"}
                </p>
              </label>
            </div>
            {errors.companyLogo && <p className="text-red-500 text-sm mt-1">{errors.companyLogo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Certificate</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload("businessCertificate", e.target.files[0])}
                className="hidden"
                id="businessCertificate"
              />
              <label htmlFor="businessCertificate" className="cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.businessCertificate ? formData.businessCertificate.name : "Upload Certificate"}
                </p>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Certificate</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload("taxCertificate", e.target.files[0])}
                className="hidden"
                id="taxCertificate"
              />
              <label htmlFor="taxCertificate" className="cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.taxCertificate ? formData.taxCertificate.name : "Upload Tax Certificate"}
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Account Setup & Terms</h2>
        <p className="text-gray-600">Create your account credentials</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.username ? "border-red-500" : "border-gray-300"}`}
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            placeholder="Enter username (min 3 characters)"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password (min 8 characters)"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeToTerms"
            className="mt-1 mr-3"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Terms and Conditions
            </a>{" "}
            *
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeToPrivacy"
            className="mt-1 mr-3"
            checked={formData.agreeToPrivacy}
            onChange={(e) => handleInputChange("agreeToPrivacy", e.target.checked)}
          />
          <label htmlFor="agreeToPrivacy" className="text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Privacy Policy
            </a>{" "}
            *
          </label>
        </div>
        {errors.agreeToPrivacy && <p className="text-red-500 text-sm">{errors.agreeToPrivacy}</p>}
      </div>
    </div>
  )

  const steps = [
    { number: 1, title: "Company Info", component: renderStep1 },
    { number: 2, title: "Contact & Address", component: renderStep2 },
    { number: 3, title: "Business Details", component: renderStep3 },
    { number: 4, title: "Account Setup", component: renderStep4 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="px-8 py-6 border-b">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Supplier Registration</h1>
              <p className="text-gray-600 mt-2">Join our supplier network</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        currentStep >= step.number ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`ml-2 text-sm ${
                        currentStep >= step.number ? "text-purple-600 font-medium" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-0.5 ml-4 ${currentStep > step.number ? "bg-purple-600" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-8 py-6">
            {steps[currentStep - 1].component()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <div>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrevious} className="px-6 bg-transparent">
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={onBackToLogin} className="px-6 bg-transparent">
                  Back to Login
                </Button>

                {currentStep < 4 ? (
                  <Button type="button" onClick={handleNext} className="px-6 bg-purple-600 hover:bg-purple-700">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="px-6 bg-purple-600 hover:bg-purple-700">
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
