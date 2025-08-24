"use client"

import { useState } from "react"
import { SupplierAuthWrapper } from "./SupplierAuthWrapper"
import { SupplierLayout } from "./SupplierLayout"
import { PORequestsPage } from "./PORequestsPage"
import { QuotationsPage } from "./QuotationsPage"
import { ProfilePage } from "./ProfilePage"
import { Toast, useToast } from "./Toast"

export default function SupplierDashboard() {
    const [currentPage, setCurrentPage] = useState("po-requests")
    const { toast, showToast, hideToast } = useToast()

    const renderCurrentPage = (user) => {
        switch (currentPage) {
            case "po-requests":
                return <PORequestsPage onShowToast={showToast} />
            case "quotations":
                return <QuotationsPage />
            case "profile":
                return <ProfilePage user={user} onShowToast={showToast} />
            default:
                return <PORequestsPage onShowToast={showToast} />
        }
    }

    return (
        <SupplierAuthWrapper onShowToast={showToast}>
            {({ user, onLogout }) => (
                <>
                    <SupplierLayout user={user} onLogout={onLogout} currentPage={currentPage} onPageChange={setCurrentPage}>
                        {renderCurrentPage(user)}
                    </SupplierLayout>

                    <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
                </>
            )}
        </SupplierAuthWrapper>
    )
}
