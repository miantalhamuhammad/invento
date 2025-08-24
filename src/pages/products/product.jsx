import {
    CalendarIcon,
    FilterXIcon,
    PlusCircleIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { AddProductForm } from "./add-product";
import { ProductListSection } from "./sections/ListSection";
import { Layout } from "../../components/layout/Layout";
import { useState } from "react";
import {
    useGetProductsQuery,
    useDeleteProductMutation
} from "../../redux/services/products.js";

export const Product = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // API hooks
    const { data: productsResponse, isLoading, error, refetch } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id).unwrap();
                refetch();
            } catch (error) {
                console.error("Failed to delete product:", error);
                alert("Failed to delete product. Please try again.");
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        console.log("Submitted product data:", formData);
        setIsOpen(false);
        refetch();
    };

    // Extract products data from response and ensure it's an array
    const productsArray = Array.isArray(productsResponse)
        ? productsResponse
        : productsResponse?.data?.data
        ? Array.isArray(productsResponse.data.data)
            ? productsResponse.data.data
            : []
        : productsResponse?.data?.products
        ? Array.isArray(productsResponse.data.products)
            ? productsResponse.data.products
            : []
        : productsResponse?.data
        ? Array.isArray(productsResponse.data)
            ? productsResponse.data
            : []
        : productsResponse?.products
        ? Array.isArray(productsResponse.products)
            ? productsResponse.products
            : []
        : [];


    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading products...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">
                        Error loading products: {error.message || "Something went wrong"}
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

                {/* Title and Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Products</h1>

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="flex items-center gap-2">
                            <FilterXIcon className="w-4 h-4 md:w-5 md:h-5" />
                            <span>Filters</span>
                        </Button>

                        <Button variant="outline" className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 md:w-5 md:h-5" />
                            <span>Select dates</span>
                        </Button>

                        <Button className="flex items-center gap-2 bg-[#6840c6] hover:bg-[#5a38b0] text-white" onClick={handleOpen}>
                            <PlusCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
                            <span>Add New Product</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product List Section with API data */}
            <ProductListSection
                products={productsArray}
                onDelete={handleDelete}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isLoading={isLoading}
            />

            {/* Add Product Modal */}
            <AddProductForm
                isOpen={isOpen}
                onClose={handleClose}
                onSubmit={handleFormSubmit}
            />
        </Layout>
    );
};