import PropTypes from "prop-types";

function Input({ className = "", type = "text", ...props }) {
    const baseClasses =
        "flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

    return (
        <input
            type={type}
            className={`${baseClasses} ${className}`}
            {...props}
        />
    );
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
};

export { Input };

// import * as React from "react";
// import { cn } from "../../lib/utils";
// import PropTypes from "prop-types";
//
// const Input = React.forwardRef(({ className, type, ...props }, ref) => {
//     return (
//         <input
//             type={type}
//             className={cn(
//                 "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//                 className
//             )}
//             ref={ref}
//             {...props}
//         />
//     );
// });
//
// Input.displayName = "Input";
// Input.propTypes = {
//     className: PropTypes.string,
//     type: PropTypes.string,
// };
//
// export { Input };
