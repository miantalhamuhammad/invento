import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import {Link, useNavigate} from "react-router-dom"
import GoogleSignInButton from "../../components/ui/google-icon"

export default function LoginPage() {
  const navigate = useNavigate()

  const handleSignIn = () => {
    // You can add login validation here if needed
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
              <span className="relative inline-block">
                <span className="p-3">   </span>
                <svg
                    className="absolute -top-2 left-1/2 -translate-x-1/2"
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

        {/* Right Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#101828]">Welcome back</h1>
              <p className="text-[#344054] mt-2">
                Welcome back! Please enter your details.
              </p>
            </div>
            <div className="space-y-4">
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
                    placeholder="********"
                    className="border-[#d0d5dd] text-[#98a2b3]"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-[#d0d5dd]" />
                  <label htmlFor="remember" className="text-[#667085]">
                    Remember for 30 days
                  </label>
                </div>
                <Link to="/forgot-password" className="text-[#6941c6] font-medium hover:underline">
                  Forgot password
                </Link>
              </div>
              <Button className="w-full bg-[#6941c6] text-white py-2 rounded-md hover:bg-[#5a37a8]" onClick={handleSignIn}>
                Sign in
              </Button>
              <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-[#d0d5dd] text-[#344054] py-2 rounded-md hover:bg-gray-50 bg-transparent"
              >
                <GoogleSignInButton />

              </Button>
            </div>
            <p className="text-center text-sm text-[#667085]">
              Dont have an account?{" "}
              <Link to="/register" className="text-[#6941c6] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}