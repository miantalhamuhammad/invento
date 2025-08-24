"use client"

import { useState, useEffect } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { Calendar } from "lucide-react"
import PropTypes from "prop-types"
import { useGetCustomersQuery } from "../../redux/services/customers.js"
import { SelectWarehouse } from "../../components/stock/SelectWarehouse.jsx"
import { SelectProduct } from "../../components/stock/SelectProduct"
import { useSelector } from "react-redux";

export function AddSalesOrderForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        orderNumber: "",
        customerId: "",
        orderDate: "",
        deliveryDate: "",
        warehouseId: "",
        productId: "",
        quantity: "",
        unitPrice: "",
        discount: "",
        taxAmount: "",
        shippingAmount: "",
        paymentMethod: "",
        shippingAddress: "",
        notes: "",
    })

    const [calculatedTotal, setCalculatedTotal] = useState(0)
    const { data: customersData, isLoading: customersLoading } = useGetCustomersQuery()
    const user = useSelector((state) => state.auth.user)

    // auto calculate whenever numbers change
    useEffect(() => {
        const quantity = parseFloat(formData.quantity) || 0
        const unitPrice = parseFloat(formData.unitPrice) || 0
        const discount = parseFloat(formData.discount) || 0
        const taxAmount = parseFloat(formData.taxAmount) || 0
        const shippingAmount = parseFloat(formData.shippingAmount) || 0

        const subtotal = quantity * unitPrice
        const total = subtotal + taxAmount + shippingAmount - discount

        setCalculatedTotal(total)
    }, [formData.quantity, formData.unitPrice, formData.discount, formData.taxAmount, formData.shippingAmount])

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            const quantity = parseFloat(formData.quantity) || 0
            const unitPrice = parseFloat(formData.unitPrice) || 0
            const subtotal = quantity * unitPrice
            const discount_amount = parseFloat(formData.discount) || 0
            const tax_amount = parseFloat(formData.taxAmount) || 0
            const shipping_amount = parseFloat(formData.shippingAmount) || 0
            const total_amount = calculatedTotal

            const mappedData = {
                so_number: formData.orderNumber,
                customer_id: formData.customerId ? parseInt(formData.customerId) : null,
                warehouse_id: formData.warehouseId ? parseInt(formData.warehouseId) : null,
                order_date: formData.orderDate,
                expected_delivery_date: formData.deliveryDate,
                subtotal,
                tax_amount,
                discount_amount,
                shipping_amount,
                total_amount,
                payment_method: formData.paymentMethod,
                shipping_address: formData.shippingAddress,
                notes: formData.notes,
                created_by: user?.id,
            }

            if (formData.productId) mappedData.product_id = parseInt(formData.productId)

            await onSubmit?.(mappedData)

            // reset form
            setFormData({
                orderNumber: "",
                customerId: "",
                orderDate: "",
                deliveryDate: "",
                warehouseId: "",
                productId: "",
                quantity: "",
                unitPrice: "",
                discount: "",
                taxAmount: "",
                shippingAmount: "",
                paymentMethod: "",
                shippingAddress: "",
                notes: "",
            })
            setCalculatedTotal(0)
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
            title="Add new sales order"
            size="lg"
            onSubmit={handleSubmit}
            submitLabel="Add Sale Order"
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
                            placeholder="Ex: SO-2024-001"
                            value={formData.orderNumber}
                            onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customerId" className="text-sm font-medium text-[#344054]">
                            Customer
                        </Label>
                        <select
                            id="customerId"
                            value={formData.customerId}
                            onChange={(e) => handleInputChange("customerId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] w-full rounded-md"
                            disabled={customersLoading}
                        >
                            <option value="">Select customer</option>
                            {customersData?.data?.customers?.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.customer_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="warehouseId" className="text-sm font-medium text-[#344054]">
                            Warehouse
                        </Label>
                        <SelectWarehouse
                            value={formData.warehouseId}
                            onChange={(val) => handleInputChange("warehouseId", val)}
                        />
                    </div>
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
                                className="border-[#d0d5dd] h-12 text-[#667085]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
                        </div>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="deliveryDate" className="text-sm font-medium text-[#344054]">
                            Expected Delivery Date
                        </Label>
                        <Input
                            id="deliveryDate"
                            type="date"
                            value={formData.deliveryDate}
                            onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="productId" className="text-sm font-medium text-[#344054]">
                            Product
                        </Label>
                        <SelectProduct
                            value={formData.productId}
                            onChange={(val) => handleInputChange("productId", val)}
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
                            placeholder="Ex: 50"
                            value={formData.quantity}
                            onChange={(e) => handleInputChange("quantity", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unitPrice" className="text-sm font-medium text-[#344054]">
                            Unit Price
                        </Label>
                        <Input
                            id="unitPrice"
                            placeholder="Ex: 100.00"
                            value={formData.unitPrice}
                            onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="calculatedTotal" className="text-sm font-medium text-[#344054]">
                            Total Amount
                        </Label>
                        <Input
                            id="calculatedTotal"
                            value={calculatedTotal.toFixed(2)}
                            readOnly
                            className="border-[#d0d5dd] h-12 text-[#667085] bg-gray-100"
                        />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="discount" className="text-sm font-medium text-[#344054]">
                            Discount
                        </Label>
                        <Input
                            id="discount"
                            placeholder="Ex: 100.00"
                            value={formData.discount}
                            onChange={(e) => handleInputChange("discount", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="taxAmount" className="text-sm font-medium text-[#344054]">
                            Tax Amount
                        </Label>
                        <Input
                            id="taxAmount"
                            placeholder="Ex: 400.00"
                            value={formData.taxAmount}
                            onChange={(e) => handleInputChange("taxAmount", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shippingAmount" className="text-sm font-medium text-[#344054]">
                            Shipping Amount
                        </Label>
                        <Input
                            id="shippingAmount"
                            placeholder="Ex: 50.00"
                            value={formData.shippingAmount}
                            onChange={(e) => handleInputChange("shippingAmount", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085]"
                        />
                    </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                    <Label htmlFor="paymentMethod" className="text-sm font-medium text-[#344054]">
                        Payment Method
                    </Label>
                    <Input
                        id="paymentMethod"
                        placeholder="Ex: Credit Card, Bank Transfer"
                        value={formData.paymentMethod}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="border-[#d0d5dd] h-12 text-[#667085]"
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
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] resize-none"
                    />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-[#344054]">
                        Notes (Optional)
                    </Label>
                    <Textarea
                        id="notes"
                        placeholder="Additional notes for this sales order"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] resize-none"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="bg-[#6941c6] hover:bg-[#7f56d9] text-white font-semibold py-2 px-4 rounded shadow"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "New Sale Order"}
                </button>
            </div>
        </FormModal>
    )
}

AddSalesOrderForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
