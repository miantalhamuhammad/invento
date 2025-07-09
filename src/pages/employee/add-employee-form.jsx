"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/text-area"
import { Upload, Calendar } from "lucide-react"
import PropTypes from "prop-types"

export function AddEmployeeForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        warehouseStoreId: "",
        emailId: "",
        hiringDate: "",
        departmentId: "",
        governmentIdType: "",
        state: "",
        pincode: "",
        address: "",
        idDocument: null,
        offerLetter: null,
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleFileUpload = (event, field) => {
        const file = event.target.files?.[0]
        if (file) {
            setFormData((prev) => ({
                ...prev,
                [field]: file,
            }))
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            await onSubmit?.(formData)
            setFormData({
                fullName: "",
                phoneNumber: "",
                warehouseStoreId: "",
                emailId: "",
                hiringDate: "",
                departmentId: "",
                governmentIdType: "",
                state: "",
                pincode: "",
                address: "",
                idDocument: null,
                offerLetter: null,
            })
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const headerActions = (
        <div className="flex items-center gap-4">
            <Button
                type="button"
                variant="outline"
                className="border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] flex items-center gap-2 bg-transparent"
            >
                <Upload className="w-4 h-4" />
                Bulk Upload
            </Button>
        </div>
    )

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Employee"
            size="xl"
            onSubmit={handleSubmit}
            submitLabel="Add New Employee"
            isSubmitting={isSubmitting}
            headerActions={headerActions}
        >
            <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-[#344054]">
                            Full Name
                        </Label>
                        <Input
                            id="fullName"
                            placeholder="Enter Full Name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hiringDate" className="text-sm font-medium text-[#344054]">
                            Hiring Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="hiringDate"
                                type="date"
                                value={formData.hiringDate}
                                onChange={(e) => handleInputChange("hiringDate", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium text-[#344054]">
                            Phone number
                        </Label>
                        <div className="flex">
                            <select className="border border-[#d0d5dd] border-r-0 rounded-l-lg px-3 py-3 bg-[#f9fafb] text-[#667085] text-sm">
                                <option>US</option>
                            </select>
                            <Input
                                id="phoneNumber"
                                placeholder="+ 1 955 000 0000"
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3] rounded-l-none border-l-0"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="warehouseStoreId" className="text-sm font-medium text-[#344054]">
                            Warehouse/Store ID
                        </Label>
                        <Input
                            id="warehouseStoreId"
                            placeholder="Ex: BRT12234"
                            value={formData.warehouseStoreId}
                            onChange={(e) => handleInputChange("warehouseStoreId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="departmentId" className="text-sm font-medium text-[#344054]">
                            Department ID
                        </Label>
                        <Input
                            id="departmentId"
                            placeholder="Ex: BRT12234"
                            value={formData.departmentId}
                            onChange={(e) => handleInputChange("departmentId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="emailId" className="text-sm font-medium text-[#344054]">
                            Email-Id
                        </Label>
                        <Input
                            id="emailId"
                            type="email"
                            placeholder="Enter your Email-ID"
                            value={formData.emailId}
                            onChange={(e) => handleInputChange("emailId", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="governmentIdType" className="text-sm font-medium text-[#344054]">
                            Government ID Type
                        </Label>
                        <select
                            id="governmentIdType"
                            value={formData.governmentIdType}
                            onChange={(e) => handleInputChange("governmentIdType", e.target.value)}
                            className="w-full border border-[#d0d5dd] rounded-lg px-3 py-3 h-12 text-[#667085] bg-white"
                        >
                            <option value="">Select Specific ID</option>
                            <option value="passport">Passport</option>
                            <option value="drivers-license">Drivers License</option>
                            <option value="ssn">Social Security Number</option>
                            <option value="state-id">State ID</option>
                        </select>
                    </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium text-[#344054]">
                            State
                        </Label>
                        <select
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            className="w-full border border-[#d0d5dd] rounded-lg px-3 py-3 h-12 text-[#667085] bg-white"
                        >
                            <option value="">Select your state</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-sm font-medium text-[#344054]">
                            Pincode
                        </Label>
                        <Input
                            id="pincode"
                            placeholder="Enter Pincode"
                            value={formData.pincode}
                            onChange={(e) => handleInputChange("pincode", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-[#344054]">Upload Files (ID & Offer Letter)</Label>
                        <div className="border-2 border-dashed border-[#d0d5dd] rounded-lg h-32 flex items-center justify-center bg-[#f9fafb] hover:bg-[#f3f4f6] transition-colors cursor-pointer">
                            <input
                                type="file"
                                accept=".svg,.png,.jpg,.pdf"
                                onChange={(e) => handleFileUpload(e, "documents")}
                                className="hidden"
                                id="documentUpload"
                                multiple
                            />
                            <label htmlFor="documentUpload" className="cursor-pointer flex flex-col items-center">
                                <Upload className="w-8 h-8 text-[#6941c6] mb-2" />
                                <span className="text-sm text-[#6941c6] font-medium">Click to upload</span>
                                <span className="text-xs text-[#667085] mt-1">SVG, PNG, JPG or PDF (max. 2MB)</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-[#344054]">
                        Address
                    </Label>
                    <Textarea
                        id="address"
                        placeholder="Enter your Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="border-[#d0d5dd] min-h-[100px] text-[#667085] placeholder:text-[#98a2b3] resize-none"
                    />
                </div>
            </div>
        </FormModal>
    )
}

AddEmployeeForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
