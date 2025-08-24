"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { useCreateCustomerMutation } from "../../redux/services/customers.js"
import PropTypes from "prop-types"
import { Button } from "../../components/ui/button"

export function AddCustomerForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createCustomer] = useCreateCustomerMutation()
    const [formData, setFormData] = useState({
        customer_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "USA",
        customer_type: "INDIVIDUAL",
        credit_limit: "",
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
            const customerPayload = {
                customer_id: `CUST-${Date.now()}`, // Generate unique customer ID
                customer_name: formData.customer_name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                postal_code: formData.postal_code,
                country: formData.country,
                customer_type: formData.customer_type,
                credit_limit: parseFloat(formData.credit_limit) || 0,
                is_active: formData.is_active,
            };

            const result = await createCustomer(customerPayload).unwrap()
            if (result.success || result.succeeded) {
                await onSubmit?.(result.data || result)
                // Reset form
                setFormData({
                    customer_name: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    postal_code: "",
                    country: "USA",
                    customer_type: "INDIVIDUAL",
                    credit_limit: "",
                    is_active: true,
                })
                onClose()
            }
        } catch (error) {
            console.error("Error creating customer:", error)
            alert("Failed to create customer. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add new customer"
            size="lg"
            onSubmit={handleSubmit}
            submitLabel="Add"
            isSubmitting={isSubmitting}
        >
            <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="customer_name">Customer Name *</Label>
                        <Input
                            id="customer_name"
                            value={formData.customer_name}
                            onChange={(e) => handleInputChange("customer_name", e.target.value)}
                            placeholder="Enter customer name"
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
                    <div className="space-y-2">
                        <Label htmlFor="customer_type">Customer Type</Label>
                        <select
                            id="customer_type"
                            value={formData.customer_type}
                            onChange={(e) => handleInputChange("customer_type", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6840c6]"
                        >
                            <option value="INDIVIDUAL">Individual</option>
                            <option value="BUSINESS">Business</option>
                        </select>
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
                        <Label htmlFor="credit_limit">Credit Limit</Label>
                        <Input
                            id="credit_limit"
                            type="number"
                            value={formData.credit_limit}
                            onChange={(e) => handleInputChange("credit_limit", e.target.value)}
                            placeholder="Enter credit limit"
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
                        placeholder="Additional notes about the customer"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>
            </div>
            {/* Explicit Add button inside form content */}
            <div className="flex justify-end mt-6">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#6941c6] hover:bg-[#7f56d9] text-white"
                >
                    {isSubmitting ? "Submitting..." : "Add"}
                </Button>
            </div>
        </FormModal>
    )
}

AddCustomerForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
