//     import React from 'react';
// import { ChevronDown } from 'lucide-react';
//
// const Select = React.forwardRef(({
//   options = [],
//   value,
//   onChange,
//   placeholder = "Select an option",
//   disabled = false,
//   error = false,
//   loading = false,
//   className = "",
//   ...props
// }, ref) => {
//   return (
//     <div className="relative">
//       <select
//         ref={ref}
//         value={value}
//         onChange={onChange}
//         disabled={disabled || loading}
//         className={`
//           w-full px-3 py-2 pr-10 border rounded-md shadow-sm
//           focus:outline-none focus:ring-2 focus:ring-blue-500
//           disabled:bg-gray-50 disabled:cursor-not-allowed
//           ${error ? 'border-red-500' : 'border-gray-300'}
//           ${className}
//         `}
//         {...props}
//       >
//         <option value="">{loading ? "Loading..." : placeholder}</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//         <ChevronDown className={`h-4 w-4 ${disabled || loading ? 'text-gray-400' : 'text-gray-500'}`} />
//       </div>
//     </div>
//   );
// });
//
// Select.displayName = "Select";
//
// export { Select };
"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import PropTypes from "prop-types"

export const Select = ({
                           value,
                           onChange,
                           options = [],
                           placeholder = "Select an option",
                           disabled = false,
                           error = false,
                           className = "",
                           ...props
                       }) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (option) => {
        onChange(option)
        setIsOpen(false)
    }

    const selectedOption = value ? options.find((opt) => opt.value === value.value || opt.value === value) : null

    return (
        <div className={`relative ${className}`} ref={selectRef} {...props}>
            <button
                type="button"
                className={`
          w-full px-3 py-2 text-left bg-white border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${disabled ? "bg-gray-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}
          ${error ? "border-red-500" : "border-gray-300"}
          ${isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""}
        `}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <div className="flex items-center justify-between">
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.length === 0 ? (
                        <div className="px-3 py-2 text-gray-500">No options available</div>
                    ) : (
                        options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className={`
                  w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                  ${selectedOption?.value === option.value ? "bg-blue-50 text-blue-700" : "text-gray-900"}
                `}
                                onClick={() => handleSelect(option)}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option.label}</span>
                                    {selectedOption?.value === option.value && <Check className="h-4 w-4 text-blue-600" />}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

Select.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        }),
    ),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    className: PropTypes.string,
}
