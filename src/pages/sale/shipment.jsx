import {
    Search,
    Filter,
    Download,
    Calendar,
    Edit,
    FileText,
    Eye,
    RotateCcw,
    MapPin,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"
import {useState, useEffect} from "react";
import {AddShipmentForm} from "./add-shipment-form.jsx";
import { shipmentService } from "../../services/index.js";

export const Shipment = () => {
    const timeRanges = ["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"];
    const [isOpen, setIsOpen] = useState(false);
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch shipments from API
    const fetchShipments = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await shipmentService.getShipments();
            setShipments(data.data?.shipments || []);
        } catch (err) {
            setError(err.message || "Error fetching shipments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            await shipmentService.createShipment(formData);
            await fetchShipments();
            setIsOpen(false);
        } catch (err) {
            setError(err.message || "Error adding shipment");
        } finally {
            setLoading(false);
        }
    };

    const getActionIcon = (action) => {
        switch (action) {
            case "edit": return <Edit className="h-4 w-4" />;
            case "file": return <FileText className="h-4 w-4" />;
            case "file2": return <FileText className="h-4 w-4" />;
            case "eye": return <Eye className="h-4 w-4" />;
            case "rotate": return <RotateCcw className="h-4 w-4" />;
            case "map": return <MapPin className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getActionColor = (action) => {
        switch (action) {
            case "edit": return "text-[#6941c6] hover:bg-[#f9f5ff]";
            default: return "text-[#667085] hover:bg-[#f9fafb]";
        }
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
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Shipment</h1>
                    <div className="flex flex-wrap gap-2">
                        {timeRanges.map((range) => (
                            <button
                                key={range}
                                onClick={handleOpen}
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
                {/* Shipment Table */}
                <div className="border rounded-lg shadow-sm bg-white border-[#eaecf0] w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-[#eaecf0] gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                                <input
                                    placeholder="Search"
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
                                className="h-10 px-4 rounded-lg bg-[#6941c6] text-white hover:bg-[#7f56d9] flex items-center text-sm font-medium"
                                onClick={handleOpen}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="bg-[#f9fafb] text-left border-b border-[#eaecf0]">
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Shipped Date</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Shipment ID</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Sales Order ID</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Tracking ID</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">ETD</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Status</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {shipments.map((shipment, idx) => (
                                <tr key={idx} className="border-b border-[#eaecf0] last:border-0 hover:bg-[#f9fafb]">
                                    <td className="py-4 px-4 text-[#667085]">
                                        <div>{shipment.shipping_date || '-'}</div>
                                    </td>
                                    <td className="py-4 px-4 text-[#101828] font-medium">{shipment.shipment_number}</td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f9f5ff] text-[#6941c6] border border-[#e9d7fe]">
                                            {shipment.saleOrder?.so_number || '-'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f9f5ff] text-[#6941c6] border border-[#e9d7fe]">
                                            {shipment.tracking_number || '-'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-[#667085]">
                                        {shipment.expected_delivery_date || '-'}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shipment.statusColor || ''}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                                            {shipment.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            {(shipment.actions || []).map((action, actionIdx) => (
                                                <button
                                                    key={actionIdx}
                                                    className={`p-2 rounded-lg ${getActionColor(action)}`}
                                                >
                                                    {getActionIcon(action)}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
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

                <AddShipmentForm
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSubmit={handleFormSubmit}
                />
            </div>
        </Layout>
    )
}