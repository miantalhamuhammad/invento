"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import PropTypes from "prop-types"

export function AddSupplierForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        supplierName: "",
        supplierId: "",
        contactPerson: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        taxId: "",
        paymentTerms: "",
        category: "",
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
                supplierName: "",
                supplierId: "",
                contactPerson: "",
                email: "",
                phoneNumber: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
                taxId: "",
                paymentTerms: "",
                category: "",
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
            title="Add new supplier"
            size="lg"
            onSubmit={handleSubmit}
            submitLabel="Add Supplier"
            isSubmitting={isSubmitting}
        >
            <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="supplierName" className="text-sm font-medium text-[#344054]">
                            Supplier Name
                        </Label>
                        <Input
                            id="supplierName"
                            placeholder="Ex: ABC Supply Co."
                            value={formData.supplierName}
                            onChange={(e) => handleInputChange("supplierName", e.target.value)}
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
                        <Label htmlFor="contactPerson" className="text-sm font-medium text-[#344054]">
                            Contact Person
                        </Label>
                        <Input
                            id="contactPerson"
                            placeholder="Ex: John Smith"
                            value={formData.contactPerson}
                            onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-[#344054]">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Ex: contact@supplier.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium text-[#344054]">
                            Phone Number
                        </Label>
                        <Input
                            id="phoneNumber"
                            placeholder="Ex: +1 234 567 8900"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium text-[#344054]">
                            Category
                        </Label>
                        <Input
                            id="category"
                            placeholder="Ex: Electronics"
                            value={formData.category}
                            onChange={(e) => handleInputChange("category", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-[#344054]">
                        Address
                    </Label>
                    <Textarea
                        id="address"
                        placeholder="Enter complete address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium text-[#344054]">
                            City
                        </Label>
                        <Input
                            id="city"
                            placeholder="Ex: New York"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium text-[#344054]">
                            State
                        </Label>
                        <Input
                            id="state"
                            placeholder="Ex: NY"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-sm font-medium text-[#344054]">
                            ZIP Code
                        </Label>
                        <Input
                            id="zipCode"
                            placeholder="Ex: 10001"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="taxId" className="text-sm font-medium text-[#344054]">
                            Tax ID
                        </Label>
                        <Input
                            id="taxId"
                            placeholder="Ex: 12-3456789"
                            value={formData.taxId}
                            onChange={(e) => handleInputChange("taxId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="paymentTerms" className="text-sm font-medium text-[#344054]">
                            Payment Terms
                        </Label>
                        <Input
                            id="paymentTerms"
                            placeholder="Ex: Net 30"
                            value={formData.paymentTerms}
                            onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-[#344054]">
                        Notes (Optional)
                    </Label>
                    <Textarea
                        id="notes"
                        placeholder="Additional notes about the supplier"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>
            </div>
        </FormModal>
    )
}

AddSupplierForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
