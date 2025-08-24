// import {
//     Search,
//     Filter,
//     Plus,
//     Download,
//     TrendingUp,
//     Edit,
//     Trash2,
//     Eye,
//     ChevronLeft,
//     ChevronRight,
//     MoreHorizontal,
// } from "lucide-react"
// import { Layout } from "../../components/layout/Layout.jsx"
// import { useState } from "react";
// import { AddSupplierForm } from "./add-supplier-form.jsx";
// import {
//     useGetSuppliersQuery,
//     useDeleteSupplierMutation
// } from "../../redux/services/suppliers.js";
//
// export const Suppliers = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//
//     // API hooks
//     const { data: suppliersResponse, isLoading, error, refetch } = useGetSuppliersQuery();
//     const [deleteSupplier] = useDeleteSupplierMutation();
//
//     const handleOpen = () => setIsOpen(true);
//     const handleClose = () => setIsOpen(false);
//
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this supplier?")) {
//             try {
//                 await deleteSupplier(id).unwrap();
//                 refetch();
//             } catch (error) {
//                 console.error("Failed to delete supplier:", error);
//                 alert("Failed to delete supplier. Please try again.");
//             }
//         }
//     };
//
//     const handleFormSubmit = async (formData) => {
//         console.log("Submitted supplier data:", formData);
//         setIsOpen(false);
//         refetch();
//     };
//
//     // Extract suppliers data from response and ensure it's an array
//     // Debug: Log the actual API response structure
//     console.log("Suppliers API Response:", suppliersResponse);
//     console.log("Suppliers Response Type:", typeof suppliersResponse);
//     console.log("Is Array:", Array.isArray(suppliersResponse));
//     //
//     // const suppliersArray = Array.isArray(suppliersResponse)
//     //     ? suppliersResponse
//     //     : suppliersResponse?.data?.suppliers
//     //     ? Array.isArray(suppliersResponse.data.suppliers)
//     //         ? suppliersResponse.data.suppliers
//     //         : []
//     //     : suppliersResponse?.suppliers
//     //     ? Array.isArray(suppliersResponse.suppliers)
//     //         ? suppliersResponse.suppliers
//     //         : []
//     //     : suppliersResponse?.data
//     //     ? Array.isArray(suppliersResponse.data)
//     //         ? suppliersResponse.data
//     //         : []
//     //     : [];
//     const suppliersArray = Array.isArray(suppliersResponse?.data?.data) ? suppliersResponse.data.data : [];
//
//
//     console.log("Extracted suppliers array:", suppliersArray);
//     console.log("Suppliers array length:", suppliersArray.length);
//
//     // Filter suppliers based on search term
//     const filteredSuppliers = suppliersArray.filter(supplier =>
//         supplier.supplier_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         supplier.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     if (isLoading) {
//         return (
//             <Layout>
//                 <div className="flex justify-center items-center h-64">
//                     <div className="text-lg">Loading suppliers...</div>
//                 </div>
//             </Layout>
//         );
//     }
//
//     if (error) {
//         return (
//             <Layout>
//                 <div className="flex justify-center items-center h-64">
//                     <div className="text-lg text-red-600">
//                         Error loading suppliers: {error.message || "Something went wrong"}
//                     </div>
//                 </div>
//             </Layout>
//         );
//     }
//
//     return (
//         <div className="flex min-h-screen bg-[#eaecf0]">
//             <Layout>
//                 {/* Header Section */}
//                 <div className="px-8 pt-6 pb-4">
//                     {/* Back button */}
//                     <button className="font-medium text-[#6840c6] hover:underline flex items-center text-sm">
//                         <span className="mr-1">←</span> Back
//                     </button>
//
//                     {/* Title */}
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
//                         <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Suppliers</h1>
//                     </div>
//                 </div>
//
//                 {/* Main Content */}
//                 <div className="flex flex-col flex-1   min-h-screen">
//                     <div className="flex-1 px-4 md:px-8 pb-8 bg-gray-50">
//                         <div className="relative overflow-hidden h-full">
//                             <div className="overflow-x-auto h-[calc(100%-60px)]">
//                                 <main className="flex-1 p-8 overflow-auto">
//                                     {/* Summary Cards */}
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                                         {[
//                                             { title: "Active Suppliers", value: 100, color: "#6941c6", textColor: "text-white" },
//                                             { title: "Inactive Suppliers", value: 19, color: "#fff", textColor: "text-[#101828]" },
//                                             { title: "Deleted Suppliers", value: 10, color: "#fff", textColor: "text-[#101828]" },
//                                         ].map((card, idx) => (
//                                             <div
//                                                 key={idx}
//                                                 className={`rounded-lg shadow-sm p-6 border ${card.textColor} ${
//                                                     card.color === "#fff" ? "border-[#eaecf0]" : "border-transparent"
//                                                 }`}
//                                                 style={{ backgroundColor: card.color }}
//                                             >
//                                                 <div className="text-sm font-medium mb-2 opacity-90">{card.title}</div>
//                                                 <div className="text-4xl font-bold mb-2">{card.value}</div>
//                                                 <p className="text-sm flex items-center gap-1 opacity-90">
//                                                     <TrendingUp className="h-4 w-4" />
//                                                     12% vs last month
//                                                 </p>
//                                             </div>
//                                         ))}
//                                     </div>
//
//                                     {/* Active Suppliers Table */}
//                                     <h2 className="text-2xl font-bold text-[#101828] mb-6">Active Suppliers</h2>
//                                     <div className="border rounded-lg shadow-sm bg-white border-[#eaecf0]">
//                                         <div className="flex justify-between items-center p-6 border-b border-[#eaecf0]">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="relative">
//                                                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
//                                                     <input
//                                                         placeholder="Search"
//                                                         className="pl-9 w-64 h-10 rounded-lg border border-[#d0d5dd] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6941c6] focus:border-transparent"
//                                                         value={searchTerm}
//                                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <button className="h-10 px-4 rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center text-sm font-medium">
//                                                     <Filter className="h-4 w-4 mr-2" />
//                                                     Filters
//                                                 </button>
//                                             </div>
//                                             <div className="flex gap-3">
//                                                 <button className="h-10 px-4 rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center text-sm font-medium" onClick={handleOpen}>
//                                                     <Plus className="h-4 w-4 mr-2" />
//                                                     Add New Supplier
//                                                 </button>
//                                                 <button className="h-10 px-4 rounded-lg bg-[#6941c6] text-white hover:bg-[#7f56d9] flex items-center text-sm font-medium">
//                                                     <Download className="h-4 w-4 mr-2" />
//                                                     Export
//                                                 </button>
//                                             </div>
//                                         </div>
//
//                                         <div className="overflow-x-auto">
//                                             <table className="w-full text-sm">
//                                                 <thead>
//                                                 <tr className="bg-[#f9fafb] text-left border-b border-[#eaecf0]">
//                                                     <th className="p-4 font-medium text-[#667085]">
//                                                         <input type="checkbox" className="rounded border-[#d0d5dd]" />
//                                                     </th>
//                                                     <th className="py-3 px-4 font-medium text-[#667085] text-left">Supplier ID</th>
//                                                     <th className="py-3 px-4 font-medium text-[#667085] text-left">Contact Person</th>
//                                                     <th className="py-3 px-4 font-medium text-[#667085] text-left">Email-Id</th>
//                                                     <th className="py-3 px-4 font-medium text-[#667085] text-left">Address</th>
//                                                     <th className="py-3 px-4 font-medium text-[#667085] text-left">Phone Number</th>
//                                                     <th className="py-3 px-4 font-medium text-[#667085] text-right">Actions</th>
//                                                 </tr>
//                                                 </thead>
//                                                 <tbody className="bg-white divide-y divide-gray-200">
//                                                 {filteredSuppliers.map((supplier, index) => (
//                                                     <tr key={supplier.id || index} className="hover:bg-gray-50">
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                             {supplier.id || `SUP-${index + 1}`}
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap">
//                                                             <div className="flex items-center">
//                                                                 <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
//                                                                     <span className="text-purple-700 font-medium text-sm">
//                                                                         {(supplier.contact_person || supplier.supplier_name || 'S').charAt(0).toUpperCase()}
//                                                                     </span>
//                                                                 </div>
//                                                                 <div>
//                                                                     <div className="text-sm font-medium text-gray-900">
//                                                                         {supplier.contact_person || "No contact person"}
//                                                                     </div>
//                                                                     <div className="text-sm text-gray-500">
//                                                                         {supplier.supplier_name}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                             {supplier.email || "No email"}
//                                                         </td>
//                                                         <td className="px-6 py-4 text-sm text-gray-900">
//                                                             <div>
//                                                                 {supplier.address || "No address provided"}
//                                                             </div>
//                                                             <div className="text-gray-500">
//                                                                 {supplier.city && supplier.state
//                                                                     ? `${supplier.city}, ${supplier.state}`
//                                                                     : supplier.city || supplier.state || ""}
//                                                             </div>
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                             {supplier.phone || "No phone"}
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             <div className="flex space-x-2">
//                                                                 <button className="text-blue-600 hover:text-blue-900">
//                                                                     <Eye className="w-4 h-4" />
//                                                                 </button>
//                                                                 <button className="text-green-600 hover:text-green-900">
//                                                                     <Edit className="w-4 h-4" />
//                                                                 </button>
//                                                                 <button
//                                                                     onClick={() => handleDelete(supplier.id)}
//                                                                     className="text-red-600 hover:text-red-900"
//                                                                 >
//                                                                     <Trash2 className="w-4 h-4" />
//                                                                 </button>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//
//                                         {/* Pagination */}
//                                         <div className="flex justify-between items-center p-6 border-t border-[#eaecf0]">
//                                             <button className="flex items-center text-[#344054] border border-[#d0d5dd] rounded-lg px-4 py-2 bg-white hover:bg-[#f9fafb] text-sm font-medium">
//                                                 <ChevronLeft className="h-4 w-4 mr-2" />
//                                                 Previous
//                                             </button>
//                                             <div className="flex gap-1">
//                                                 {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
//                                                     <button
//                                                         key={i}
//                                                         className={`h-10 w-10 text-sm rounded-lg font-medium ${
//                                                             page === 1 ? "bg-[#6941c6] text-white" : "text-[#667085] hover:bg-[#f9fafb]"
//                                                         }`}
//                                                     >
//                                                         {page}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                             <button className="flex items-center text-[#344054] border border-[#d0d5dd] rounded-lg px-4 py-2 bg-white hover:bg-[#f9fafb] text-sm font-medium">
//                                                 Next
//                                                 <ChevronRight className="h-4 w-4 ml-2" />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </main>
//                                 <AddSupplierForm
//                                     isOpen={isOpen}
//                                     onClose={handleClose}
//                                     onSubmit={handleFormSubmit}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Layout>
//         </div>
//     )
// }
import {
    Search,
    Filter,
    Plus,
    Download,
    TrendingUp,
    Edit,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"
import { useState } from "react";
import { AddSupplierForm } from "./add-supplier-form.jsx";
import {
    useGetSuppliersQuery,
    useDeleteSupplierMutation
} from "../../redux/services/suppliers.js";

export const Suppliers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // API hooks
    const { data: suppliersResponse, isLoading, error, refetch } = useGetSuppliersQuery();
    const [deleteSupplier] = useDeleteSupplierMutation();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this supplier?")) {
            try {
                await deleteSupplier(id).unwrap();
                refetch();
            } catch (error) {
                console.error("Failed to delete supplier:", error);
                alert("Failed to delete supplier. Please try again.");
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        console.log("Submitted supplier data:", formData);
        setIsOpen(false);
        refetch();
    };

    const suppliersArray = Array.isArray(suppliersResponse?.data?.data) ? suppliersResponse.data.data : [];

    // Filter suppliers based on search term
    const filteredSuppliers = suppliersArray.filter(supplier =>
        supplier.supplier_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading suppliers...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">
                        Error loading suppliers: {error.message || "Something went wrong"}
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

                {/* Title */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Suppliers</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-8 pb-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { title: "Active Suppliers", value: 100, color: "#6941c6", textColor: "text-white" },
                        { title: "Inactive Suppliers", value: 19, color: "#fff", textColor: "text-[#101828]" },
                        { title: "Deleted Suppliers", value: 10, color: "#fff", textColor: "text-[#101828]" },
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

                {/* Active Suppliers Table */}
                <h2 className="text-2xl font-bold text-[#101828] mb-6">Active Suppliers</h2>
                <div className="border rounded-lg shadow-sm bg-white border-[#eaecf0]">
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
                                Add New Supplier
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
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Supplier ID</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Contact Person</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Email-Id</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Address</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-left">Phone Number</th>
                                <th className="py-3 px-4 font-medium text-[#667085] text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSuppliers.length > 0 ? (
                                filteredSuppliers.map((supplier, index) => (
                                    <tr key={supplier.id || index} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <input type="checkbox" className="rounded border-[#d0d5dd]" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {supplier.id || `SUP-${index + 1}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-purple-700 font-medium text-sm">
                                                        {(supplier.contact_person || supplier.supplier_name || 'S').charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {supplier.contact_person || "No contact person"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {supplier.supplier_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {supplier.email || "No email"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div>
                                                {supplier.address || "No address provided"}
                                            </div>
                                            <div className="text-gray-500">
                                                {supplier.city && supplier.state
                                                    ? `${supplier.city}, ${supplier.state}`
                                                    : supplier.city || supplier.state || ""}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {supplier.phone || "No phone"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2 justify-end">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-green-600 hover:text-green-900">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(supplier.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No suppliers found
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

                <AddSupplierForm
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSubmit={handleFormSubmit}
                />
            </div>
        </Layout>
    )
}