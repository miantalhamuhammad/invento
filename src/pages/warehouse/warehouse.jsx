import {
    Search,
    Filter,
    Plus,
    Download,
    Calendar,
    TrendingUp,
    Edit,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"
import { useState } from "react";
import { AddWarehouseForm } from "./add-warehouse-form.jsx";
import {
    useGetWarehousesQuery,
    useDeleteWarehouseMutation
} from "../../redux/services/warehouses.js";

export const Warehouse = () => {
    const timeRanges = ["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"]
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // API hooks
    const { data: warehousesData, isLoading, error, refetch } = useGetWarehousesQuery();
    const [deleteWarehouse] = useDeleteWarehouseMutation();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this warehouse?")) {
            try {
                await deleteWarehouse(id).unwrap();
                refetch();
            } catch (error) {
                console.error("Failed to delete warehouse:", error);
                alert("Failed to delete warehouse. Please try again.");
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        console.log("Submitted warehouse data:", formData);
        setIsOpen(false);
        refetch();
    };

    // Extract warehouses data from response and ensure it's an array
    const warehousesArray = Array.isArray(warehousesData?.data)
        ? warehousesData.data
        : Array.isArray(warehousesData)
            ? warehousesData
            : [];

    // Filter warehouses based on search term
    const filteredWarehouses = warehousesArray.filter(warehouse =>
        warehouse.warehouse_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading warehouses...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">
                        Error loading warehouses: {error.message || "Something went wrong"}
                    </div>
                </div>
            </Layout>
        );
    }

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
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Warehouses</h1>
                    <div className="flex flex-wrap gap-2">
                        {timeRanges.map((range) => (
                            <button
                                key={range}
                                className={`h-9 px-4 text-sm font-medium rounded-lg border ${
                                    range === "1m"
                                        ? "bg-[#6941c6] text-white border-[#6941c6]"
                                        : "bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb]"
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                        <button className="h-9 px-4 text-sm font-medium rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Select dates
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 pb-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { title: "Active Warehouses", value: filteredWarehouses.length || 0, color: "#6941c6", textColor: "text-white" },
                        { title: "Inactive Warehouses", value: 19, color: "#fff", textColor: "text-[#101828]" },
                        { title: "Deleted Warehouses", value: 10, color: "#fff", textColor: "text-[#101828]" },
                    ].map((card, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg shadow-sm p-6 border ${card.textColor} ${
                                card.color === "#fff" ? "border-[#eaecf0]" : "border-transparent"
                            }`}
                            style={{ backgroundColor: card.color }}
                        >
                            <div className="text-sm font-medium mb-2 opacity-90">{card.title}</div>
                            <div className="text-4xl font-bold mb-2">{card.value}</div>
                            <p className="text-sm flex items-center gap-1 opacity-90">
                                <TrendingUp className="h-4 w-4" />
                                12% vs last month
                            </p>
                        </div>
                    ))}
                </div>

                {/* Active Warehouses Table */}
                <h2 className="text-2xl font-bold text-[#101828] mb-6">Active Warehouses</h2>
                <div className="border rounded-lg shadow-sm bg-white border-[#eaecf0] w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-[#eaecf0] gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                                <input
                                    placeholder="Search"
                                    className="pl-9 w-full h-10 rounded-lg border border-[#d0d5dd] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6941c6] focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                Add New Warehouse
                            </button>
                            <button className="h-10 px-4 rounded-lg bg-[#6941c6] text-white hover:bg-[#7f56d9] flex items-center text-sm font-medium">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="bg-[#f9fafb] text-left border-b border-[#eaecf0]">
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Warehouse ID</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Warehouse Name</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Location</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Capacity</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredWarehouses.length > 0 ? (
                                filteredWarehouses.map((warehouse, index) => (
                                    <tr key={warehouse.id || index} className="border-b border-[#eaecf0] hover:bg-[#f9fafb]">
                                        <td className="py-4 px-4 text-[#101828] font-medium">
                                            {warehouse.id || `WH-${index + 1}`}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-[#101828]">
                                                {warehouse.warehouse_name}
                                            </div>
                                            <div className="text-sm text-[#667085]">
                                                {warehouse.location}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-[#667085]">
                                            {warehouse.city}, {warehouse.state}
                                        </td>
                                        <td className="py-4 px-4 text-[#667085]">
                                            {warehouse.capacity ? `${warehouse.capacity} sq ft` : "N/A"}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex justify-end gap-1">
                                                <button className="text-[#667085] hover:bg-[#f9fafb] p-2 rounded-lg">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="text-[#6941c6] hover:bg-[#f9f5ff] p-2 rounded-lg">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(warehouse.id)}
                                                    className="text-[#ef2424] hover:bg-[#fef2f2] p-2 rounded-lg"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-4 px-4 text-center text-sm text-[#667085]">
                                        No warehouses found
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row justify-between items-center p-6 border-t border-[#eaecf0] gap-4">
                        <button className="flex items-center text-[#344054] border border-[#d0d5dd] rounded-lg px-4 py-2 bg-white hover:bg-[#f9fafb] text-sm font-medium">
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Previous
                        </button>
                        <div className="flex gap-1">
                            {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
                                <button
                                    key={i}
                                    className={`h-10 w-10 text-sm rounded-lg font-medium ${
                                        page === 1 ? "bg-[#6941c6] text-white" : "text-[#667085] hover:bg-[#f9fafb]"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center text-[#344054] border border-[#d0d5dd] rounded-lg px-4 py-2 bg-white hover:bg-[#f9fafb] text-sm font-medium">
                            Next
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </button>
                    </div>
                </div>

                <AddWarehouseForm
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSubmit={handleFormSubmit}
                />
            </div>
        </Layout>
    )
}