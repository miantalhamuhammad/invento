import { Search, Filter, Plus, Download, Calendar, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"
import { useState, useEffect } from "react";
import { AddStockForm } from "./add-stock-form.jsx";
import { stockService, handleApiError, downloadFile } from "../../services/index.js";
import dayjs from "dayjs";

export const Stock = () => {
    const timeRanges = ["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"]
    const [isOpen, setIsOpen] = useState(false);
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedTimeRange, setSelectedTimeRange] = useState("1m");
    const [selectedMonth, setSelectedMonth] = useState("");

    // Helper to get date range from filter
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

    // Fetch stock data
    const fetchStockData = async (page = 1, search = "") => {
        try {
            setLoading(true);
            setError(null);
            const { startDate, endDate } = getDateRange();
            const params = {
                page,
                limit: 10,
                search: search.trim(),
                startDate,
                endDate,
            };

            const response = await stockService.getStock(params);
            console.log("myresponse=========>",response);
            if (response.succeeded) {
                setStockData(response.data?.stock || []);
                setTotalPages(response.data?.pagination?.totalPages || 1);
                setCurrentPage(response.data?.pagination?.currentPage || 1);
            } else {
                setError(response.message || "Failed to fetch stock data");
            }
            // if (response) {
            //     setStockData(response.stock || response.data || []);
            //     setTotalPages(response.pagination?.totalPages || 1);
            //     setCurrentPage(response.pagination?.currentPage || 1);
            // } else {
            //     setError(response.message || 'Failed to fetch stock data');
            // }
        } catch (err) {
            setError(handleApiError(err));
            console.error('Error fetching stock:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchStockData(1, searchTerm);
    }, [searchTerm]);

    // Refetch when filter or month changes
    useEffect(() => {
        fetchStockData(1, searchTerm);
    }, [selectedTimeRange, selectedMonth, searchTerm]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleFormSubmit = async (newStockData) => {
        setIsOpen(false);
        await fetchStockData(currentPage, searchTerm); // Refresh data
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleExport = async () => {
        try {
            const blob = await stockService.exportStock('csv');
            downloadFile(blob, `stock-export-${new Date().toISOString().split('T')[0]}.csv`);
        } catch (err) {
            setError(handleApiError(err));
            console.error("Error exporting stock:", err);
        }
    };

    const handleDelete = async (stockId) => {
        if (window.confirm('Are you sure you want to delete this stock entry?')) {
            try {
                const response = await stockService.deleteStock(stockId);
                if (response.success) {
                    fetchStockData(currentPage, searchTerm); // Refresh data
                } else {
                    setError(response.message || 'Failed to delete stock');
                }
            } catch (err) {
                setError(handleApiError(err));
                console.error("Error deleting stock:", err);
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchStockData(page, searchTerm);
    };

    // Handlers for filters
    const handleTimeRangeClick = (range) => {
        setSelectedTimeRange(range);
        setSelectedMonth("");
    };
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        setSelectedTimeRange("");
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
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Stock</h1>
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
                {/* Stock Table */}
                <div className="border rounded-lg shadow-sm bg-white border-[#eaecf0] w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-[#eaecf0] gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                                <input
                                    placeholder="Search products, SKU, warehouse..."
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
                                Add New Stock
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
                                <span className="ml-2 text-[#667085]">Loading stock data...</span>
                            </div>
                        ) : stockData.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-[#667085]">No stock data found</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="bg-[#f9fafb] text-left border-b border-[#eaecf0]">
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Created Date</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Stock ID</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Product</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Warehouse</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Category</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Weight</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">
                                        Stock Level
                                        <br />
                                        <span className="text-xs text-[#98a2b3]">(in units)</span>
                                    </th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Min Stock</th>
                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {stockData.map((stock, index) => (
                                    <tr key={stock.id || index} className="border-b border-[#eaecf0] hover:bg-[#f9fafb]">
                                        <td className="py-4 px-4">
                                            <div className="text-[#101828]">
                                                {stock.created_at ? new Date(stock.created_at).toLocaleDateString() : 'N/A'}
                                            </div>
                                            <div className="text-xs text-[#667085]">
                                                {stock.created_at ? new Date(stock.created_at).toLocaleTimeString() : ''}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-[#101828]">{stock.id || 'N/A'}</td>
                                        <td className="py-4 px-4">
                                            <div className="text-[#101828]">{stock.product?.product_name || 'N/A'}</div>
                                            <div className="text-xs text-[#667085]">SKU: {stock.product?.sku_code || 'N/A'}</div>
                                        </td>
                                        <td className="py-4 px-4 text-[#101828]">{stock.warehouse?.warehouse_name || 'N/A'}</td>
                                        <td className="py-4 px-4 text-[#101828]">{stock.product?.category?.category_name || 'N/A'}</td>
                                        <td className="py-4 px-4 text-[#101828]">
                                            {stock.product?.weight ? `${stock.product.weight} ${stock.product.weight_unit || 'kg'}` : 'N/A'}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                (stock.quantity <= (stock.minimum_stock || 0)) 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {stock.quantity || 0}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-[#101828]">{stock.minimum_stock || 0}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-1 hover:bg-[#f3f4f6] rounded">
                                                    <Eye className="h-4 w-4 text-[#667085]" />
                                                </button>
                                                <button className="p-1 hover:bg-[#f3f4f6] rounded">
                                                    <Edit className="h-4 w-4 text-[#667085]" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(stock.id)}
                                                    className="p-1 hover:bg-[#f3f4f6] rounded"
                                                >
                                                    <Trash2 className="h-4 w-4 text-[#667085]" />
                                                </button>
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

            {/* Add Stock Form Modal */}
            {isOpen && (
                <AddStockForm
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSubmit={handleFormSubmit}
                />
            )}
        </Layout>
    );
};
