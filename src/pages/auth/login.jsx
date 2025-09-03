// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Checkbox } from "../../components/ui/checkbox"
// import {Link, useNavigate} from "react-router-dom"
// import GoogleSignInButton from "../../components/ui/google-icon"
// import { useState } from "react"
// import { useLoginMutation } from "../../redux/services/auth.js"
// import { useDispatch } from "react-redux"
// import { loginSuccess, loginFailure } from "../../redux/slices/authSlice.js"
//
// export default function LoginPage() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [login, { isLoading }] = useLoginMutation()
//
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   })
//   const [error, setError] = useState("")
//
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }
//
//   const handleSignIn = async (e) => {
//     e.preventDefault()
//     setError("")
//
//     try {
//       console.log("Attempting login with:", formData) // Debug log
//       const result = await login(formData).unwrap()
//       console.log("Login API response:", result) // Debug log
//
//       // Check for both 'success' and 'succeeded' fields to handle different response formats
//       if (result.success || result.succeeded) {
//         console.log("Login successful, dispatching actions...") // Debug log
//
//         // Ensure user data includes role and permissions
//         const userData = result.data?.user || result.user;
//         const tokenData = result.data?.token || result.token;
//
//         console.log("User data from login:", userData); // Debug log
//
//         // Dispatch login success with complete user data
//         dispatch(loginSuccess({
//           user: userData,
//           token: tokenData
//         }));
//
//         // Navigate based on user role
//         console.log("User role:", userData?.role?.name || userData?.roleName); // Debug log
//         const userRole = userData?.role?.name || userData?.roleName;
//
//         if (userRole === 'supplier') {
//           console.log("Navigating to supplier dashboard..."); // Debug log
//           navigate("/supplier-dashboard");
//         } else {
//           console.log("Navigating to regular dashboard..."); // Debug log
//           navigate("/dashboard");
//         }
//       } else {
//         console.log("Login failed - success/succeeded was false") // Debug log
//         setError(result.message || "Login failed")
//       }
//     } catch (err) {
//       console.error("Login error:", err) // Debug log
//       const errorMessage = err?.data?.message || "Login failed. Please try again."
//       setError(errorMessage)
//       dispatch(loginFailure(errorMessage))
//     }
//   }
//
//   return (
//       <div className="flex min-h-screen">
//         {/* Left Panel */}
//         <div className="hidden md:flex w-2/5 bg-[#6941c6] rounded-r-[60px] flex-col items-center justify-center p-8 relative">
//           <div className="flex flex-col items-center text-center">
//             <div className="flex items-center justify-center bg-white rounded-full px-8 py-4 mb-6">
//             <span className="text-black text-4xl font-bold tracking-tight">
//               Invento
//               <span className="relative inline-block">
//                 <span className="p-3">   </span>
//                 <svg
//                     className="absolute -top-2 left-1/2 -translate-x-1/2"
//                     width="24"
//                     height="12"
//                     viewBox="0 0 24 12"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle cx="6" cy="6" r="3" fill="black" />
//                   <circle cx="18" cy="6" r="3" fill="black" />
//                 </svg>
//               </span>
//             </span>
//             </div>
//             <p className="text-white text-lg max-w-xs">
//               Re-imagining inventory management experience with advanced data analytics for optimum performance
//             </p>
//           </div>
//           <div className="absolute bottom-8 left-8 text-white text-sm">
//             © Invento 2025
//           </div>
//         </div>
//
//         {/* Right Panel - Login Form */}
//         <div className="flex-1 flex items-center justify-center bg-white p-8">
//           <div className="w-full max-w-md space-y-6">
//             <div className="text-center">
//               <h1 className="text-3xl font-bold text-[#101828]">Welcome back</h1>
//               <p className="text-[#344054] mt-2">
//                 Welcome back! Please enter your details.
//               </p>
//             </div>
//
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}
//
//             <form onSubmit={handleSignIn} className="space-y-4">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-[#344054] mb-1">
//                   Email
//                 </label>
//                 <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter your email"
//                     className="border-[#d0d5dd] text-[#98a2b3]"
//                     required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-[#344054] mb-1">
//                   Password
//                 </label>
//                 <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder="********"
//                     className="border-[#d0d5dd] text-[#98a2b3]"
//                     required
//                 />
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox id="remember" className="border-[#d0d5dd]" />
//                   <label htmlFor="remember" className="text-[#667085]">
//                     Remember for 30 days
//                   </label>
//                 </div>
//                 <Link to="/forgot-password" className="text-[#6941c6] font-medium hover:underline">
//                   Forgot password
//                 </Link>
//               </div>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-[#6941c6] hover:bg-[#5a38b0] text-white py-2 px-4 rounded-lg font-medium"
//               >
//                 {isLoading ? "Signing in..." : "Sign in"}
//               </Button>
//               <Button
//                   variant="outline"
//                   className="w-full flex items-center justify-center gap-2 border-[#d0d5dd] text-[#344054] py-2 rounded-md hover:bg-gray-50 bg-transparent"
//               >
//                 <GoogleSignInButton />
//
//               </Button>
//
//             {/* Supplier Login Button */}
//             <div className="space-y-3">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <span className="w-full border-t border-[#d0d5dd]" />
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-white px-2 text-[#667085]">Or</span>
//                 </div>
//               </div>
//               <Button
//                   type="submit"
//                   variant="outline"
//                 className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100 py-2 px-4 rounded-lg font-medium"
//                 onClick={() => navigate('/supplier-login')}
//               >
//                 Login as Supplier
//               </Button>
//             </div>
//             </form>
//
//             <p className="text-center text-sm text-[#667085]">
//               Dont have an account?{" "}
//               <Link to="/register" className="text-[#6941c6] font-medium hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//   )
// }
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Link, useNavigate } from "react-router-dom"
import GoogleSignInButton from "../../components/ui/google-icon"
import { useState } from "react"
import { useLoginMutation } from "../../redux/services/auth.js"
import { useDispatch } from "react-redux"
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice.js"

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const result = await login(formData).unwrap()

      if (result.success || result.succeeded) {
        const userData = result.data?.user || result.user
        const tokenData = result.data?.token || result.token

        dispatch(loginSuccess({
          user: userData,
          token: tokenData
        }))

        // ✅ Navigate based on user role
        const userRole = userData?.role?.name || userData?.roleName
        if (userRole?.toLowerCase() === "supplier") {
          navigate("/supplier-dashboard")
        } else {
          navigate("/dashboard")
        }
      } else {
        setError(result.message || "Login failed")
      }
    } catch (err) {
      const errorMessage = err?.data?.message || "Login failed. Please try again."
      setError(errorMessage)
      dispatch(loginFailure(errorMessage))
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
              <span className="relative inline-block">
                <span className="p-3"> </span>
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

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#344054] mb-1">
                  Email
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="border-[#d0d5dd] text-[#98a2b3]"
                    required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#344054] mb-1">
                  Password
                </label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="********"
                    className="border-[#d0d5dd] text-[#98a2b3]"
                    required
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
              <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#6941c6] hover:bg-[#5a38b0] text-white py-2 px-4 rounded-lg font-medium"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-[#d0d5dd] text-[#344054] py-2 rounded-md hover:bg-gray-50 bg-transparent"
              >
                <GoogleSignInButton />
              </Button>
            </form>

            <p className="text-center text-sm text-[#667085]">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#6941c6] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}
