import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Link, useNavigate } from "react-router-dom"
import GoogleSignInButton from "../../components/ui/google-icon"
import { useState } from "react"
import { useRegisterCompanyMutation } from "../../redux/services/auth.js"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../../redux/slices/authSlice.js"

export default function RegisterPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [registerCompany, { isLoading }] = useRegisterCompanyMutation()
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        // Company data
        companyName: "",
        companyAddress: "",
        companyPhone: "",
        companyEmail: "",
        companyWebsite: "",
        // Admin user data
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        // Company validation
        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required"
        }

        // Admin user validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }
        if (!formData.username.trim()) {
            newErrors.username = "Username is required"
        }
        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "Please agree to the terms and conditions"
        }

        // Optional fields validation
        if (formData.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
            newErrors.companyEmail = "Please enter a valid company email"
        }
        if (formData.companyWebsite && !/^https?:\/\/.+/.test(formData.companyWebsite)) {
            newErrors.companyWebsite = "Please enter a valid website URL (http:// or https://)"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = async () => {
        if (!validateForm()) {
            return
        }

        setErrors({})

        try {
            const payload = {
                name: formData.companyName,
                address: formData.companyAddress || undefined,
                phone: formData.companyPhone || undefined,
                email: formData.companyEmail || undefined,
                website: formData.companyWebsite || undefined,
                adminUserData: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            }

            const response = await registerCompany(payload).unwrap()

            // Registration successful - dispatch login action to update Redux state
            console.log('Registration successful:', response)

            if (response.data) {
                // Dispatch loginSuccess to update auth state
                dispatch(loginSuccess({
                    user: response.data.user,
                    token: response.data.token
                }))

                // Navigate to dashboard
                navigate("/dashboard")
            } else {
                setErrors({ general: 'Registration successful but login data missing. Please try logging in.' })
            }

        } catch (error) {
            console.error('Registration error:', error)
            if (error.data?.errors && Array.isArray(error.data.errors)) {
                const validationErrors = {}
                error.data.errors.forEach(err => {
                    const field = err.path || err.param
                    if (field) {
                        validationErrors[field] = err.msg || err.message
                    }
                })
                setErrors(validationErrors)
            } else {
                setErrors({ general: error.data?.message || 'Registration failed. Please try again.' })
            }
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Panel */}
            <div className="hidden md:flex w-2/5 bg-[#6941c6] rounded-r-[60px] flex-col items-center justify-center p-8 relative">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center bg-white rounded-full px-8 py-4 mb-6">
            <span className="text-black text-4xl font-bold tracking-tight">
              Invento
              <span className="relative inline-block ml-1">
                <svg
                    className="inline-block"
                    width="24"
                    height="12"
                    viewBox="0 0 24 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="6" r="3" fill="black" />
                  <circle cx="18" cy="6" r="3" fill="black" />
                </svg>
              </span>
            </span>
                    </div>
                    <p className="text-white text-lg max-w-xs">
                        Re-imagining inventory management experience with advanced data analytics for optimum performance
                    </p>
                </div>
                <div className="absolute bottom-8 left-8 text-white text-sm">
                    © Invento 2025
                </div>
            </div>

            {/* Right Panel - Registration Form */}
            <div className="flex-1 flex items-center justify-center bg-white p-8 overflow-y-auto">
                <div className="w-full max-w-md space-y-6 py-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#101828]">Create company account</h1>
                        <p className="text-[#344054] mt-2">Start your inventory management journey today.</p>
                    </div>

                    {/* General Error */}
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                            {errors.general}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Company Information Section */}
                        <div className="space-y-4 border-b border-gray-200 pb-6">
                            <h3 className="text-lg font-medium text-[#101828]">Company Information</h3>

                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-[#344054] mb-1">
                                    Company Name *
                                </label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    placeholder="Enter company name"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className={`border-[#d0d5dd] ${errors.companyName ? 'border-red-300' : ''}`}
                                />
                                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                            </div>

                            <div>
                                <label htmlFor="companyAddress" className="block text-sm font-medium text-[#344054] mb-1">
                                    Company Address
                                </label>
                                <Input
                                    id="companyAddress"
                                    name="companyAddress"
                                    type="text"
                                    placeholder="Enter company address"
                                    value={formData.companyAddress}
                                    onChange={handleInputChange}
                                    className="border-[#d0d5dd]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="companyPhone" className="block text-sm font-medium text-[#344054] mb-1">
                                        Company Phone
                                    </label>
                                    <Input
                                        id="companyPhone"
                                        name="companyPhone"
                                        type="tel"
                                        placeholder="Phone number"
                                        value={formData.companyPhone}
                                        onChange={handleInputChange}
                                        className="border-[#d0d5dd]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="companyEmail" className="block text-sm font-medium text-[#344054] mb-1">
                                        Company Email
                                    </label>
                                    <Input
                                        id="companyEmail"
                                        name="companyEmail"
                                        type="email"
                                        placeholder="company@example.com"
                                        value={formData.companyEmail}
                                        onChange={handleInputChange}
                                        className={`border-[#d0d5dd] ${errors.companyEmail ? 'border-red-300' : ''}`}
                                    />
                                    {errors.companyEmail && <p className="text-red-500 text-xs mt-1">{errors.companyEmail}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="companyWebsite" className="block text-sm font-medium text-[#344054] mb-1">
                                    Company Website
                                </label>
                                <Input
                                    id="companyWebsite"
                                    name="companyWebsite"
                                    type="url"
                                    placeholder="https://www.example.com"
                                    value={formData.companyWebsite}
                                    onChange={handleInputChange}
                                    className={`border-[#d0d5dd] ${errors.companyWebsite ? 'border-red-300' : ''}`}
                                />
                                {errors.companyWebsite && <p className="text-red-500 text-xs mt-1">{errors.companyWebsite}</p>}
                            </div>
                        </div>

                        {/* Admin User Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#101828]">Admin User Information</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-[#344054] mb-1">
                                        First Name *
                                    </label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="First name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`border-[#d0d5dd] ${errors.firstName ? 'border-red-300' : ''}`}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-[#344054] mb-1">
                                        Last Name *
                                    </label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`border-[#d0d5dd] ${errors.lastName ? 'border-red-300' : ''}`}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-[#344054] mb-1">
                                        Username *
                                    </label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`border-[#d0d5dd] ${errors.username ? 'border-red-300' : ''}`}
                                    />
                                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#344054] mb-1">
                                        Email *
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="user@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`border-[#d0d5dd] ${errors.email ? 'border-red-300' : ''}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#344054] mb-1">
                                    Password *
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`border-[#d0d5dd] ${errors.password ? 'border-red-300' : ''}`}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#344054] mb-1">
                                    Confirm Password *
                                </label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`border-[#d0d5dd] ${errors.confirmPassword ? 'border-red-300' : ''}`}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div className="flex items-start space-x-2 text-sm">
                            <Checkbox
                                id="terms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={(e) => handleInputChange(e)}
                                onCheckedChange={(checked) => handleInputChange({ target: { name: 'agreeToTerms', type: 'checkbox', checked } })}
                                className={`border-[#d0d5dd] mt-0.5 ${errors.agreeToTerms ? 'border-red-300' : ''}`}
                            />
                            <label htmlFor="terms" className="text-[#667085] leading-5">
                                I agree to the{" "}
                                <Link to="#" className="text-[#6941c6] font-medium hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="#" className="text-[#6941c6] font-medium hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                        {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}

                        <Button
                            className="w-full bg-[#6941c6] text-white py-2 rounded-md hover:bg-[#5a37a8] disabled:opacity-50"
                            onClick={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Company Account"}
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 border-[#d0d5dd] text-[#344054] py-2 rounded-md hover:bg-gray-50 bg-transparent"
                            disabled={isLoading}
                        >
                            <GoogleSignInButton />
                        </Button>
                    </div>
                    <p className="text-center text-sm text-[#667085]">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#6941c6] font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
