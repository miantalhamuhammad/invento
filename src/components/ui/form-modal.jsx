// "use client"
//
// import { Modal } from "./modal"
// import { Button } from "./button"
// import PropTypes from "prop-types";
//
// export function FormModal({
//                               isOpen,
//                               onClose,
//                               title,
//                               children,
//                               size = "lg",
//                               onSubmit,
//                               submitLabel = "Submit",
//                               cancelLabel = "Cancel",
//                               isSubmitting = false,
//                               showFooter = true,
//                               headerActions,
//                               footerActions,
//                               ...modalProps
//                           }) {
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         onSubmit?.(e)
//     }
//
//     return (
//         <Modal isOpen={isOpen} onClose={onClose} title={title} size={size} {...modalProps}>
//             <form onSubmit={handleSubmit} className="flex flex-col h-full">
//                 {/* Header Actions */}
//                 {headerActions && <div className="px-6 py-4 border-b border-[#eaecf0]">{headerActions}</div>}
//
//                 {/* Form Content */}
//                 <div className="flex-1 p-6">{children}</div>
//
//                 {/* Footer */}
//                 {showFooter && (
//                     <div className="flex items-center justify-between p-6 border-t border-[#eaecf0] bg-[#f9fafb]">
//                         <div>{footerActions}</div>
//                         <div className="flex items-center gap-3">
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={onClose}
//                                 className="border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] bg-transparent"
//                             >
//                                 {cancelLabel}
//                             </Button>
//                             <Button type="submit" disabled={isSubmitting} className="bg-[#6941c6] hover:bg-[#7f56d9] text-white">
//                                 {isSubmitting ? "Submitting..." : submitLabel}
//                             </Button>
//                         </div>
//                     </div>
//                 )}
//             </form>
//         </Modal>
//     )
// }
// FormModal.propTypes = {
//     isOpen: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     title: PropTypes.string,
//     children: PropTypes.node.isRequired,
//     size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
//     onSubmit: PropTypes.func.isRequired,
//     submitLabel: PropTypes.string,
//     cancelLabel: PropTypes.string,
//     isSubmitting: PropTypes.bool,
//     showFooter: PropTypes.bool,
//     headerActions: PropTypes.node,
//     footerActions: PropTypes.node,
// }
"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import PropTypes from "prop-types"

export const FormModal = ({ isOpen, onClose, title, children, size = "md", ...props }) => {
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

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4",
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" {...props}>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className={`
            relative w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl 
            transform transition-all max-h-[90vh] overflow-y-auto
          `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                            onClick={onClose}
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">{children}</div>
                </div>
            </div>
        </div>
    )
}

FormModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
}
