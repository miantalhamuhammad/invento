"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

export function Toast({ message, type = "success", isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          className: "bg-green-50 border-green-200 text-green-800",
          iconColor: "text-green-400",
        }
      case "error":
        return {
          icon: XCircle,
          className: "bg-red-50 border-red-200 text-red-800",
          iconColor: "text-red-400",
        }
      case "warning":
        return {
          icon: AlertCircle,
          className: "bg-yellow-50 border-yellow-200 text-yellow-800",
          iconColor: "text-yellow-400",
        }
      case "info":
        return {
          icon: Info,
          className: "bg-blue-50 border-blue-200 text-blue-800",
          iconColor: "text-blue-400",
        }
      default:
        return {
          icon: CheckCircle,
          className: "bg-green-50 border-green-200 text-green-800",
          iconColor: "text-green-400",
        }
    }
  }

  const config = getToastConfig()
  const Icon = config.icon

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${config.className}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${config.iconColor}`} />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button onClick={onClose} className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    isVisible: false,
  })

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
      isVisible: true,
    })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  return { toast, showToast, hideToast }
}
