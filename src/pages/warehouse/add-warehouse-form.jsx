"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { useCreateWarehouseMutation } from "../../redux/services/warehouses.js"
import PropTypes from "prop-types"

export function AddWarehouseForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createWarehouse] = useCreateWarehouseMutation()
    const [formData, setFormData] = useState({
        warehouse_name: "",
        location: "",
        city: "",
        state: "",
        postal_code: "",
        country: "USA",
        manager_name: "",
        contact_number: "",
        capacity: "",
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
            // Create payload with proper field mapping for backend
            const warehousePayload = {
                warehouse_id: `WH-${Date.now()}`, // Generate unique warehouse ID
                warehouse_name: formData.warehouse_name,
                location: formData.location,
                city: formData.city,
                state: formData.state,
                postal_code: formData.postal_code,
                country: formData.country,
                manager_name: formData.manager_name,
                contact_number: formData.contact_number,
                capacity: parseInt(formData.capacity) || 0,
                is_active: formData.is_active,
            };

            const result = await createWarehouse(warehousePayload).unwrap()
            if (result.success || result.succeeded) {
                await onSubmit?.(result.data || result)
                // Reset form
                setFormData({
                    warehouse_name: "",
                    location: "",
                    city: "",
                    state: "",
                    postal_code: "",
                    country: "USA",
                    manager_name: "",
                    contact_number: "",
                    capacity: "",
                    is_active: true,
                })
                onClose()
            }
        } catch (error) {
            console.error("Error creating warehouse:", error)
            alert("Failed to create warehouse. Please try again.")
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="warehouse_name">Warehouse Name *</Label>
                        <Input
                            id="warehouse_name"
                            value={formData.warehouse_name}
                            onChange={(e) => handleInputChange("warehouse_name", e.target.value)}
                            placeholder="Enter warehouse name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            placeholder="Enter location address"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="Enter city"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            placeholder="Enter state"
                            required
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
                        <Label htmlFor="capacity">Capacity (sq ft)</Label>
                        <Input
                            id="capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={(e) => handleInputChange("capacity", e.target.value)}
                            placeholder="Enter capacity"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="manager_name">Manager Name</Label>
                        <Input
                            id="manager_name"
                            value={formData.manager_name}
                            onChange={(e) => handleInputChange("manager_name", e.target.value)}
                            placeholder="Enter manager name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact_number">Contact Number</Label>
                        <Input
                            id="contact_number"
                            value={formData.contact_number}
                            onChange={(e) => handleInputChange("contact_number", e.target.value)}
                            placeholder="Enter contact number"
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
            </div>
        </FormModal>
    )
}

AddWarehouseForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
