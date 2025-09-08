"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "./button"
import PropTypes from "prop-types"

export function FormModal({
                              isOpen,
                              onClose,
                              title,
                              children,
                              size = "lg",
                              onSubmit,
                              submitLabel = "Submit",
                              cancelLabel = "Cancel",
                              isSubmitting = false,
                              showFooter = true,
                              headerActions,
                              footerActions,
                              ...modalProps
                          }) {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
        }
        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit?.(e)
    }

    if (!isOpen) return null

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4",
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" {...modalProps}>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className={`
            relative w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl 
            transform transition-all max-h-[90vh] flex flex-col
          `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#eaecf0]">
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        <div className="flex items-center gap-2">
                            {headerActions}
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                        {/* scrollable content */}
                        <div className="flex-1 overflow-y-auto p-6 min-h-0">{children}</div>

                        {/* footer */}
                        {showFooter && (
                            <div className="flex items-center justify-between p-6 border-t border-[#eaecf0] bg-white">
                                {footerActions ? (
                                    footerActions
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                        >
                                            {cancelLabel}
                                        </button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#6941c6] hover:bg-[#7f56d9] text-white"
                                        >
                                            {isSubmitting ? "Submitting..." : submitLabel}
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

FormModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
    onSubmit: PropTypes.func.isRequired,
    submitLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    isSubmitting: PropTypes.bool,
    showFooter: PropTypes.bool,
    headerActions: PropTypes.node,
    footerActions: PropTypes.node,
}
