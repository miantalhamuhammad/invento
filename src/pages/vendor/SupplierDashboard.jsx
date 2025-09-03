"use client"

import { useState } from "react"
import { SupplierLayout } from "./SupplierLayout"
import { PORequestsPage } from "./PORequestsPage"
import { QuotationsPage } from "./QuotationsPage"
import { ProfilePage } from "./ProfilePage"
import { Toast, useToast } from "./Toast"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/slices/authSlice"
import {useNavigate} from "react-router-dom"; // adjust path as per your project

export default function SupplierDashboard() {
    const [currentPage, setCurrentPage] = useState("po-requests")
    const { toast, showToast, hideToast } = useToast()
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())  // clears user from redux
        showToast("Logged out successfully", "success")
        // optionally redirect:
        navigate("/login")
    }
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
                <>
                    <SupplierLayout user={user}                 onLogout={handleLogout}
                                    currentPage={currentPage} onPageChange={setCurrentPage}>
                        {renderCurrentPage(user)}
                    </SupplierLayout>

                    <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
                </>

    )
}
