import { Search, Filter, Plus, Download, Calendar, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"
import {useState} from "react";
import {AddStockForm} from "./add-stock-form.jsx";

export const Stock = () => {
    const timeRanges = ["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"]

    const stockData = [
        {
            createdDate: "Jan 4, 2022",
            createdTime: "11:30 AM",
            stockId: "TUX001234",
            productId: "REMA0123",
            warehouseId: "REMA0123",
            category: "Traditional Vapes",
            weight: "3 lb",
            stockLevel: "15000",
            recLevel: "15000",
        },
        {
            createdDate: "Jan 4, 2022",
            createdTime: "11:30 AM",
            stockId: "TUX001234",
            productId: "REMA0123",
            warehouseId: "REMA0123",
            category: "E-Cigarettes",
            weight: "3 lb",
            stockLevel: "15000",
            recLevel: "15000",
        },
        {
            createdDate: "Jan 4, 2022",
            createdTime: "11:30 AM",
            stockId: "TUX001234",
            productId: "REMA0123",
            warehouseId: "REMA0123",
            category: "Edibles",
            weight: "3 lb",
            stockLevel: "15000",
            recLevel: "15000",
        },
        {
            createdDate: "Jan 4, 2022",
            createdTime: "11:30 AM",
            stockId: "TUX001234",
            productId: "REMA0123",
            warehouseId: "REMA0123",
            category: "Traditional Vapes",
            weight: "3 lb",
            stockLevel: "15000",
            recLevel: "15000",
        },
        {
            createdDate: "Jan 4, 2022",
            createdTime: "11:30 AM",
            stockId: "TUX001234",
            productId: "REMA0123",
            warehouseId: "REMA0123",
            category: "Edibles",
            weight: "3 lb",
            stockLevel: "15000",
            recLevel: "15000",
        },
        {
            createdDate: "Jan 4, 2022",
            createdTime: "11:30 AM",
            stockId: "TUX001234",
            productId: "REMA0123",
            warehouseId: "REMA0123",
            category: "E-Cigarettes",
            weight: "3 lb",
            stockLevel: "15000",
            recLevel: "15000",
        },
        {
            createdDate: "Jan 4, 2022",
            createdTime: "11:30 AM",
            stockId: "TUX001234",
            productId: "REMA0123",
            warehouseId: "REMA0123",
            category: "Edibles",
            weight: "3 lb",
            stockLevel: "15000",
            recLevel: "15000",
        },
        {
            createdDate: "Jan 4, 2022",
            createdTime: "11:30 AM",
            stockId: "TUX001234",
            productId: "REMA0123",
            warehouseId: "REMA0123",
            category: "E-Cigarettes",
            weight: "3 lb",
            stockLevel: "15000",
            recLevel: "15000",
        },
    ]
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleFormSubmit = async (formData) => {
        console.log("Submitted stock data:", formData);
        setIsOpen(false); // Close modal after successful submission
    };
    return (
        <div className="flex min-h-screen bg-[#eaecf0]">
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
                <div className="flex flex-col flex-1 pl-[250px] min-h-screen">
                    <div className="flex-1 px-4 md:px-8 pb-8 bg-gray-50">
                        <div className="relative overflow-hidden h-full">
                            <div className="overflow-x-auto h-[calc(100%-60px)]">
                                <main className="flex-1 p-8 overflow-auto">
                                    {/* Stock Table */}
                                    <div className="border rounded-lg shadow-sm bg-white border-[#eaecf0]">
                                        <div className="flex justify-between items-center p-6 border-b border-[#eaecf0]">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                                                    <input
                                                        placeholder="Search"
                                                        className="pl-9 w-64 h-10 rounded-lg border border-[#d0d5dd] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6941c6] focus:border-transparent"
                                                    />
                                                </div>
                                                <button className="h-10 px-4 rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center text-sm font-medium">
                                                    <Filter className="h-4 w-4 mr-2" />
                                                    Filters
                                                </button>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="h-10 px-4 rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center text-sm font-medium" onClick={handleOpen}>
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add New Stock
                                                </button>
                                                <button className="h-10 px-4 rounded-lg bg-[#6941c6] text-white hover:bg-[#7f56d9] flex items-center text-sm font-medium">
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Export
                                                </button>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                <tr className="bg-[#f9fafb] text-left border-b border-[#eaecf0]">
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Created Date</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Stock ID</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Product ID</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Warehouse ID</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Category</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Weight</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">
                                                        Stock Level
                                                        <br />
                                                        <span className="text-xs text-[#98a2b3]">(in units)</span>
                                                    </th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">
                                                        Rec. Level
                                                        <br />
                                                        <span className="text-xs text-[#98a2b3]">(in units)</span>
                                                    </th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-right">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {stockData.map((stock, idx) => (
                                                    <tr key={idx} className="border-b border-[#eaecf0] last:border-0 hover:bg-[#f9fafb]">
                                                        <td className="py-4 px-4 text-[#667085]">
                                                            <div>{stock.createdDate}</div>
                                                            <div className="text-xs text-[#98a2b3]">{stock.createdTime}</div>
                                                        </td>
                                                        <td className="py-4 px-4 text-[#101828] font-medium">{stock.stockId}</td>
                                                        <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f9f5ff] text-[#6941c6] border border-[#e9d7fe]">
                                  {stock.productId}
                                </span>
                                                        </td>
                                                        <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f9f5ff] text-[#6941c6] border border-[#e9d7fe]">
                                  {stock.warehouseId}
                                </span>
                                                        </td>
                                                        <td className="py-4 px-4">
                                <span className="text-[#667085] underline decoration-dotted cursor-pointer">
                                  {stock.category}
                                </span>
                                                        </td>
                                                        <td className="py-4 px-4 text-[#667085]">{stock.weight}</td>
                                                        <td className="py-4 px-4 text-[#667085]">{stock.stockLevel}</td>
                                                        <td className="py-4 px-4 text-[#667085]">{stock.recLevel}</td>
                                                        <td className="py-4 px-4 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button className="text-[#6941c6] hover:bg-[#f9f5ff] p-2 rounded-lg">
                                                                    <Edit className="h-4 w-4" />
                                                                </button>
                                                                <button className="text-[#ef2424] hover:bg-[#fef2f2] p-2 rounded-lg">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                                <button className="text-[#667085] hover:bg-[#f9fafb] p-2 rounded-lg">
                                                                    <Eye className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        <div className="flex justify-between items-center p-6 border-t border-[#eaecf0]">
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
                                </main>
                                <AddStockForm
                                    isOpen={isOpen}
                                    onClose={handleClose}
                                    onSubmit={handleFormSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
