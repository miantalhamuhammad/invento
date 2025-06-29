import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Link, useNavigate } from "react-router-dom"
import GoogleSignInButton from "../../components/ui/google-icon"

export default function RegisterPage() {
    const navigate = useNavigate()

    const handleRegister = () => {
        // Add validation or registration logic here
        navigate("/dashboard")
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
            <div className="flex-1 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#101828]">Create account</h1>
                        <p className="text-[#344054] mt-2">Start your inventory management journey today.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-[#344054] mb-1">
                                    First name
                                </label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="border-[#d0d5dd] text-[#98a2b3]"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-[#344054] mb-1">
                                    Last name
                                </label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="border-[#d0d5dd] text-[#98a2b3]"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#344054] mb-1">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="border-[#d0d5dd] text-[#98a2b3]"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#344054] mb-1">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                className="border-[#d0d5dd] text-[#98a2b3]"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#344054] mb-1">
                                Confirm password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                className="border-[#d0d5dd] text-[#98a2b3]"
                            />
                        </div>
                        <div className="flex items-start space-x-2 text-sm">
                            <Checkbox id="terms" className="border-[#d0d5dd] mt-0.5" />
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
                        <Button className="w-full bg-[#6941c6] text-white py-2 rounded-md hover:bg-[#5a37a8]" onClick={handleRegister}>
                            Create account
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 border-[#d0d5dd] text-[#344054] py-2 rounded-md hover:bg-gray-50 bg-transparent"
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
