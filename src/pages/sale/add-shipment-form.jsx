"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { Calendar } from "lucide-react"
import PropTypes from "prop-types"

export function AddShipmentForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        shipmentId: "",
        orderId: "",
        trackingNumber: "",
        carrier: "",
        shipmentDate: "",
        estimatedDeliveryDate: "",
        actualDeliveryDate: "",
        origin: "",
        destination: "",
        weight: "",
        dimensions: "",
        shippingCost: "",
        status: "",
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
                shipmentId: "",
                orderId: "",
                trackingNumber: "",
                carrier: "",
                shipmentDate: "",
                estimatedDeliveryDate: "",
                actualDeliveryDate: "",
                origin: "",
                destination: "",
                weight: "",
                dimensions: "",
                shippingCost: "",
                status: "",
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
            title="Add new shipment"
            size="lg"
            onSubmit={handleSubmit}
            submitLabel="Create Shipment"
            isSubmitting={isSubmitting}
        >
            <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="shipmentId" className="text-sm font-medium text-[#344054]">
                            Shipment ID
                        </Label>
                        <Input
                            id="shipmentId"
                            placeholder="Ex: SH-2024-001"
                            value={formData.shipmentId}
                            onChange={(e) => handleInputChange("shipmentId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="orderId" className="text-sm font-medium text-[#344054]">
                            Order ID
                        </Label>
                        <Input
                            id="orderId"
                            placeholder="Ex: SO-2024-001"
                            value={formData.orderId}
                            onChange={(e) => handleInputChange("orderId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="trackingNumber" className="text-sm font-medium text-[#344054]">
                            Tracking Number
                        </Label>
                        <Input
                            id="trackingNumber"
                            placeholder="Ex: 1Z999AA1234567890"
                            value={formData.trackingNumber}
                            onChange={(e) => handleInputChange("trackingNumber", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="carrier" className="text-sm font-medium text-[#344054]">
                            Carrier
                        </Label>
                        <Input
                            id="carrier"
                            placeholder="Ex: UPS, FedEx, DHL"
                            value={formData.carrier}
                            onChange={(e) => handleInputChange("carrier", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="shipmentDate" className="text-sm font-medium text-[#344054]">
                            Shipment Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="shipmentDate"
                                type="date"
                                value={formData.shipmentDate}
                                onChange={(e) => handleInputChange("shipmentDate", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="estimatedDeliveryDate" className="text-sm font-medium text-[#344054]">
                            Estimated Delivery
                        </Label>
                        <div className="relative">
                            <Input
                                id="estimatedDeliveryDate"
                                type="date"
                                value={formData.estimatedDeliveryDate}
                                onChange={(e) => handleInputChange("estimatedDeliveryDate", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="actualDeliveryDate" className="text-sm font-medium text-[#344054]">
                            Actual Delivery
                        </Label>
                        <div className="relative">
                            <Input
                                id="actualDeliveryDate"
                                type="date"
                                value={formData.actualDeliveryDate}
                                onChange={(e) => handleInputChange("actualDeliveryDate", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="origin" className="text-sm font-medium text-[#344054]">
                            Origin
                        </Label>
                        <Input
                            id="origin"
                            placeholder="Ex: New York, NY"
                            value={formData.origin}
                            onChange={(e) => handleInputChange("origin", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="destination" className="text-sm font-medium text-[#344054]">
                            Destination
                        </Label>
                        <Input
                            id="destination"
                            placeholder="Ex: Los Angeles, CA"
                            value={formData.destination}
                            onChange={(e) => handleInputChange("destination", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="weight" className="text-sm font-medium text-[#344054]">
                            Weight (lbs)
                        </Label>
                        <Input
                            id="weight"
                            placeholder="Ex: 25.5"
                            value={formData.weight}
                            onChange={(e) => handleInputChange("weight", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dimensions" className="text-sm font-medium text-[#344054]">
                            Dimensions (L x W x H)
                        </Label>
                        <Input
                            id="dimensions"
                            placeholder="Ex: 12 x 8 x 6 inches"
                            value={formData.dimensions}
                            onChange={(e) => handleInputChange("dimensions", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shippingCost" className="text-sm font-medium text-[#344054]">
                            Shipping Cost
                        </Label>
                        <Input
                            id="shippingCost"
                            placeholder="Ex: $25.99"
                            value={formData.shippingCost}
                            onChange={(e) => handleInputChange("shippingCost", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 6 */}
                <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium text-[#344054]">
                        Status
                    </Label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                        className="w-full border border-[#d0d5dd] rounded-lg px-3 py-3 h-12 text-[#667085] bg-white"
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="delayed">Delayed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-[#344054]">
                        Notes (Optional)
                    </Label>
                    <Textarea
                        id="notes"
                        placeholder="Additional notes for this shipment"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>
            </div>
        </FormModal>
    )
}

AddShipmentForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
