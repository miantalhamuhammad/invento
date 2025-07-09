"use client"

import { Modal } from "./Modal"
import { Button } from "./button"
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import PropTypes from "prop-types";

export function ConfirmModal({
                                 isOpen,
                                 onClose,
                                 onConfirm,
                                 title,
                                 message,
                                 confirmLabel = "Confirm",
                                 cancelLabel = "Cancel",
                                 variant = "default",
                                 isLoading = false,
                             }) {
    const variants = {
        default: {
            icon: Info,
            iconColor: "text-[#6941c6]",
            confirmButton: "bg-[#6941c6] hover:bg-[#7f56d9] text-white",
        },
        danger: {
            icon: AlertTriangle,
            iconColor: "text-[#ef2424]",
            confirmButton: "bg-[#ef2424] hover:bg-[#dc2626] text-white",
        },
        success: {
            icon: CheckCircle,
            iconColor: "text-[#12b76a]",
            confirmButton: "bg-[#12b76a] hover:bg-[#10a05b] text-white",
        },
        warning: {
            icon: XCircle,
            iconColor: "text-[#f59e0b]",
            confirmButton: "bg-[#f59e0b] hover:bg-[#d97706] text-white",
        },
    }

    const config = variants[variant]
    const Icon = config.icon

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
            <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-[#f9fafb] mb-4">
                    <Icon className={`w-6 h-6 ${config.iconColor}`} />
                </div>

                {title && <h3 className="text-lg font-semibold text-[#101828] mb-2">{title}</h3>}

                {message && <p className="text-sm text-[#667085] mb-6">{message}</p>}

                <div className="flex items-center gap-3 justify-center">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] bg-transparent"
                    >
                        {cancelLabel}
                    </Button>
                    <Button onClick={onConfirm} disabled={isLoading} className={config.confirmButton}>
                        {isLoading ? "Loading..." : confirmLabel}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    variant: PropTypes.oneOf(["default", "danger", "success", "warning"]),
    isLoading: PropTypes.bool,
}