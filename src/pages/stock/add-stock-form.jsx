"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Calendar, Upload } from 'lucide-react'
import PropTypes from "prop-types"
import {Button} from "../../components/ui/button.jsx";

export function AddStockForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        productName: "",
        supplierId: "",
        stockQuantity: "",
        unitPrice: "",
        totalValue: "",
        expiryDate: "",
        batchNumber: "",
        warehouseLocation: "",
        minimumStockLevel: "",
        maximumStockLevel: "",
        reorderPoint: "",
        stockCondition: "",
        notes: "",
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => {
            const updated = {
                ...prev,
                [field]: value,
            }

            // Auto-calculate total value when quantity or unit price changes
            if (field === "stockQuantity" || field === "unitPrice") {
                const quantity = parseFloat(field === "stockQuantity" ? value : updated.stockQuantity) || 0
                const price = parseFloat(field === "unitPrice" ? value : updated.unitPrice) || 0
                updated.totalValue = (quantity * price).toFixed(2)
            }

            return updated
        })
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            await onSubmit?.(formData)
            // Reset form after successful submission
            setFormData({
                productName: "",
                supplierId: "",
                stockQuantity: "",
                unitPrice: "",
                totalValue: "",
                expiryDate: "",
                batchNumber: "",
                warehouseLocation: "",
                minimumStockLevel: "",
                maximumStockLevel: "",
                reorderPoint: "",
                stockCondition: "",
                notes: "",
            })
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const headerActions = (
        <Button
            type="button"
            variant="outline"
            className="border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] flex items-center gap-2 bg-transparent"
        >
            <Upload className="w-4 h-4" />
            Bulk Upload
        </Button>
    )

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Stock"
            size="xl"
            onSubmit={handleSubmit}
            submitLabel="Add Stock"
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
                            placeholder="Enter Product Name"
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
                            placeholder="Ex: SUP12345"
                            value={formData.supplierId}
                            onChange={(e) => handleInputChange("supplierId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stockQuantity" className="text-sm font-medium text-[#344054]">
                            Stock Quantity
                        </Label>
                        <Input
                            id="stockQuantity"
                            placeholder="Enter Quantity"
                            type="number"
                            value={formData.stockQuantity}
                            onChange={(e) => handleInputChange("stockQuantity", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="unitPrice" className="text-sm font-medium text-[#344054]">
                            Unit Price ($)
                        </Label>
                        <Input
                            id="unitPrice"
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            value={formData.unitPrice}
                            onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="totalValue" className="text-sm font-medium text-[#344054]">
                            Total Value ($)
                        </Label>
                        <Input
                            id="totalValue"
                            placeholder="0.00"
                            value={formData.totalValue}
                            readOnly
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3] bg-[#f9fafb]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-sm font-medium text-[#344054]">
                            Expiry Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="expiryDate"
                                placeholder="Select Date"
                                type="date"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="batchNumber" className="text-sm font-medium text-[#344054]">
                            Batch Number
                        </Label>
                        <Input
                            id="batchNumber"
                            placeholder="Enter Batch Number"
                            value={formData.batchNumber}
                            onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="warehouseLocation" className="text-sm font-medium text-[#344054]">
                            Warehouse Location
                        </Label>
                        <Input
                            id="warehouseLocation"
                            placeholder="Ex: A-1-B"
                            value={formData.warehouseLocation}
                            onChange={(e) => handleInputChange("warehouseLocation", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="minimumStockLevel" className="text-sm font-medium text-[#344054]">
                            Minimum Stock Level
                        </Label>
                        <Input
                            id="minimumStockLevel"
                            placeholder="Enter Min Level"
                            type="number"
                            value={formData.minimumStockLevel}
                            onChange={(e) => handleInputChange("minimumStockLevel", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="maximumStockLevel" className="text-sm font-medium text-[#344054]">
                            Maximum Stock Level
                        </Label>
                        <Input
                            id="maximumStockLevel"
                            placeholder="Enter Max Level"
                            type="number"
                            value={formData.maximumStockLevel}
                            onChange={(e) => handleInputChange("maximumStockLevel", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reorderPoint" className="text-sm font-medium text-[#344054]">
                            Reorder Point
                        </Label>
                        <Input
                            id="reorderPoint"
                            placeholder="Enter Reorder Point"
                            type="number"
                            value={formData.reorderPoint}
                            onChange={(e) => handleInputChange("reorderPoint", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stockCondition" className="text-sm font-medium text-[#344054]">
                            Stock Condition
                        </Label>
                        <select
                            id="stockCondition"
                            value={formData.stockCondition}
                            onChange={(e) => handleInputChange("stockCondition", e.target.value)}
                            className="w-full border border-[#d0d5dd] rounded-lg h-12 px-3 text-[#667085] bg-white focus:outline-none focus:ring-2 focus:ring-[#6941c6] focus:border-transparent"
                        >
                            <option value="">Select Condition</option>
                            <option value="new">New</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="damaged">Damaged</option>
                        </select>
                    </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-[#344054]">
                        Notes (Optional)
                    </Label>
                    <textarea
                        id="notes"
                        placeholder="Add any additional notes about this stock..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="w-full border border-[#d0d5dd] rounded-lg min-h-[100px] p-3 text-[#667085] placeholder:text-[#98a2b3] resize-none focus:outline-none focus:ring-2 focus:ring-[#6941c6] focus:border-transparent"
                    />
                </div>
            </div>
        </FormModal>
    )
}

AddStockForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
