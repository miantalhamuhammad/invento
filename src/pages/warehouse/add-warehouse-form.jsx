"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import PropTypes from "prop-types"

export function AddWarehouseForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        warehouseName: "",
        warehouseId: "",
        location: "",
        address: "",
        capacity: "",
        managerId: "",
        contactNumber: "",
        email: "",
        description: "",
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
                warehouseName: "",
                warehouseId: "",
                location: "",
                address: "",
                capacity: "",
                managerId: "",
                contactNumber: "",
                email: "",
                description: "",
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
            title="Add new warehouse"
            size="lg"
            onSubmit={handleSubmit}
            submitLabel="Add Warehouse"
            isSubmitting={isSubmitting}
        >
            <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="warehouseName" className="text-sm font-medium text-[#344054]">
                            Warehouse Name
                        </Label>
                        <Input
                            id="warehouseName"
                            placeholder="Ex: 365 Warehouse SV1"
                            value={formData.warehouseName}
                            onChange={(e) => handleInputChange("warehouseName", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="warehouseId" className="text-sm font-medium text-[#344054]">
                            Warehouse ID
                        </Label>
                        <Input
                            id="warehouseId"
                            placeholder="Ex: REMA0123"
                            value={formData.warehouseId}
                            onChange={(e) => handleInputChange("warehouseId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium text-[#344054]">
                            Location
                        </Label>
                        <Input
                            id="location"
                            placeholder="Ex: Austin, Texas"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="capacity" className="text-sm font-medium text-[#344054]">
                            Capacity (in SKUs)
                        </Label>
                        <Input
                            id="capacity"
                            placeholder="Ex: 15000"
                            value={formData.capacity}
                            onChange={(e) => handleInputChange("capacity", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-[#344054]">
                        Full Address
                    </Label>
                    <Textarea
                        id="address"
                        placeholder="Enter complete address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="managerId" className="text-sm font-medium text-[#344054]">
                            Manager ID
                        </Label>
                        <Input
                            id="managerId"
                            placeholder="Ex: MGR001"
                            value={formData.managerId}
                            onChange={(e) => handleInputChange("managerId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contactNumber" className="text-sm font-medium text-[#344054]">
                            Contact Number
                        </Label>
                        <Input
                            id="contactNumber"
                            placeholder="Ex: +1 234 567 8900"
                            value={formData.contactNumber}
                            onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-[#344054]">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Ex: warehouse@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-[#344054]">
                        Description (Optional)
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Additional notes about the warehouse"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>
            </div>
        </FormModal>
    )
}

AddWarehouseForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
