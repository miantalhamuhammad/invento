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
import {useState} from "react";
import {AddShipmentForm} from "./add-shipment-form.jsx";

export const Shipment = () => {
    const timeRanges = ["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"]

    const shipmentData = [
        {
            shippedDate: "Jan 4, 2022",
            shippedTime: "11:30 AM",
            shipmentId: "TUX001234",
            salesOrderId: "REMA0123",
            trackingId: "REMA0123",
            etd: "",
            status: "Delayed",
            statusColor: "bg-[#fffaeb] text-[#b54708]",
            actions: ["file", "eye"],
        },
        {
            shippedDate: "Jan 4, 2022",
            shippedTime: "11:30 AM",
            shipmentId: "TUX001234",
            salesOrderId: "REMA0123",
            trackingId: "REMA0123",
            etd: "Jan 4, 2022",
            etdTime: "11:30 AM",
            status: "Delayed",
            statusColor: "bg-[#fffaeb] text-[#b54708]",
            actions: ["file", "eye"],
        },
        {
            shippedDate: "Jan 4, 2022",
            shippedTime: "11:30 AM",
            shipmentId: "TUX001234",
            salesOrderId: "REMA0123",
            trackingId: "REMA0123",
            etd: "Jan 4, 2022",
            etdTime: "11:30 AM",
            status: "Delivered",
            statusColor: "bg-[#ecfdf3] text-[#027a48]",
            actions: ["eye"],
            remarks: "POC not available at address",
        },
        {
            shippedDate: "Jan 4, 2022",
            shippedTime: "11:30 AM",
            shipmentId: "TUX001234",
            salesOrderId: "REMA0123",
            trackingId: "REMA0123",
            etd: "Jan 4, 2022",
            etdTime: "11:30 AM",
            status: "RTO",
            statusColor: "bg-[#fef2f2] text-[#b91c1c]",
            actions: ["file", "rotate"],
        },
        {
            shippedDate: "Jan 4, 2022",
            shippedTime: "11:30 AM",
            shipmentId: "TUX001234",
            salesOrderId: "REMA0123",
            trackingId: "REMA0123",
            etd: "Jan 4, 2022",
            etdTime: "11:30 AM",
            status: "In Transit",
            statusColor: "bg-[#f4f3ff] text-[#6941c6]",
            actions: ["file", "map"],
        },
        {
            shippedDate: "Jan 4, 2022",
            shippedTime: "11:30 AM",
            shipmentId: "TUX001234",
            salesOrderId: "REMA0123",
            trackingId: "REMA0123",
            etd: "Jan 4, 2022",
            etdTime: "11:30 AM",
            status: "Re-attempt",
            statusColor: "bg-[#fef2f2] text-[#b91c1c]",
            actions: ["edit", "map"],
        },
        {
            shippedDate: "Jan 4, 2022",
            shippedTime: "11:30 AM",
            shipmentId: "TUX001234",
            salesOrderId: "REMA0123",
            trackingId: "REMA0123",
            etd: "Jan 4, 2022",
            etdTime: "11:30 AM",
            status: "In Transit",
            statusColor: "bg-[#f4f3ff] text-[#6941c6]",
            actions: ["file", "map"],
        },
        {
            shippedDate: "Jan 4, 2022",
            shippedTime: "11:30 AM",
            shipmentId: "TUX001234",
            salesOrderId: "REMA0123",
            trackingId: "REMA0123",
            etd: "Jan 4, 2022",
            etdTime: "11:30 AM",
            status: "Delivered",
            statusColor: "bg-[#ecfdf3] text-[#027a48]",
            actions: ["file2"],
        },
    ]
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleFormSubmit = async (formData) => {
        console.log("Submitted shipment data:", formData);
        setIsOpen(false); // Close modal after successful submission
    };
    const getActionIcon = (action) => {
        switch (action) {
            case "edit":
                return <Edit className="h-4 w-4" />
            case "file":
                return <FileText className="h-4 w-4" />
            case "file2":
                return <FileText className="h-4 w-4" />
            case "eye":
                return <Eye className="h-4 w-4" />
            case "rotate":
                return <RotateCcw className="h-4 w-4" />
            case "map":
                return <MapPin className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }

    const getActionColor = (action) => {
        switch (action) {
            case "edit":
                return "text-[#6941c6] hover:bg-[#f9f5ff]"
            case "file":
                return "text-[#667085] hover:bg-[#f9fafb]"
            case "file2":
                return "text-[#667085] hover:bg-[#f9fafb]"
            case "eye":
                return "text-[#667085] hover:bg-[#f9fafb]"
            case "rotate":
                return "text-[#667085] hover:bg-[#f9fafb]"
            case "map":
                return "text-[#667085] hover:bg-[#f9fafb]"
            default:
                return "text-[#667085] hover:bg-[#f9fafb]"
        }
    }

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
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Shipment</h1>
                        <div className="flex flex-wrap gap-2">
                            {timeRanges.map((range) => (
                                <button onClick={handleOpen}
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
                                    {/* Shipment Table */}
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
                                                {shipmentData.map((shipment, idx) => (
                                                    <tr key={idx} className="border-b border-[#eaecf0] last:border-0 hover:bg-[#f9fafb]">
                                                        <td className="py-4 px-4 text-[#667085]">
                                                            <div>{shipment.shippedDate}</div>
                                                            <div className="text-xs text-[#98a2b3]">{shipment.shippedTime}</div>
                                                        </td>
                                                        <td className="py-4 px-4 text-[#101828] font-medium">{shipment.shipmentId}</td>
                                                        <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f9f5ff] text-[#6941c6] border border-[#e9d7fe]">
                                  {shipment.salesOrderId}
                                </span>
                                                        </td>
                                                        <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f9f5ff] text-[#6941c6] border border-[#e9d7fe]">
                                  {shipment.trackingId}
                                </span>
                                                        </td>
                                                        <td className="py-4 px-4 text-[#667085]">
                                                            {shipment.etd ? (
                                                                <div>
                                                                    <div>{shipment.etd}</div>
                                                                    <div className="text-xs text-[#98a2b3]">{shipment.etdTime}</div>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </td>
                                                        <td className="py-4 px-4">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shipment.statusColor}`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                                    {shipment.status}
                                </span>
                                                            {shipment.remarks && (
                                                                <div className="text-xs text-[#ef2424] mt-1">
                                                                    <span className="font-medium">Remarks:</span>
                                                                    <br />
                                                                    {shipment.remarks}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="py-4 px-4 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                {shipment.actions.map((action, actionIdx) => (
                                                                    <button key={actionIdx} className={`p-2 rounded-lg ${getActionColor(action)}`}>
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
                                <AddShipmentForm
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
