"use client"

import { Modal } from "./modal"
import { Button } from "./button"
import PropTypes from "prop-types";

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
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit?.(e)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size={size} {...modalProps}>
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
                {/* Header Actions */}
                {headerActions && <div className="px-6 py-4 border-b border-[#eaecf0]">{headerActions}</div>}

                {/* Form Content */}
                <div className="flex-1 p-6">{children}</div>

                {/* Footer */}
                {showFooter && (
                    <div className="flex items-center justify-between p-6 border-t border-[#eaecf0] bg-[#f9fafb]">
                        <div>{footerActions}</div>
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] bg-transparent"
                            >
                                {cancelLabel}
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-[#6941c6] hover:bg-[#7f56d9] text-white">
                                {isSubmitting ? "Submitting..." : submitLabel}
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </Modal>
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
