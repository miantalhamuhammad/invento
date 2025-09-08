"use client"

import { useEffect, useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
// import { Button } from "../../components/ui/button.jsx"
import { Alert } from "../../components/ui/alert"
import PropTypes from "prop-types"
import { stockService } from "../../services/index.js"
import { SelectProduct } from "../../components/stock/SelectProduct"
import { SelectWarehouse } from "../../components/stock/SelectWarehouse"
import { useSelector } from "react-redux"

export function AddStockForm({ isOpen, onClose, onSubmit }) {
    const user = useSelector((state) => state.auth.user)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const [alert, setAlert] = useState({ show: false, message: "", type: "info" })

    const [formData, setFormData] = useState({
        product_id: "",
        warehouse_id: "",
        batch_number: "",
        quantity: "",
        unit_price: "",
        recorded_stock_level: "",
        minimum_stock_level: "",
        maximum_stock_level: "",
        warning_threshold: "",
        auto_order_level: "",
        reorder_point: "",
        stock_condition: "NEW",
        expiry_date: "",
        notes: "",
    })

    useEffect(() => {
        if (!isOpen) {
            setIsSubmitting(false);
            setFormData({
                product_id: "",
                warehouse_id: "",
                batch_number: "",
                quantity: "",
                unit_price: "",
                recorded_stock_level: "",
                minimum_stock_level: "",
                maximum_stock_level: "",
                warning_threshold: "",
                auto_order_level: "",
                reorder_point: "",
                stock_condition: "NEW",
                expiry_date: "",
                notes: "",
            });
            setErrors({});
            setAlert({ show: false, message: "", type: "info" });
        }
    }, [isOpen])

    const handleInputChange = (field, value) => {
        setFormData((prev) => {
            const updated = {
                ...prev,
                [field]: value,
            }

            // Auto-fill recorded_stock_level when quantity changes
            if (field === "quantity") {
                updated.recorded_stock_level = value
            }

            return updated
        })

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }))
        }

        // Clear alert when user starts typing
        if (alert.show) {
            setAlert({ show: false, message: "", type: "info" })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.product_id) {
            newErrors.product_id = "Product is required"
        }
        if (!formData.warehouse_id) {
            newErrors.warehouse_id = "Warehouse is required"
        }
        if (!formData.quantity || Number.parseFloat(formData.quantity) < 0) {
            newErrors.quantity = "Valid quantity is required"
        }
        if (formData.unit_price && Number.parseFloat(formData.unit_price) < 0) {
            newErrors.unit_price = "Unit price must be positive"
        }
        if (!formData.warning_threshold || Number.parseFloat(formData.warning_threshold) < 0) {
            newErrors.warning_threshold = "Warning threshold is required and must be 0 or greater"
        }
        if (!formData.auto_order_level || Number.parseFloat(formData.auto_order_level) < 0) {
            newErrors.auto_order_level = "Auto order level is required and must be 0 or greater"
        }
        if (!formData.reorder_point || Number.parseFloat(formData.reorder_point) < 0) {
            newErrors.reorder_point = "Reorder point is required and must be 0 or greater"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            setAlert({
                show: true,
                message: "Please fix the validation errors below.",
                type: "error",
            })
            return
        }

        setIsSubmitting(true)
        try {
            // Prepare data for submission
            const submitData = {
                ...formData,
                quantity: Number.parseFloat(formData.quantity) || 0,
                unit_price: formData.unit_price ? Number.parseFloat(formData.unit_price) : null,
                recorded_stock_level: formData.recorded_stock_level
                    ? Number.parseFloat(formData.recorded_stock_level)
                    : Number.parseFloat(formData.quantity) || 0,
                minimum_stock_level: formData.minimum_stock_level ? Number.parseFloat(formData.minimum_stock_level) : null,
                maximum_stock_level: formData.maximum_stock_level ? Number.parseFloat(formData.maximum_stock_level) : null,
                warning_threshold: Number.parseFloat(formData.warning_threshold) || 0,
                auto_order_level: Number.parseFloat(formData.auto_order_level) || 0,
                reorder_point: Number.parseFloat(formData.reorder_point) || 0,
                stock_condition: formData.stock_condition,
                created_by: user?.id || 1, // fallback to 1 if user is not available
                ...(formData.expiry_date && { expiry_date: formData.expiry_date }),
            }

            // Debug: log user and created_by
            console.log('Redux user:', user)
            console.log('created_by to submit:', user?.id)
            console.log('[v0] Submitting stock data:', submitData)

            const response = await stockService.createStock(submitData)

            if (response) {
                setAlert({
                    show: true,
                    message: "Stock entry created successfully!",
                    type: "success",
                })

                // Reset form
                setFormData({
                    product_id: "",
                    warehouse_id: "",
                    batch_number: "",
                    quantity: "",
                    unit_price: "",
                    recorded_stock_level: "",
                    minimum_stock_level: "",
                    maximum_stock_level: "",
                    warning_threshold: "",
                    auto_order_level: "",
                    reorder_point: "",
                    stock_condition: "NEW",
                    expiry_date: "",
                    notes: "",
                })

                // Call success callback (parent will handle modal close and refresh)
                await onSubmit?.(response.data)
                handleClose()
                return;
            }
        } catch (error) {
            console.error("Error creating stock:", error)

            if (error.response?.data?.data) {
                // Handle validation errors from backend
                const backendErrors = {}
                error.response.data.data.forEach((err) => {
                    backendErrors[err.path] = err.msg
                })
                setErrors(backendErrors)
                setAlert({
                    show: true,
                    message: "Please fix the validation errors below.",
                    type: "error",
                })
            } else {
                setAlert({
                    show: true,
                    message: error.response?.data?.message || "Failed to create stock entry. Please try again.",
                    type: "error",
                })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        if (!isSubmitting) {
            // Reset form and errors
            setFormData({
                product_id: "",
                warehouse_id: "",
                batch_number: "",
                quantity: "",
                unit_price: "",
                recorded_stock_level: "",
                minimum_stock_level: "",
                maximum_stock_level: "",
                warning_threshold: "",
                auto_order_level: "",
                reorder_point: "",
                stock_condition: "NEW",
                expiry_date: "",
                notes: "",
            })
            setErrors({})
            setAlert({ show: false, message: "", type: "info" })
            onClose()
        }
    }

    return (
        <FormModal isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   isSubmitting={isSubmitting}
                   showFooter={true}
                   submitLabel="Add New Stock"
                   title="Add New Stock Entry"
                   size="xl">
            <div className="space-y-6">
                {/* Alert */}
                {alert.show && <Alert variant={alert.type === "error" ? "destructive" : "default"}>{alert.message}</Alert>}

                {/* Product and Warehouse Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="product_id">Product *</Label>
                        <SelectProduct
                            value={formData.product_id}
                            onChange={(val) => setFormData({ ...formData, product_id: val })}
                        />
                        {errors.product_id && <p className="text-sm text-red-600">{errors.product_id}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="warehouse_id">Warehouse *</Label>
                        <SelectWarehouse
                            value={formData.warehouse_id}
                            onChange={(val) => setFormData({ ...formData, warehouse_id: val })}
                        />
                        {errors.warehouse_id && <p className="text-sm text-red-600">{errors.warehouse_id}</p>}
                    </div>
                </div>

                {/* Batch and Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="batch_number">Batch Number</Label>
                        <Input
                            id="batch_number"
                            value={formData.batch_number}
                            onChange={(e) => handleInputChange("batch_number", e.target.value)}
                            placeholder="Optional batch number"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                            type="number"
                            id="quantity"
                            value={formData.quantity}
                            onChange={(e) => handleInputChange("quantity", e.target.value)}
                            placeholder="0"
                            min="0"
                            step="0.01"
                            disabled={isSubmitting}
                            className={errors.quantity ? "border-red-500" : ""}
                        />
                        {errors.quantity && <p className="text-sm text-red-600">{errors.quantity}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="unit_price">Unit Price</Label>
                        <Input
                            type="number"
                            id="unit_price"
                            value={formData.unit_price}
                            onChange={(e) => handleInputChange("unit_price", e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            disabled={isSubmitting}
                            className={errors.unit_price ? "border-red-500" : ""}
                        />
                        {errors.unit_price && <p className="text-sm text-red-600">{errors.unit_price}</p>}
                    </div>
                </div>

                {/* Stock Levels */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="minimum_stock_level">Minimum Stock Level</Label>
                        <Input
                            type="number"
                            id="minimum_stock_level"
                            value={formData.minimum_stock_level}
                            onChange={(e) => handleInputChange("minimum_stock_level", e.target.value)}
                            placeholder="0"
                            min="0"
                            step="0.01"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="maximum_stock_level">Maximum Stock Level</Label>
                        <Input
                            type="number"
                            id="maximum_stock_level"
                            value={formData.maximum_stock_level}
                            onChange={(e) => handleInputChange("maximum_stock_level", e.target.value)}
                            placeholder="0"
                            min="0"
                            step="0.01"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="warning_threshold">Warning Threshold *</Label>
                        <Input
                            type="number"
                            id="warning_threshold"
                            value={formData.warning_threshold}
                            onChange={(e) => handleInputChange("warning_threshold", e.target.value)}
                            placeholder="0"
                            min="0"
                            step="0.01"
                            disabled={isSubmitting}
                            className={errors.warning_threshold ? "border-red-500" : ""}
                        />
                        {errors.warning_threshold && <p className="text-sm text-red-600">{errors.warning_threshold}</p>}
                    </div>
                </div>

                {/* Additional Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="stock_condition">Stock Condition</Label>
                        <select
                            id="stock_condition"
                            value={formData.stock_condition}
                            onChange={(e) => handleInputChange("stock_condition", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isSubmitting}
                        >
                            <option value="NEW">NEW</option>
                            <option value="USED">USED</option>
                            <option value="DAMAGED">Damaged</option>
                            <option value="EXPIRED">Expired</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="expiry_date">Expiry Date</Label>
                        <Input
                            type="date"
                            id="expiry_date"
                            value={formData.expiry_date}
                            onChange={(e) => handleInputChange("expiry_date", e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reorder_point">Reorder Point *</Label>
                        <Input
                            type="number"
                            id="reorder_point"
                            value={formData.reorder_point}
                            onChange={(e) => handleInputChange("reorder_point", e.target.value)}
                            placeholder="0"
                            min="0"
                            step="0.01"
                            disabled={isSubmitting}
                            className={errors.reorder_point ? "border-red-500" : ""}
                        />
                        {errors.reorder_point && <p className="text-sm text-red-600">{errors.reorder_point}</p>}
                    </div>
                </div>

                {/* Auto Order Level - New Required Field */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="auto_order_level">Auto Order Level *</Label>
                        <Input
                            type="number"
                            id="auto_order_level"
                            value={formData.auto_order_level}
                            onChange={(e) => handleInputChange("auto_order_level", e.target.value)}
                            placeholder="0"
                            min="0"
                            step="0.01"
                            disabled={isSubmitting}
                            className={errors.auto_order_level ? "border-red-500" : ""}
                        />
                        {errors.auto_order_level && <p className="text-sm text-red-600">{errors.auto_order_level}</p>}
                    </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Optional notes about this stock entry"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Form Actions */}
                {/*<div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">*/}
                {/*    <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>*/}
                {/*        Cancel*/}
                {/*    </Button>*/}
                {/*    <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>*/}
                {/*        {isSubmitting ? "Adding Stock..." : "Add Stock"}*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        </FormModal>
    )
}

AddStockForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
