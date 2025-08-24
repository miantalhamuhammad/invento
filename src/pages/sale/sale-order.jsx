import {
    Search,
    Filter,
    Plus,
    Download,
    Calendar,
    Edit,
    Trash2,
    FileText,
    Eye,
    RotateCcw,
    MapPin,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"
import { useState, useEffect } from "react";
import { AddSalesOrderForm } from "./add-sale-order-form.jsx";
import { saleOrderService, handleApiError, downloadFile } from "../../services/index.js";
import dayjs from "dayjs";

export const SalesOrder = () => {
    const timeRanges = ["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"]
    const [isOpen, setIsOpen] = useState(false);
    const [salesOrderData, setSalesOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedTimeRange, setSelectedTimeRange] = useState("1m");
    const [selectedMonth, setSelectedMonth] = useState("");

    // Add this constant for allowed statuses
    const allowedStatuses = [
        'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'
    ];

    // Helper to get startDate and endDate based on selected range or month
    const getDateRange = () => {
        if (selectedMonth) {
            const start = dayjs(selectedMonth + "-01");
            const end = start.endOf("month");
            return { startDate: start.format("YYYY-MM-DD"), endDate: end.format("YYYY-MM-DD") };
        }
        const now = dayjs();
        let start;
        switch (selectedTimeRange) {
            case "1d":
                start = now.subtract(1, "day");
                break;
            case "7d":
                start = now.subtract(7, "day");
                break;
            case "1m":
                start = now.subtract(1, "month");
                break;
            case "3m":
                start = now.subtract(3, "month");
                break;
            case "6m":
                start = now.subtract(6, "month");
                break;
            case "1y":
                start = now.subtract(1, "year");
                break;
            case "3y":
                start = now.subtract(3, "year");
                break;
            case "5y":
                start = now.subtract(5, "year");
                break;
            default:
                start = now.subtract(1, "month");
        }
        return { startDate: start.format("YYYY-MM-DD"), endDate: now.format("YYYY-MM-DD") };
    };

    // Fetch sale order data
    const fetchSaleOrders = async (page = 1, search = "") => {
        try {
            setLoading(true);
            setError(null);
            const { startDate, endDate } = getDateRange();
            const params = {
                page,
                limit: 10,
                search: search.trim(),
                startDate,
                endDate
            };
            const response = await saleOrderService.getSaleOrders(params);

            console.log(response);
            // Ensure correct mapping from API response
            if (response) {
                setSalesOrderData(Array.isArray(response.saleOrders) ? response.saleOrders : []);
                setTotalPages(response.pagination?.totalPages || 1);
                setCurrentPage(response.pagination?.currentPage || 1);
            } else {
                setSalesOrderData([]);
                setTotalPages(1);
                setCurrentPage(1);
                setError(response.message || 'Failed to fetch sale orders');
            }
        } catch (err) {
            setError(handleApiError(err));
            setSalesOrderData([]);
            setTotalPages(1);
            setCurrentPage(1);
            console.error('Error fetching sale orders:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchSaleOrders(1, searchTerm);
    }, [selectedTimeRange, selectedMonth, searchTerm]);

    // Time range handler
    const handleTimeRangeClick = (range) => {
        setSelectedTimeRange(range);
        setSelectedMonth("");
    };
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        setSelectedTimeRange("");
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await saleOrderService.createSaleOrder(formData);
            if (response.success) {
                setIsOpen(false);
                fetchSaleOrders(currentPage, searchTerm); // Refresh data
            } else {
                setError(response.message || 'Failed to create sale order');
            }
        } catch (err) {
            setError(handleApiError(err));
            console.error("Error creating sale order:", err);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleExport = async () => {
        try {
            const blob = await saleOrderService.exportSaleOrders('csv');
            downloadFile(blob, `sale-orders-export-${new Date().toISOString().split('T')[0]}.csv`);
        } catch (err) {
            setError(handleApiError(err));
            console.error("Error exporting sale orders:", err);
        }
    };

    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this sale order?')) {
            try {
                const response = await saleOrderService.deleteSaleOrder(orderId);
                if (response.success) {
                    fetchSaleOrders(currentPage, searchTerm); // Refresh data
                } else {
                    setError(response.message || 'Failed to delete sale order');
                }
            } catch (err) {
                setError(handleApiError(err));
                console.error("Error deleting sale order:", err);
            }
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await saleOrderService.updateSaleOrderStatus(orderId, newStatus);
            if (response.success) {
                fetchSaleOrders(currentPage, searchTerm); // Refresh data
            } else {
                setError(response.message || 'Failed to update status');
            }
        } catch (err) {
            setError(handleApiError(err));
            console.error("Error updating status:", err);
        }
    };

    const handleGeneratePDF = async (orderId) => {
        try {
            const blob = await saleOrderService.generateSaleOrderPDF(orderId);
            downloadFile(blob, `sale-order-${orderId}.pdf`);
        } catch (err) {
            setError(handleApiError(err));
            console.error("Error generating PDF:", err);
        }
    };

    const handleGenerateInvoice = async (orderId) => {
        try {
            const response = await saleOrderService.generateSaleOrderInvoice(orderId);
            if (response.success) {
                alert('Invoice generated successfully!');
                fetchSaleOrders(currentPage, searchTerm); // Refresh data
            } else {
                setError(response.message || 'Failed to generate invoice');
            }
        } catch (err) {
            setError(handleApiError(err));
            console.error("Error generating invoice:", err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchSaleOrders(page, searchTerm);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'drafted': return 'bg-[#f2f4f7] text-[#344054]';
            case 'pending': return 'bg-[#fffaeb] text-[#b54708]';
            case 'confirmed': case 'completed': return 'bg-[#ecfdf3] text-[#027a48]';
            case 'cancelled': case 'rejected': return 'bg-[#fef2f2] text-[#b91c1c]';
            case 'shipped': case 'in transit': return 'bg-[#f4f3ff] text-[#6941c6]';
            case 'delivered': return 'bg-[#ecfdf3] text-[#027a48]';
            default: return 'bg-[#f2f4f7] text-[#344054]';
        }
    };

    // Add handler for status change
    const handleStatusDropdownChange = async (orderId, newStatus) => {
        try {
            await saleOrderService.updateSaleOrderStatus(orderId, newStatus);
            fetchSaleOrders(currentPage, searchTerm); // Refresh data
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    const renderActionButtons = (order) => {
        const actions = [];

        if (order.status === 'Drafted' || order.status === 'Pending') {
            actions.push(
                <button key="edit" className="p-1 hover:bg-[#f3f4f6] rounded" title="Edit">
                    <Edit className="h-4 w-4 text-[#667085]" />
                </button>,
                <button
                    key="delete"
                    onClick={() => handleDelete(order.id)}
                    className="p-1 hover:bg-[#f3f4f6] rounded"
                    title="Delete"
                >
                    <Trash2 className="h-4 w-4 text-[#667085]" />
                </button>
            );
        }

        if (order.status !== 'Drafted') {
            actions.push(
                <button
                    key="pdf"
                    onClick={() => handleGeneratePDF(order.id)}
                    className="p-1 hover:bg-[#f3f4f6] rounded"
                    title="Generate PDF"
                >
                    <FileText className="h-4 w-4 text-[#667085]" />
                </button>,
                <button key="view" className="p-1 hover:bg-[#f3f4f6] rounded" title="View Details">
                    <Eye className="h-4 w-4 text-[#667085]" />
                </button>
            );
        }

        if (order.status === 'Confirmed' && !order.invoice_generated) {
            actions.push(
                <button
                    key="invoice"
                    onClick={() => handleGenerateInvoice(order.id)}
                    className="p-1 hover:bg-[#f3f4f6] rounded"
                    title="Generate Invoice"
                >
                    <FileText className="h-4 w-4 text-[#4ade80]" />
                </button>
            );
        }

        if (order.status === 'Shipped' || order.status === 'In Transit') {
            actions.push(
                <button key="track" className="p-1 hover:bg-[#f3f4f6] rounded" title="Track Order">
                    <MapPin className="h-4 w-4 text-[#667085]" />
                </button>
            );
        }

        if (order.status === 'Cancelled') {
            actions.push(
                <button
                    key="retry"
                    onClick={() => handleStatusUpdate(order.id, 'Pending')}
                    className="p-1 hover:bg-[#f3f4f6] rounded"
                    title="Reactivate Order"
                >
                    <RotateCcw className="h-4 w-4 text-[#667085]" />
                </button>
            );
        }

        // Add status dropdown for all orders
        actions.push(
            <select
                key="status-dropdown"
                value={order.status}
                onChange={e => handleStatusDropdownChange(order.id, e.target.value)}
                className="ml-2 px-2 py-1 rounded border border-[#d0d5dd] text-xs bg-white text-[#344054]"
                style={{ minWidth: 110 }}
            >
                {allowedStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
        );

        return actions;
    };

    return (
        <Layout>
            {/* Header Section */}
            <div className="px-8 pt-6 pb-4">
                {/* Back button */}
                <button className="font-medium text-[#6840c6] hover:underline flex items-center text-sm">
                    <span className="mr-1">←</span> Back
                </button>

                {/* Title and Time Range Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Sale Orders</h1>
                    <div className="flex flex-wrap gap-2">
                        {timeRanges.map((range) => (
                            <button
                                key={range}
                                onClick={() => handleTimeRangeClick(range)}
                                className={`h-9 px-4 text-sm font-medium rounded-lg border ${
                                    range === selectedTimeRange && !selectedMonth
                                        ? "bg-[#6941c6] text-white border-[#6941c6]"
                                        : "bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb]"
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                        <label className="h-9 flex items-center px-2 border rounded-lg bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] cursor-pointer">
                            <Calendar className="h-4 w-4 mr-2" />
                            <input
                                type="month"
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                className="outline-none border-none bg-transparent text-[#344054] text-sm w-28"
                                style={{ padding: 0 }}
                            />
                            <span className="ml-1">Select month</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mx-8 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium mt-2"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Main Content */}
            <div className="px-8 pb-8">
                {/* Sale Orders Table */}
                <div className="border rounded-lg shadow-sm bg-white border-[#eaecf0] w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-[#eaecf0] gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                                <input
                                    placeholder="Search orders, customers..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="pl-9 w-full h-10 rounded-lg border border-[#d0d5dd] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6941c6] focus:border-transparent"
                                />
                            </div>
                            <button className="h-10 px-4 rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center text-sm font-medium">
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </button>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto justify-end">
                            <button
                                className="h-10 px-4 rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center text-sm font-medium"
                                onClick={handleOpen}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Sale Order
                            </button>
                            <button
                                onClick={handleExport}
                                className="h-10 px-4 rounded-lg bg-[#6941c6] text-white hover:bg-[#7f56d9] flex items-center text-sm font-medium"
                                disabled={loading}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full">
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6941c6]"></div>
                                <span className="ml-2 text-[#667085]">Loading sale orders...</span>
                            </div>
                        ) : salesOrderData.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-[#667085]">No sale orders found</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="bg-[#f9fafb] text-left border-b border-[#eaecf0]">
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Ordered Date</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Sale Order ID</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Customer</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Total Amount</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">ETD</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Status</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {salesOrderData.map((order, index) => (
                                    <tr key={order.id || index} className="border-b border-[#eaecf0] hover:bg-[#f9fafb]">
                                        <td className="py-4 px-4">
                                            <div className="text-[#101828]">
                                                {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                                            </div>
                                            <div className="text-xs text-[#667085]">
                                                {order.created_at ? new Date(order.created_at).toLocaleTimeString() : ''}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-[#101828]">{order.so_number || order.id || 'N/A'}</td>
                                        <td className="py-4 px-4">
                                            <div className="text-[#101828]">{order.customer?.customer_name || 'N/A'}</div>
                                            <div className="text-xs text-[#667085]">ID: {order.customer?.id || order.customer_id || 'N/A'}</div>
                                        </td>
                                        <td className="py-4 px-4 text-[#101828]">
                                            ${order.total_amount ? Number(order.total_amount).toFixed(2) : '0.00'}
                                        </td>
                                        <td className="py-4 px-4">
                                            {order.expected_delivery_date ? (
                                                <div>
                                                    <div className="text-[#101828]">
                                                        {new Date(order.expected_delivery_date).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-[#667085]">
                                                        {new Date(order.expected_delivery_date).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-[#667085]">NA</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status || 'Unknown'}
                                            </span>
                                            {order.remarks && (
                                                <div className="text-xs text-[#667085] mt-1">
                                                    {order.remarks}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                {renderActionButtons(order)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between p-6 border-t border-[#eaecf0]">
                            <div className="text-sm text-[#667085]">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-[#d0d5dd] hover:bg-[#f9fafb] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-[#d0d5dd] hover:bg-[#f9fafb] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Sale Order Form Modal */}
            {isOpen && (
                <AddSalesOrderForm
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSubmit={handleFormSubmit}
                />
            )}
        </Layout>
    );
};
