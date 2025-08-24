"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { SupplierRegistration } from "./SupplierRegistration"

export function SupplierAuthWrapper({ children, onShowToast }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState("login") // "login" or "register"
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("supplierUser")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      if (userData.role === "supplier") {
        setUser(userData)
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError("")

    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please enter both email and password")
      return
    }

    try {
      // Mock authentication - in real app, this would be an API call
      if (loginForm.email && loginForm.password) {
        const userData = {
          id: 1,
          name: "ABC Supplies Ltd",
          email: loginForm.email,
          role: "supplier",
          contactPerson: "John Smith",
          phone: "+1 234 567 8900",
          status: "active",
        }

        localStorage.setItem("supplierUser", JSON.stringify(userData))
        setUser(userData)
        onShowToast && onShowToast("Login successful! Welcome back.", "success")
      }
    } catch (error) {
      setLoginError("Invalid credentials. Please try again.")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("supplierUser")
    setUser(null)
    setCurrentView("login")
    onShowToast && onShowToast("You have been logged out successfully.", "success")
  }

  const switchToRegister = () => {
    setCurrentView("register")
    setLoginError("")
  }

  const switchToLogin = () => {
    setCurrentView("login")
    setLoginForm({ email: "", password: "" })
    setLoginError("")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    if (currentView === "register") {
      return <SupplierRegistration onBackToLogin={switchToLogin} onShowToast={onShowToast} />
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Supplier Portal</h1>
            <p className="text-gray-600 mt-2">Sign in to your supplier account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  loginError ? "border-red-500" : "border-gray-300"
                }`}
                value={loginForm.email}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, email: e.target.value })
                  setLoginError("")
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  loginError ? "border-red-500" : "border-gray-300"
                }`}
                value={loginForm.password}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, password: e.target.value })
                  setLoginError("")
                }}
                placeholder="Enter your password"
              />
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">{loginError}</div>
            )}

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={switchToRegister}
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Register as Supplier
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    )
  }

  return children({ user, onLogout: handleLogout })
}
