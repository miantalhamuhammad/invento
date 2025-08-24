import {
    Search,
    ArrowLeft,
    Calendar,
    ArrowUp,
    Filter,
    Plus,
    Download,
    Pencil,
    Trash2,
    Eye,
    ArrowRight, FilterXIcon, CalendarIcon, PlusCircleIcon,
} from "lucide-react";
import {Layout} from "../../components/layout/Layout.jsx";
import {Button} from "../../components/ui/button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export const Catagory = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        // Fetch categories data from API
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/categories");
                setCategoriesData(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        // Extract categories data from response and ensure it's an array
        const categoriesArray = Array.isArray(categoriesData)
            ? categoriesData
            : categoriesData?.data
                ? Array.isArray(categoriesData.data)
                    ? categoriesData.data
                    : []
                : [];

        // Filter categories based on search term
        const filtered = categoriesArray.filter(category =>
            category.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCategories(filtered);
    }, [categoriesData, searchTerm]);

    return (
        <div className="flex min-h-screen bg-[#eaecf0]">
            <Layout>
                {/* Header Section */}
                <div className="px-8 pt-6 pb-4">
                    {/* Back button */}
                    <button className="font-medium text-[#6840c6] hover:underline flex items-center text-sm">
                        <span className="mr-1">←</span> Back
                    </button>

                    {/* Title and Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Products</h1>

                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="flex items-center gap-2">
                                <FilterXIcon className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Filters</span>
                            </Button>

                            {/*<Button variant="outline" className="flex items-center gap-2">*/}
                            {/*    <CalendarIcon className="w-4 h-4 md:w-5 md:h-5" />*/}
                            {/*    <span>Select dates</span>*/}
                            {/*</Button>*/}

                            <Button className="flex items-center gap-2 bg-[#6840c6] hover:bg-[#5a38b0] text-white">
                                <PlusCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Add New Product</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1   min-h-screen"> {/* Main container */}
                    <div className="flex-1 px-4 md:px-8 pb-8 bg-gray-50"> {/* Content container */}
                        <div className="relative overflow-hidden h-full"> {/* Card container */}
                            {/* Product Table */}
                            <div className="overflow-x-auto h-[calc(100%-60px)]"> {/* Scrollable area */}
                                {/* Main Content */}
                                <main className="flex-1 p-8 overflow-auto">
                                    <div className="flex items-center gap-2 mb-6 text-sm font-medium text-[#667085]">
                                        <ArrowLeft className="h-4 w-4" />
                                        <a href="#">Back</a>
                                    </div>
                                    <h1 className="text-3xl font-bold text-[#101828] mb-6">Category</h1>

                                    {/* Date Range Buttons */}
                                    {/*<div className="flex gap-2 mb-6">*/}
                                    {/*    {["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"].map((range) => (*/}
                                    {/*        <button*/}
                                    {/*            key={range}*/}
                                    {/*            className={`h-9 px-4 text-sm font-medium rounded-lg border ${*/}
                                    {/*                range === "1m"*/}
                                    {/*                    ? "bg-[#f9f5ff] text-[#7f56d9] border-[#7f56d9]"*/}
                                    {/*                    : "bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb]"*/}
                                    {/*            }`}*/}
                                    {/*        >*/}
                                    {/*            {range}*/}
                                    {/*        </button>*/}
                                    {/*    ))}*/}
                                    {/*    <button className="h-9 px-4 text-sm font-medium rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">*/}
                                    {/*        <Calendar className="h-4 w-4 mr-2" />*/}
                                    {/*        Select dates*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}

                                    {/* Summary Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        {[
                                            { title: "Active Categories", value: 100, color: "#6941c6", textColor: "text-white" },
                                            { title: "Inactive Categories", value: 19, color: "#fff", textColor: "text-[#101828]" },
                                            { title: "Deleted Categories", value: 10, color: "#fff", textColor: "text-[#101828]" },
                                        ].map((card, idx) => (
                                            <div
                                                key={idx}
                                                className={`rounded-lg shadow-sm p-4 ${card.textColor}`}
                                                style={{ backgroundColor: card.color }}
                                            >
                                                <div className="text-sm font-medium mb-1">{card.title}</div>
                                                <div className="text-4xl font-bold">{card.value}</div>
                                                <p className="text-xs flex items-center gap-1 mt-1">
                                                    <ArrowUp className="h-3 w-3" />
                                                    12% vs last month
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Table */}
                                    <h2 className="text-2xl font-bold text-[#101828] mb-6">Active Categories</h2>
                                    <div className="border rounded-lg shadow-sm bg-white">
                                        <div className="flex justify-between items-center p-4 border-b">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98a2b3]" />
                                                    <input
                                                        placeholder="Search"
                                                        className="pl-9 w-64 rounded-lg border border-[#d0d5dd]"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                                <button className="h-9 px-4 rounded border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">
                                                    <Filter className="h-4 w-4 mr-2" />
                                                    Filters
                                                </button>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="h-9 px-4 rounded border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add New Category
                                                </button>
                                                <button className="h-9 px-4 rounded bg-[#6941c6] text-white hover:bg-[#7f56d9] flex items-center">
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Export
                                                </button>
                                            </div>
                                        </div>
                                        <table className="w-full text-sm">
                                            <thead>
                                            <tr className="bg-[#f9fafb] text-left border-b">
                                                <th className="p-4">
                                                    <input type="checkbox" />
                                                </th>
                                                <th>Category Name</th>
                                                <th>Category ID</th>
                                                <th>Description</th>
                                                <th>Products</th>
                                                <th className="text-right pr-4">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredCategories.length > 0 ? (
                                                filteredCategories.map((category, idx) => (
                                                    <tr key={idx} className="border-b last:border-0">
                                                        <td className="p-4">
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>{category.category_name}</td>
                                                        <td>{category.category_id}</td>
                                                        <td>{category.description}</td>
                                                        <td>{category.products_count} Products</td>
                                                        <td className="text-right pr-4">
                                                            <div className="flex justify-end gap-2">
                                                                <button className="text-[#750983] hover:bg-[#f4ebff] p-1 rounded">
                                                                    <Pencil className="h-4 w-4" />
                                                                </button>
                                                                <button className="text-[#ef2424] hover:bg-[#fef2f2] p-1 rounded">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                                <button className="text-[#3a3a3a] hover:bg-[#f9fafb] p-1 rounded">
                                                                    <Eye className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4 text-sm text-[#667085]">
                                                        No categories found.
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                        <div className="flex justify-between items-center p-4 border-t">
                                            <button className="flex items-center text-[#344054] border border-[#d0d5dd] rounded px-3 py-2 bg-white hover:bg-[#f9fafb]">
                                                <ArrowLeft className="h-4 w-4 mr-2" />
                                                Previous
                                            </button>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
                                                    <button
                                                        key={i}
                                                        className={`h-9 w-9 text-sm rounded ${
                                                            page === 1 ? "bg-[#f9f5ff] text-[#7f56d9]" : "text-[#667085] hover:bg-[#f9fafb]"
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                            </div>
                                            <button className="flex items-center text-[#344054] border border-[#d0d5dd] rounded px-3 py-2 bg-white hover:bg-[#f9fafb]">
                                                Next
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </button>
                                        </div>
                                    </div>
                                </main>                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </div>
    );
}
