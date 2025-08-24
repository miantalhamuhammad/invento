import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PATHS } from "./path";
import { Product } from "../pages/products/product";
import { Overview } from "../pages/dashboard/overview";
import { Catagory } from "../pages/catagory/catagory";
import { Warehouse } from "../pages/warehouse/warehouse";
import { Stock } from "../pages/stock/stock";
import { Suppliers } from "../pages/supplier/supplier";
import { PurchaseOrder } from "../pages/purchase-order/purchase-order";
import { SalesOrder } from "../pages/sale/sale-order";
import { Customers } from "../pages/sale/customer";
import { Shipment } from "../pages/sale/shipment";
import { Employee } from "../pages/employee/employee";
import { Department } from "../pages/employee/department";
import { Payment } from "../pages/payment/payment";
import { Invoice } from "../pages/payment/invoice";
import NotFound from "../pages/NotFoundPage";
import { UnderDevelopmentPage } from "../pages/under-development";
import RolesAndPermissions from "../pages/roles";
import { useSelector } from "react-redux";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";

// Supplier/Vendor imports
import SupplierDashboard from "../pages/vendor/SupplierDashboard";
import { SupplierRegistration } from "../pages/vendor/SupplierRegistration";
import { PORequestsPage } from "../pages/vendor/PORequestsPage";
import { QuotationsPage } from "../pages/vendor/QuotationsPage";
import { ProfilePage } from "../pages/vendor/ProfilePage";
import { SupplierAuthWrapper } from "../pages/vendor/SupplierAuthWrapper";

const AppRoutes = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <BrowserRouter>
            <Routes>
                {/*<Route*/}
                {/*    path={PATHS.dashboard}*/}
                {/*    element={isAuthenticated ? <Product /> : <Navigate to={PATHS.login} />}*/}
                {/*/>*/}
                <Route
                    path={PATHS.dashboard}
                    element={<Overview />}
                />
                {/*<Route*/}
                {/*    path="/under-development"*/}
                {/*    element={isAuthenticated ? <UnderDevelopmentPage /> : <Navigate to={PATHS.login} />}*/}
                {/*/>*/}
                <Route
                    path="/under-development"
                    element={<UnderDevelopmentPage />}
                />

                {/* Catch-all Route */}
                <Route path={PATHS.no_page} element={<NotFound />} />
                <Route path={PATHS.catagory} element={<Catagory/>} />
                <Route path={PATHS.product} element={<Product/>} />
                <Route path={PATHS.warehouse} element={<Warehouse/>} />
                <Route path={PATHS.stock} element={<Stock/>} />
                <Route path={PATHS.supplier} element={<Suppliers/>} />
                <Route path={PATHS.purchase_order} element={<PurchaseOrder/>} />
                <Route path={PATHS.sale_order} element={<SalesOrder/>} />
                <Route path={PATHS.customer} element={<Customers/>} />
                <Route path={PATHS.shipment} element={<Shipment/>} />
                <Route path={PATHS.employee} element={<Employee/>} />
                <Route path={PATHS.department} element={<Department/>} />
                <Route path={PATHS.payment} element={<Payment/>} />
                <Route path={PATHS.invoice} element={<Invoice/>} />
                <Route path={PATHS.roles} element={<RolesAndPermissions/>} />
                <Route path={PATHS.login} element={<LoginPage/>} />
                <Route path={PATHS.register} element={<RegisterPage/>} />
                <Route path={PATHS.home} element={isAuthenticated ? <Product /> : <Navigate to={PATHS.login} />} />

                {/* Supplier/Vendor Routes */}
                <Route path={PATHS.supplier_login} element={<LoginPage />} />
                <Route path={PATHS.supplier_register} element={<SupplierRegistration />} />
                <Route path={PATHS.supplier_dashboard} element={<SupplierDashboard />} />
                <Route path={PATHS.supplier_profile} element={<ProfilePage />} />
                <Route path={PATHS.supplier_po_requests} element={<PORequestsPage />} />
                <Route path={PATHS.supplier_quotations} element={<QuotationsPage />} />

                {/* Legacy vendor routes for backward compatibility */}
                <Route path="/vendor/dashboard" element={<Navigate to={PATHS.supplier_dashboard} />} />
                <Route path="/vendor/register" element={<Navigate to={PATHS.supplier_register} />} />
                <Route path="/vendor/po-requests" element={<Navigate to={PATHS.supplier_po_requests} />} />
                <Route path="/vendor/quotations" element={<Navigate to={PATHS.supplier_quotations} />} />
                <Route path="/vendor/profile" element={<Navigate to={PATHS.supplier_profile} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;