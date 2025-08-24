"use client"

import { useState, useEffect } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { Calendar } from "lucide-react"
import PropTypes from "prop-types"
import ApiService from "../../services/api"
import { SelectProduct } from "../../components/stock/SelectProduct";
import { SelectWarehouse } from "../../components/stock/SelectWarehouse";
import { useSelector } from "react-redux";

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
    const user = useSelector((state) => state.auth.user)
    const [suppliers, setSuppliers] = useState([]);
    const [loadingSuppliers, setLoadingSuppliers] = useState(false);
    const [supplierError, setSupplierError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoadingSuppliers(true);
            setSupplierError(null);
            try {
                const api = new ApiService();
                // Use the new endpoint that only returns suppliers with supplier role users
                const response = await api.get('/suppliers/with-users');
                if (response.succeeded)
                    setSuppliers(response.data.data);
            } catch {
                setSupplierError("Failed to load suppliers");
            } finally {
                setLoadingSuppliers(false);
            }
        };
        fetchSuppliers();
    }, []);

    // Auto calculate totalAmount when quantity or unitPrice changes
    useEffect(() => {
        if (formData.quantity && formData.unitPrice) {
            const total = parseFloat(formData.quantity) * parseFloat(formData.unitPrice);
            if (!isNaN(total)) {
                setFormData((prev) => ({
                    ...prev,
                    totalAmount: total.toFixed(2),
                }))
            }
        }
    }, [formData.quantity, formData.unitPrice]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setSubmitError(null);
        try {
            const api = new ApiService();
            // ✅ Frontend-only mapping (no backend changes)
            const payload = {
                orderNumber: formData.orderNumber,
                supplierId: formData.supplierId,
                warehouseId: formData.warehouseId,
                orderDate: formData.orderDate,
                expectedDeliveryDate: formData.expectedDeliveryDate,
                productId: formData.productId,
                quantity: formData.quantity,
                unitPrice: formData.unitPrice,
                totalAmount: formData.totalAmount,
                paymentTerms: formData.paymentTerms,
                shippingAddress: formData.shippingAddress,
                notes: formData.notes,
                createdBy: user?.id,
            };
            await api.post('/purchase-orders', payload);
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
            onSubmit?.(payload)
        } catch (err) {
            setSubmitError(err?.message || "Failed to create purchase order");
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
                            Supplier
                        </Label>
                        {loadingSuppliers ? (
                            <div>Loading suppliers...</div>
                        ) : supplierError ? (
                            <div className="text-red-500">{supplierError}</div>
                        ) : (
                            <select
                                id="supplierId"
                                value={formData.supplierId}
                                onChange={e => handleInputChange("supplierId", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3] w-full rounded-md"
                            >
                                <option value="">Select a supplier</option>
                                {suppliers?.map(supplier => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.supplier_name || supplier.name}
                                    </option>
                                ))}
                            </select>
                        )}
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
                            Select Warehouse
                        </Label>
                        <SelectWarehouse
                            value={formData.warehouseId}
                            onChange={value => handleInputChange("warehouseId", value)}
                            placeholder="Select a warehouse"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="productId" className="text-sm font-medium text-[#344054]">
                            Select Product
                        </Label>
                        <SelectProduct
                            value={formData.productId}
                            onChange={value => handleInputChange("productId", value)}
                            placeholder="Select a product"
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
                            readOnly
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3] bg-gray-100"
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

                {/* Show submit error if any */}
                {submitError && <div className="text-red-500 mt-2">{submitError}</div>}

                {/* New Purchase Order Button */}
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`px-6 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Submitting...' : 'New Purchase Order'}
                    </button>
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
