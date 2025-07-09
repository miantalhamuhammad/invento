import PropTypes from "prop-types";

function Badge({ className = "", variant = "default", children, ...props }) {
    const baseClasses =
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variantClasses = {
        default: "border-transparent bg-blue-600 text-white shadow hover:bg-blue-700",
        secondary: "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300",
        destructive: "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
        outline: "border border-gray-300 text-gray-700",
    };

    const finalClassName = `${baseClasses} ${
        variantClasses[variant] || variantClasses.default
    } ${className}`;

    return (
        <div className={finalClassName} {...props}>
            {children}
        </div>
    );
}

Badge.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(["default", "secondary", "destructive", "outline"]),
    children: PropTypes.node,
};

export { Badge };

// import { cva } from "class-variance-authority";
// import PropTypes from "prop-types";
//
// import { cn } from "../../lib/utils";
//
// const badgeVariants = cva(
//     "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//     {
//         variants: {
//             variant: {
//                 default:
//                     "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
//                 secondary:
//                     "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
//                 destructive:
//                     "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
//                 outline: "text-foreground",
//             },
//         },
//         defaultVariants: {
//             variant: "default",
//         },
//     }
// );
//
// function Badge({ className, variant, ...props }) {
//     return (
//         <div className={cn(badgeVariants({ variant }), className)} {...props} />
//     );
// }
//
// Badge.propTypes = {
//     className: PropTypes.string,
//     variant: PropTypes.oneOf([
//         "default",
//         "secondary",
//         "destructive",
//         "outline",
//     ]),
// };
//
// export { Badge, badgeVariants };
