import {
    CalendarIcon,
    FilterXIcon,
    PlusCircleIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { AddProductForm } from "./add-product";
import { ProductListSection } from "./sections/ListSection";
import { Layout } from "../../components/layout/Layout";
import {useState} from "react";

export const Product = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleFormSubmit = async (formData) => {
        console.log("Submitted product data:", formData);
        setIsOpen(false); // Close modal after successful submission
    };
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

                        <Button className="flex items-center gap-2 bg-[#6840c6] hover:bg-[#5a38b0] text-white" onClick={handleOpen}
                        >
                            <PlusCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
                            <span>Add New Product</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 pl-[250px] min-h-screen"> {/* Main container */}
                <div className="flex-1 px-4 md:px-8 pb-8 bg-gray-50"> {/* Content container */}
                    <div className="relative overflow-hidden h-full"> {/* Card container */}
                        {/* Product Table */}
                        <div className="overflow-x-auto h-[calc(100%-60px)]"> {/* Scrollable area */}
                            <ProductListSection />
                            <AddProductForm
                                isOpen={isOpen}
                                onClose={handleClose}
                                onSubmit={handleFormSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};