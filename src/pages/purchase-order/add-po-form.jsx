"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { Calendar } from "lucide-react"
import PropTypes from "prop-types"

export function AddPurchaseOrderForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        orderNumber: "",
        supplierId: "",
        orderDate: "",
        expectedDeliveryDate: "",
        warehouseId: "",
        productId: "",
        quantity: "",
        unitPrice: "",
        totalAmount: "",
        paymentTerms: "",
        shippingAddress: "",
        notes: "",
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
            await onSubmit?.(formData)
            setFormData({
                orderNumber: "",
                supplierId: "",
                orderDate: "",
                expectedDeliveryDate: "",
                warehouseId: "",
                productId: "",
                quantity: "",
                unitPrice: "",
                totalAmount: "",
                paymentTerms: "",
                shippingAddress: "",
                notes: "",
            })
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add new purchase order"
            size="lg"
            onSubmit={handleSubmit}
            submitLabel="Create Purchase Order"
            isSubmitting={isSubmitting}
        >
            <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="orderNumber" className="text-sm font-medium text-[#344054]">
                            Order Number
                        </Label>
                        <Input
                            id="orderNumber"
                            placeholder="Ex: PO-2024-001"
                            value={formData.orderNumber}
                            onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="supplierId" className="text-sm font-medium text-[#344054]">
                            Supplier ID
                        </Label>
                        <Input
                            id="supplierId"
                            placeholder="Ex: SUP001"
                            value={formData.supplierId}
                            onChange={(e) => handleInputChange("supplierId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="orderDate" className="text-sm font-medium text-[#344054]">
                            Order Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="orderDate"
                                type="date"
                                value={formData.orderDate}
                                onChange={(e) => handleInputChange("orderDate", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="expectedDeliveryDate" className="text-sm font-medium text-[#344054]">
                            Expected Delivery Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="expectedDeliveryDate"
                                type="date"
                                value={formData.expectedDeliveryDate}
                                onChange={(e) => handleInputChange("expectedDeliveryDate", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="warehouseId" className="text-sm font-medium text-[#344054]">
                            Warehouse ID
                        </Label>
                        <Input
                            id="warehouseId"
                            placeholder="Ex: WH001"
                            value={formData.warehouseId}
                            onChange={(e) => handleInputChange("warehouseId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="productId" className="text-sm font-medium text-[#344054]">
                            Product ID
                        </Label>
                        <Input
                            id="productId"
                            placeholder="Ex: PROD001"
                            value={formData.productId}
                            onChange={(e) => handleInputChange("productId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-sm font-medium text-[#344054]">
                            Quantity
                        </Label>
                        <Input
                            id="quantity"
                            placeholder="Ex: 100"
                            value={formData.quantity}
                            onChange={(e) => handleInputChange("quantity", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unitPrice" className="text-sm font-medium text-[#344054]">
                            Unit Price
                        </Label>
                        <Input
                            id="unitPrice"
                            placeholder="Ex: $50.00"
                            value={formData.unitPrice}
                            onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="totalAmount" className="text-sm font-medium text-[#344054]">
                            Total Amount
                        </Label>
                        <Input
                            id="totalAmount"
                            placeholder="Ex: $5,000.00"
                            value={formData.totalAmount}
                            onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="space-y-2">
                    <Label htmlFor="paymentTerms" className="text-sm font-medium text-[#344054]">
                        Payment Terms
                    </Label>
                    <Input
                        id="paymentTerms"
                        placeholder="Ex: Net 30 days"
                        value={formData.paymentTerms}
                        onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                        className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                    />
                </div>

                {/* Shipping Address */}
                <div className="space-y-2">
                    <Label htmlFor="shippingAddress" className="text-sm font-medium text-[#344054]">
                        Shipping Address
                    </Label>
                    <Textarea
                        id="shippingAddress"
                        placeholder="Enter complete shipping address"
                        value={formData.shippingAddress}
                        onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-[#344054]">
                        Notes (Optional)
                    </Label>
                    <Textarea
                        id="notes"
                        placeholder="Additional notes for this purchase order"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>
            </div>
        </FormModal>
    )
}

AddPurchaseOrderForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
