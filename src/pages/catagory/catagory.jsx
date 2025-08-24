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
import { Layout } from "../../components/layout/Layout.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useState } from "react";
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useCreateCategoryMutation
} from "../../redux/services/categories.js";

export const Catagory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCategoryData, setNewCategoryData] = useState({
        category_name: "",
        description: "",
        parent_id: null,
        is_active: true
    });

    // API hooks
    const { data: categoriesData, isLoading, error, refetch } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [createCategory] = useCreateCategoryMutation();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id).unwrap();
                refetch();
            } catch (error) {
                console.error("Failed to delete category:", error);
                alert("Failed to delete category. Please try again.");
            }
        }
    };

    const handleAddCategory = async () => {
        try {
            // Map frontend field names to backend expected field names
            const categoryPayload = {
                name: newCategoryData.category_name, // Backend expects 'name' not 'category_name'
                description: newCategoryData.description,
                parent_id: newCategoryData.parent_id,
                is_active: newCategoryData.is_active
            };

            await createCategory(categoryPayload).unwrap();
            setNewCategoryData({
                category_name: "",
                description: "",
                parent_id: null,
                is_active: true
            });
            setIsAddModalOpen(false);
            refetch();
        } catch (error) {
            console.error("Failed to create category:", error);
            alert("Failed to create category. Please try again.");
        }
    };

    // Extract categories data from response and ensure it's an array
    const categoriesArray = Array.isArray(categoriesData)
        ? categoriesData
        : categoriesData?.data
        ? Array.isArray(categoriesData.data)
            ? categoriesData.data
            : []
        : [];

    // Filter categories based on search term
    const filteredCategories = categoriesArray.filter(category =>
        category.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading categories...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">
                        Error loading categories: {error.message || "Something went wrong"}
                    </div>
                </div>
            </Layout>
        );
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

                    {/* Title and Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Categories</h1>

                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="flex items-center gap-2">
                                <FilterXIcon className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Filters</span>
                            </Button>

                            <Button
                                className="flex items-center gap-2 bg-[#6840c6] hover:bg-[#5a38b0] text-white"
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                <PlusCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Add New Category</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-4 md:px-8 pb-8">
                    <div className="bg-white rounded-lg shadow border">
                        {/* Search and Filter Bar */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        placeholder="Search categories..."
                                        className="pl-9 w-64 h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6840c6] focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        </div>

                        {/* Categories Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCategories.map((category, index) => (
                                        <tr key={category.id || index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {category.category_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {category.description || "No description"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    category.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {category.created_at ? new Date(category.created_at).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-900">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(category.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* No data message */}
                        {filteredCategories.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No categories found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add Category Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category Name *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6840c6]"
                                        value={newCategoryData.category_name}
                                        onChange={(e) => setNewCategoryData({...newCategoryData, category_name: e.target.value})}
                                        placeholder="Enter category name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6840c6]"
                                        rows="3"
                                        value={newCategoryData.description}
                                        onChange={(e) => setNewCategoryData({...newCategoryData, description: e.target.value})}
                                        placeholder="Enter category description"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAddCategory}
                                    className="bg-[#6840c6] hover:bg-[#5a38b0] text-white"
                                    disabled={!newCategoryData.category_name.trim()}
                                >
                                    Add Category
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
        </div>
    );
};
