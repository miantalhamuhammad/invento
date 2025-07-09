"use client"

import { useState } from "react"
import { FormModal } from "../../components/ui/form-modal"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Calendar, ChevronDown } from "lucide-react"
import PropTypes from "prop-types"

export function AddDepartmentForm({ isOpen, onClose, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        departmentName: "",
        dateOfCreation: "",
        assignManager: "",
        warehouseId: "",
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
                departmentName: "",
                dateOfCreation: "",
                assignManager: "",
                warehouseId: "",
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
            title="Add New Department"
            size="lg"
            onSubmit={handleSubmit}
            submitLabel="Add New Department"
            isSubmitting={isSubmitting}
        >
            <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="departmentName" className="text-sm font-medium text-[#344054]">
                            Department Name
                        </Label>
                        <Input
                            id="departmentName"
                            placeholder="Enter Full Name"
                            value={formData.departmentName}
                            onChange={(e) => handleInputChange("departmentName", e.target.value)}
                            className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateOfCreation" className="text-sm font-medium text-[#344054]">
                            Date of Creation
                        </Label>
                        <div className="relative">
                            <Input
                                id="dateOfCreation"
                                type="date"
                                value={formData.dateOfCreation}
                                onChange={(e) => handleInputChange("dateOfCreation", e.target.value)}
                                className="border-[#d0d5dd] h-12 text-[#667085] placeholder:text-[#98a2b3]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="assignManager" className="text-sm font-medium text-[#344054]">
                            Assign Manager
                        </Label>
                        <div className="relative">
                            <select
                                id="assignManager"
                                value={formData.assignManager}
                                onChange={(e) => handleInputChange("assignManager", e.target.value)}
                                className="w-full border border-[#d0d5dd] rounded-lg px-3 py-3 h-12 text-[#667085] bg-white appearance-none"
                            >
                                <option value="">Choose Manager Here</option>
                                <option value="john-smith">John Smith</option>
                                <option value="jane-doe">Jane Doe</option>
                                <option value="mike-johnson">Mike Johnson</option>
                                <option value="sarah-wilson">Sarah Wilson</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="warehouseId" className="text-sm font-medium text-[#344054]">
                            Warehouse ID
                        </Label>
                        <div className="relative">
                            <select
                                id="warehouseId"
                                value={formData.warehouseId}
                                onChange={(e) => handleInputChange("warehouseId", e.target.value)}
                                className="w-full border border-[#d0d5dd] rounded-lg px-3 py-3 h-12 text-[#667085] bg-white appearance-none"
                            >
                                <option value="">Select Specific ID</option>
                                <option value="WH001">WH001 - Main Warehouse</option>
                                <option value="WH002">WH002 - Secondary Warehouse</option>
                                <option value="WH003">WH003 - Distribution Center</option>
                                <option value="WH004">WH004 - Storage Facility</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </FormModal>
    )
}

AddDepartmentForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
}
