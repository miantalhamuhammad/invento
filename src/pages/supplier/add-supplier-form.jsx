"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { useCreateSupplierMutation } from "../../redux/services/suppliers.js"
import PropTypes from "prop-types"

export function AddSupplierForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createSupplier] = useCreateSupplierMutation()
    const [formData, setFormData] = useState({
        supplier_name: "",
        contact_person: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "USA",
        is_active: true,
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
            // Generate supplier ID or get it from backend requirements
            const supplierPayload = {
                supplier_id: `SUP-${Date.now()}`, // Generate a unique supplier ID
                supplier_name: formData.supplier_name,
                contact_person: formData.contact_person,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                postal_code: formData.postal_code,
                country: formData.country,
                is_active: formData.is_active,
            };

            const result = await createSupplier(supplierPayload).unwrap()
            if (result.success || result.succeeded) {
                await onSubmit?.(result.data || result)
                // Reset form
                setFormData({
                    supplier_name: "",
                    contact_person: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    postal_code: "",
                    country: "USA",
                    is_active: true,
                })
                onClose()
            }
        } catch (error) {
            console.error("Error creating supplier:", error)
            alert("Failed to create supplier. Please try again.")
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="supplier_name">Supplier Name *</Label>
                        <Input
                            id="supplier_name"
                            value={formData.supplier_name}
                            onChange={(e) => handleInputChange("supplier_name", e.target.value)}
                            placeholder="Enter supplier name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact_person">Contact Person *</Label>
                        <Input
                            id="contact_person"
                            value={formData.contact_person}
                            onChange={(e) => handleInputChange("contact_person", e.target.value)}
                            placeholder="Enter contact person name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter email address"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="Enter full address"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="Enter city"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            placeholder="Enter state"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                            id="postal_code"
                            value={formData.postal_code}
                            onChange={(e) => handleInputChange("postal_code", e.target.value)}
                            placeholder="Enter postal code"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange("country", e.target.value)}
                            placeholder="Enter country"
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
