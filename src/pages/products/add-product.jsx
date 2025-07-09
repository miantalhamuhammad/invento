"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { Plus, Upload } from "lucide-react"
import PropTypes from "prop-types";

export function AddProductForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        productName: "",
        supplierId: "",
        weight: "",
        category: "",
        dimensionUnit: "",
        dimensions: "",
        recordedStockLevel: "",
        warningThreshold: "",
        autoOrderLevel: "",
        skuCode: "",
        barcodeNumber: "",
        grnNumber: "",
        purchasingPrice: "",
        sellingPriceMargin: "",
        productDescription: "",
        productImage: null,
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setFormData((prev) => ({
                ...prev,
                productImage: file,
            }))
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            await onSubmit?.(formData)
            // Reset form after successful submission
            setFormData({
                productName: "",
                supplierId: "",
                weight: "",
                category: "",
                dimensionUnit: "",
                dimensions: "",
                recordedStockLevel: "",
                warningThreshold: "",
                autoOrderLevel: "",
                skuCode: "",
                barcodeNumber: "",
                grnNumber: "",
                purchasingPrice: "",
                sellingPriceMargin: "",
                productDescription: "",
                productImage: null,
            })
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const headerActions = (
        <div className="flex items-center gap-4">
            <Button
                type="button"
                variant="outline"
                className="border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] flex items-center gap-2 bg-transparent"
            >
                <Plus className="w-4 h-4" />
                Add Custom Field
            </Button>
            <Button
                type="button"
                variant="outline"
                className="border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] flex items-center gap-2 bg-transparent"
            >
                <Upload className="w-4 h-4" />
                Bulk Upload
            </Button>
        </div>
    )

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add new product"
            size="xl"
            onSubmit={handleSubmit}
            submitLabel="Add Product"
            isSubmitting={isSubmitting}
            headerActions={headerActions}
        >
            <div className="space-y-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="productName" className="text-sm font-medium text-[#344054]">
                            Product Name
                        </Label>
                        <Input
                            id="productName"
                            placeholder="Ex: BoomHigh"
                            value={formData.productName}
                            onChange={(e) => handleInputChange("productName", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="supplierId" className="text-sm font-medium text-[#344054]">
                            Supplier ID
                        </Label>
                        <Input
                            id="supplierId"
                            placeholder="Ex: TUW10234"
                            value={formData.supplierId}
                            onChange={(e) => handleInputChange("supplierId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight" className="text-sm font-medium text-[#344054]">
                            Weight (in lbs)
                        </Label>
                        <Input
                            id="weight"
                            placeholder="Enter Weight here"
                            value={formData.weight}
                            onChange={(e) => handleInputChange("weight", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium text-[#344054]">
                            Category
                        </Label>
                        <Input
                            id="category"
                            placeholder="Vapes"
                            value={formData.category}
                            onChange={(e) => handleInputChange("category", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dimensionUnit" className="text-sm font-medium text-[#344054]">
                            Dimension Unit
                        </Label>
                        <Input
                            id="dimensionUnit"
                            placeholder="inch"
                            value={formData.dimensionUnit}
                            onChange={(e) => handleInputChange("dimensionUnit", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dimensions" className="text-sm font-medium text-[#344054]">
                            Dimensions (L x B x H)
                        </Label>
                        <Input
                            id="dimensions"
                            placeholder="20 × 30 × 40"
                            value={formData.dimensions}
                            onChange={(e) => handleInputChange("dimensions", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="recordedStockLevel" className="text-sm font-medium text-[#344054]">
                            Recorded Stock Level
                        </Label>
                        <Input
                            id="recordedStockLevel"
                            placeholder="Ex: 2000"
                            value={formData.recordedStockLevel}
                            onChange={(e) => handleInputChange("recordedStockLevel", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="warningThreshold" className="text-sm font-medium text-[#344054]">
                            Warning Threshold Stock Level
                        </Label>
                        <Input
                            id="warningThreshold"
                            placeholder="Ex: 100"
                            value={formData.warningThreshold}
                            onChange={(e) => handleInputChange("warningThreshold", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="autoOrderLevel" className="text-sm font-medium text-[#344054]">
                            Auto Order Stock Level
                        </Label>
                        <Input
                            id="autoOrderLevel"
                            placeholder="Ex: 50"
                            value={formData.autoOrderLevel}
                            onChange={(e) => handleInputChange("autoOrderLevel", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="skuCode" className="text-sm font-medium text-[#344054]">
                            SKU Code
                        </Label>
                        <Input
                            id="skuCode"
                            placeholder="RTY1234455"
                            value={formData.skuCode}
                            onChange={(e) => handleInputChange("skuCode", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="barcodeNumber" className="text-sm font-medium text-[#344054]">
                            Barcode Number
                        </Label>
                        <Input
                            id="barcodeNumber"
                            placeholder="QWERTY0987"
                            value={formData.barcodeNumber}
                            onChange={(e) => handleInputChange("barcodeNumber", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="grnNumber" className="text-sm font-medium text-[#344054]">
                            GRN Number (Optional)
                        </Label>
                        <Input
                            id="grnNumber"
                            placeholder="QWERTY56787"
                            value={formData.grnNumber}
                            onChange={(e) => handleInputChange("grnNumber", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-[#344054]">Insert Image (400px x 400px)</Label>
                        <div className="border-2 border-dashed border-[#d0d5dd] rounded-lg h-48 flex items-center justify-center bg-[#f9fafb] hover:bg-[#f3f4f6] transition-colors cursor-pointer">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                            <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full border-2 border-[#d0d5dd] flex items-center justify-center mb-2">
                                    <Plus className="w-6 h-6 text-[#667085]" />
                                </div>
                                <span className="text-sm text-[#667085]">Click to upload image</span>
                            </label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="purchasingPrice" className="text-sm font-medium text-[#344054]">
                            Purchasing Price
                        </Label>
                        <Input
                            id="purchasingPrice"
                            placeholder="Ex: $100"
                            value={formData.purchasingPrice}
                            onChange={(e) => handleInputChange("purchasingPrice", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sellingPriceMargin" className="text-sm font-medium text-[#344054]">
                            Selling Price Margin
                        </Label>
                        <Input
                            id="sellingPriceMargin"
                            placeholder="Ex: 20%"
                            value={formData.sellingPriceMargin}
                            onChange={(e) => handleInputChange("sellingPriceMargin", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                    <Label htmlFor="productDescription" className="text-sm font-medium text-[#344054]">
                        Product Description
                    </Label>
                    <Textarea
                        id="productDescription"
                        placeholder="Ex: Type something about product here"
                        value={formData.productDescription}
                        onChange={(e) => handleInputChange("productDescription", e.target.value)}
                        className="border-[#d0d5dd] min-h-[120px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
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
