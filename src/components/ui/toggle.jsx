import { useState } from "react";
import PropTypes from "prop-types";

function Toggle({
                    className = "",
                    variant = "default",
                    size = "default",
                    defaultPressed = false,
                    onToggle,
                    children,
                    ...props
                }) {
    const [pressed, setPressed] = useState(defaultPressed);

    const handleClick = () => {
        const newState = !pressed;
        setPressed(newState);
        if (typeof onToggle === "function") {
            onToggle(newState);
        }
    };

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

    const activeStateClasses = pressed
        ? "bg-blue-100 text-blue-800"
        : "text-gray-700";

    const finalClassName = `
    ${baseClasses} 
    ${sizeClasses[size] || sizeClasses.default} 
    ${variantClasses[variant] || variantClasses.default} 
    ${activeStateClasses} 
    ${className}
  `;

    return (
        <button
            type="button"
            className={finalClassName}
            aria-pressed={pressed}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
}

Toggle.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(["default", "outline"]),
    size: PropTypes.oneOf(["default", "sm", "lg"]),
    defaultPressed: PropTypes.bool,
    onToggle: PropTypes.func,
    children: PropTypes.node,
};

export { Toggle };

// "use client";
//
// import * as React from "react";
// import * as TogglePrimitive from "@radix-ui/react-toggle";
// import { cva } from "class-variance-authority";
// import PropTypes from "prop-types";
//
// import { cn } from "../../lib/utils";
//
// const toggleVariants = cva(
//     "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
//     {
//         variants: {
//             variant: {
//                 default: "bg-transparent",
//                 outline:
//                     "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
//             },
//             size: {
//                 default: "h-9 px-2 min-w-9",
//                 sm: "h-8 px-1.5 min-w-8",
//                 lg: "h-10 px-2.5 min-w-10",
//             },
//         },
//         defaultVariants: {
//             variant: "default",
//             size: "default",
//         },
//     }
// );
//
// const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
//     <TogglePrimitive.Root
//         ref={ref}
//         className={cn(toggleVariants({ variant, size }), className)}
//         {...props}
//     />
// ));
//
// Toggle.displayName = TogglePrimitive.Root.displayName;
//
// Toggle.propTypes = {
//     className: PropTypes.string,
//     variant: PropTypes.oneOf(["default", "outline"]),
//     size: PropTypes.oneOf(["default", "sm", "lg"]),
// };
//
// export { Toggle, toggleVariants };
