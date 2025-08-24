import { Search, Filter, Plus, Download, TrendingUp, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"
import {useState} from "react";
import {AddEmployeeForm} from "./add-employee-form";

export const Employee = () => {
    const employeeData = [
        {
            id: "BC2022110001",
            employeeName: "Phoenix Baker",
            departmentId: "BC2022110001",
            warehouseId: "BC2022110001",
            hireDate: "Jan 4, 2022",
            hireTime: "11:30 AM",
            phone: "+1 8639724863",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "PB",
        },
        {
            id: "BC2022110001",
            employeeName: "Lana Steiner",
            departmentId: "BC2022110001",
            warehouseId: "BC2022110001",
            hireDate: "Jan 4, 2022",
            hireTime: "11:30 AM",
            phone: "+1 8639724863",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "LS",
        },
        {
            id: "BC2022110001",
            employeeName: "Demi Wilkinson",
            departmentId: "BC2022110001",
            warehouseId: "BC2022110001",
            hireDate: "Jan 4, 2022",
            hireTime: "11:30 AM",
            phone: "+1 8639724863",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "DW",
        },
        {
            id: "BC2022110001",
            employeeName: "Candice Wu",
            departmentId: "BC2022110001",
            warehouseId: "BC2022110001",
            hireDate: "Jan 4, 2022",
            hireTime: "11:30 AM",
            phone: "+1 8639724863",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "CW",
        },
    ]
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleFormSubmit = async (formData) => {
        console.log("Submitted employee data:", formData);
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

                    {/* Title */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Employee</h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1   min-h-screen">
                    <div className="flex-1 px-4 md:px-8 pb-8 bg-gray-50">
                        <div className="relative overflow-hidden h-full">
                            <div className="overflow-x-auto h-[calc(100%-60px)]">
                                <main className="flex-1 p-8 overflow-auto">
                                    {/* Summary Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        {[
                                            { title: "Active Employees", value: 100, color: "#6941c6", textColor: "text-white" },
                                            { title: "Inactive Employees", value: 19, color: "#fff", textColor: "text-[#101828]" },
                                            { title: "Deleted Employees", value: 10, color: "#fff", textColor: "text-[#101828]" },
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

                                    {/* Active Employee Table */}
                                    <h2 className="text-2xl font-bold text-[#101828] mb-6">Active Employee</h2>
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
                                                    Add New Employee
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
                                                    <th className="p-4 font-medium text-[#667085]">
                                                        <input type="checkbox" className="rounded border-[#d0d5dd]" />
                                                    </th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Employee Name</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Employee ID</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Department ID</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Warehouse ID</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Hire Date</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-left">Phone Number</th>
                                                    <th className="py-3 px-4 font-medium text-[#667085] text-right">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {employeeData.map((employee, idx) => (
                                                    <tr key={idx} className="border-b border-[#eaecf0] last:border-0 hover:bg-[#f9fafb]">
                                                        <td className="p-4">
                                                            <input type="checkbox" className="rounded border-[#d0d5dd]" />
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-[#f9f5ff] flex items-center justify-center text-xs font-medium text-[#6941c6]">
                                                                    {employee.initials}
                                                                </div>
                                                                <span className="font-medium text-[#101828]">{employee.employeeName}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4 text-[#101828] font-medium">{employee.id}</td>
                                                        <td className="py-4 px-4 text-[#101828] font-medium">{employee.departmentId}</td>
                                                        <td className="py-4 px-4 text-[#101828] font-medium">{employee.warehouseId}</td>
                                                        <td className="py-4 px-4 text-[#667085]">
                                                            <div>{employee.hireDate}</div>
                                                            <div className="text-xs text-[#98a2b3]">{employee.hireTime}</div>
                                                        </td>
                                                        <td className="py-4 px-4 text-[#667085]">{employee.phone}</td>
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
                                <AddEmployeeForm
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
