"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { useCreateProductMutation } from "../../redux/services/products.js"
import { useGetCategoriesQuery } from "../../redux/services/categories.js"
import { useGetSuppliersQuery } from "../../redux/services/suppliers.js"
import PropTypes from "prop-types";

export function AddProductForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createProduct] = useCreateProductMutation()

    // Get categories and suppliers for dropdowns
    const { data: categoriesData } = useGetCategoriesQuery()
    const { data: suppliersData, isLoading: suppliersLoading, error: suppliersError } = useGetSuppliersQuery()

    const [formData, setFormData] = useState({
        product_name: "",
        sku_code: "",
        barcode_number: "",
        description: "",
        category_id: "",
        supplier_id: "",
        weight: "",
        weight_unit: "kg",
        purchase_price: "",
        selling_price: "",
        tax_rate: "18",
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            // Create payload with proper field mapping for backend
            const productPayload = {
                product_id: `PROD-${Date.now()}`, // Generate unique product ID
                product_name: formData.product_name,
                sku_code: formData.sku_code,
                barcode_number: formData.barcode_number,
                description: formData.description,
                category_id: parseInt(formData.category_id) || null,
                supplier_id: parseInt(formData.supplier_id) || null,
                weight: parseFloat(formData.weight) || 0,
                weight_unit: formData.weight_unit,
                purchasing_price: parseFloat(formData.purchase_price) || 0, // Map to purchasing_price
                selling_price: parseFloat(formData.selling_price) || 0,
                tax_rate: parseFloat(formData.tax_rate) || 0,
            };

            const result = await createProduct(productPayload).unwrap()
            if (result.success || result.succeeded) {
                await onSubmit?.(result.data || result)
                // Reset form
                setFormData({
                    product_name: "",
                    sku_code: "",
                    barcode_number: "",
                    description: "",
                    category_id: "",
                    supplier_id: "",
                    weight: "",
                    weight_unit: "kg",
                    purchase_price: "",
                    selling_price: "",
                    tax_rate: "18",
                })
                onClose()
            }
        } catch (error) {
            console.error("Error creating product:", error)
            alert("Failed to create product. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Extract categories and suppliers data safely
    const categoriesArray = Array.isArray(categoriesData)
        ? categoriesData
        : categoriesData?.data
        ? Array.isArray(categoriesData.data)
            ? categoriesData.data
            : []
        : [];

    // Fix supplier data extraction to match the working suppliers page
    const suppliersArray = Array.isArray(suppliersData?.data?.data) ? suppliersData.data.data : [];

    console.log("Suppliers API Response:", suppliersData);
    console.log("Extracted suppliers array:", suppliersArray);
    console.log("Suppliers array length:", suppliersArray.length);

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add new product"
            size="lg"
            onSubmit={handleSubmit}
            submitLabel="Add Product"
            isSubmitting={isSubmitting}
            showFooter={true}   // 👈 ensure footer is visible

        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="product_name">Product Name *</Label>
                        <Input
                            id="product_name"
                            value={formData.product_name}
                            onChange={(e) => handleInputChange("product_name", e.target.value)}
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sku_code">SKU Code *</Label>
                        <Input
                            id="sku_code"
                            value={formData.sku_code}
                            onChange={(e) => handleInputChange("sku_code", e.target.value)}
                            placeholder="Enter SKU code"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="barcode_number">Barcode Number</Label>
                        <Input
                            id="barcode_number"
                            value={formData.barcode_number}
                            onChange={(e) => handleInputChange("barcode_number", e.target.value)}
                            placeholder="Enter barcode number"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category_id">Category</Label>
                        <select
                            id="category_id"
                            value={formData.category_id}
                            onChange={(e) => handleInputChange("category_id", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6840c6]"
                        >
                            <option value="">Select Category</option>
                            {categoriesArray.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category_name || category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="supplier_id">Supplier *</Label>
                        {suppliersError ? (
                            <div className="text-red-500 text-sm">
                                Failed to load suppliers. Please try again.
                            </div>
                        ) : (
                            <select
                                id="supplier_id"
                                value={formData.supplier_id}
                                onChange={(e) => handleInputChange("supplier_id", e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6840c6] disabled:bg-gray-100 disabled:cursor-not-allowed"
                                disabled={suppliersLoading}
                                required
                            >
                                <option value="">
                                    {suppliersLoading ? "Loading suppliers..." : "Select Supplier"}
                                </option>
                                {suppliersArray.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.supplier_name || supplier.name}
                                        {supplier.company && ` - ${supplier.company}`}
                                    </option>
                                ))}
                            </select>
                        )}
                        {suppliersArray.length === 0 && !suppliersLoading && !suppliersError && (
                            <div className="text-yellow-600 text-sm">
                                No suppliers found. Please add suppliers first.
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight</Label>
                        <div className="flex gap-2">
                            <Input
                                id="weight"
                                type="number"
                                step="0.01"
                                value={formData.weight}
                                onChange={(e) => handleInputChange("weight", e.target.value)}
                                placeholder="Enter weight"
                                className="flex-1"
                            />
                            <select
                                value={formData.weight_unit}
                                onChange={(e) => handleInputChange("weight_unit", e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6840c6] w-20"
                            >
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="lb">lb</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="purchase_price">Purchase Price *</Label>
                        <Input
                            id="purchase_price"
                            type="number"
                            step="0.01"
                            value={formData.purchase_price}
                            onChange={(e) => handleInputChange("purchase_price", e.target.value)}
                            placeholder="Enter purchase price"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="selling_price">Selling Price *</Label>
                        <Input
                            id="selling_price"
                            type="number"
                            step="0.01"
                            value={formData.selling_price}
                            onChange={(e) => handleInputChange("selling_price", e.target.value)}
                            placeholder="Enter selling price"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                        <Input
                            id="tax_rate"
                            type="number"
                            step="0.01"
                            value={formData.tax_rate}
                            onChange={(e) => handleInputChange("tax_rate", e.target.value)}
                            placeholder="Enter tax rate"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Enter product description"
                        className="min-h-[100px]"
                    />
                </div>
            </div>
        </FormModal>
    )
}
AddProductForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
