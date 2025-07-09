import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Context to share variant, size, and selection logic
const ToggleGroupContext = createContext({
    size: "default",
    variant: "default",
    type: "single",
    value: null,
    onItemToggle: () => {},
});

function ToggleGroup({
                         className = "",
                         type = "single",
                         size = "default",
                         variant = "default",
                         value: controlledValue,
                         onChange,
                         children,
                         ...props
                     }) {
    const [internalValue, setInternalValue] = useState(null);

    const value = controlledValue ?? internalValue;

    const onItemToggle = (newValue) => {
        if (type === "single") {
            if (newValue === value) {
                setInternalValue(null);
                onChange?.(null);
            } else {
                setInternalValue(newValue);
                onChange?.(newValue);
            }
        }
        // Add multiple select support here if needed
    };

    return (
        <div
            className={`flex items-center justify-center gap-1 ${className}`}
            {...props}
        >
            <ToggleGroupContext.Provider
                value={{ variant, size, type, value, onItemToggle }}
            >
                {children}
            </ToggleGroupContext.Provider>
        </div>
    );
}

ToggleGroup.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(["single"]),
    size: PropTypes.oneOf(["default", "sm", "lg"]),
    variant: PropTypes.oneOf(["default", "outline"]),
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node,
};

function ToggleGroupItem({
                             className = "",
                             children,
                             value,
                             ...props
                         }) {
    const { variant, size, value: groupValue, onItemToggle } =
        useContext(ToggleGroupContext);

    const isActive = groupValue === value;

    const baseClasses =
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4";

    const sizeClasses = {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
    };

    const variantClasses = {
        default: "bg-transparent hover:bg-gray-100 text-gray-800",
        outline:
            "border border-gray-300 bg-transparent shadow-sm hover:bg-gray-100 hover:text-black",
    };

    const activeStateClasses = isActive
        ? "bg-blue-100 text-blue-800"
        : "text-gray-700";

    const finalClass = `
    ${baseClasses} 
    ${sizeClasses[size] || sizeClasses.default} 
    ${variantClasses[variant] || variantClasses.default} 
    ${activeStateClasses} 
    ${className}
  `;

    return (
        <button
            type="button"
            className={finalClass}
            aria-pressed={isActive}
            onClick={() => onItemToggle(value)}
            {...props}
        >
            {children}
        </button>
    );
}

ToggleGroupItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.string.isRequired,
};

export { ToggleGroup, ToggleGroupItem };

// import * as React from "react";
// import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
// import PropTypes from "prop-types";
//
// import { cn } from "../../lib/utils";
// import { toggleVariants } from "./toggle";
//
// // Context to share variant and size across ToggleGroupItems
// const ToggleGroupContext = React.createContext({
//     size: "default",
//     variant: "default",
// });
//
// // ToggleGroup component
// const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
//     <ToggleGroupPrimitive.Root
//         ref={ref}
//         className={cn("flex items-center justify-center gap-1", className)}
//         {...props}
//     >
//         <ToggleGroupContext.Provider value={{ variant, size }}>
//             {children}
//         </ToggleGroupContext.Provider>
//     </ToggleGroupPrimitive.Root>
// ));
//
// ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
//
// // ToggleGroupItem component
// const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
//     const context = React.useContext(ToggleGroupContext);
//
//     return (
//         <ToggleGroupPrimitive.Item
//             ref={ref}
//             className={cn(
//                 toggleVariants({
//                     variant: context.variant || variant,
//                     size: context.size || size,
//                 }),
//                 className
//             )}
//             {...props}
//         >
//             {children}
//         </ToggleGroupPrimitive.Item>
//     );
// });
//
// ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;
//
// // Optional: Add prop-types for runtime validation
// ToggleGroup.propTypes = {
//     className: PropTypes.string,
//     variant: PropTypes.string,
//     size: PropTypes.string,
//     children: PropTypes.node,
// };
//
// ToggleGroupItem.propTypes = {
//     className: PropTypes.string,
//     variant: PropTypes.string,
//     size: PropTypes.string,
//     children: PropTypes.node,
// };
//
// export { ToggleGroup, ToggleGroupItem };
