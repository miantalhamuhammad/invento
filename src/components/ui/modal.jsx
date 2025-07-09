"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "./button"
import PropTypes from "prop-types";

export function Modal({
                          isOpen,
                          onClose,
                          title,
                          children,
                          size = "default",
                          showCloseButton = true,
                          closeOnBackdrop = true,
                          closeOnEscape = true,
                          className = "",
                      }) {
    // Handle escape key
    useEffect(() => {
        if (!isOpen || !closeOnEscape) return

        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose?.()
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, closeOnEscape, onClose])

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    const sizeClasses = {
        sm: "max-w-md",
        default: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-6xl",
        full: "max-w-[95vw]",
    }

    const handleBackdropClick = (e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose?.()
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
            <div
                className={`w-full ${sizeClasses[size]} max-h-[90vh] bg-white rounded-lg shadow-xl ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-[#eaecf0]">
                        {title && <h2 className="text-xl font-semibold text-[#101828]">{title}</h2>}
                        {showCloseButton && (
                            <Button variant="ghost" size="icon" onClick={onClose} className="text-[#667085] hover:bg-[#f9fafb]">
                                <X className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">{children}</div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(["sm", "default", "lg", "xl", "full"]),
    showCloseButton: PropTypes.bool,
    closeOnBackdrop: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
    className: PropTypes.string,
}