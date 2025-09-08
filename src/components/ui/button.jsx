// import { Slot } from "@radix-ui/react-slot";
// import { cva } from "class-variance-authority";
// import * as React from "react";
// import PropTypes from "prop-types";
// import { cn } from "../../lib/utils";
//
// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground shadow hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         lg: "h-10 rounded-md px-8",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   },
// );
//
// const Button = React.forwardRef(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   },
// );
// Button.displayName = "Button";
// Button.propTypes = {
//   className: PropTypes.string,
//   variant: PropTypes.oneOf([
//     "default",
//     "destructive",
//     "outline",
//     "secondary",
//     "ghost",
//     "link",
//   ]),
//   size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
//   asChild: PropTypes.bool,
// };
//
// export { Button, buttonVariants };

//here
import PropTypes from "prop-types";

// Define Tailwind classes for variants
const VARIANTS = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  link: "text-blue-600 underline hover:text-blue-800",
};

// Define Tailwind classes for sizes
const SIZES = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-6 text-base",
  icon: "h-9 w-9 p-0 flex items-center justify-center",
};

// function Button({ variant = "default", size = "default", className = "", children, ...props }) {
//   const baseClasses =
//       "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
//   const variantClass = VARIANTS[variant] || VARIANTS.default;
//   const sizeClass = SIZES[size] || SIZES.default;
//
//   return (
//       <button className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`} {...props}>
//         {children}
//       </button>
//   );
// }
function Button({ variant = "default", size = "default", className = "", children, type = "button", ...props }) {
  const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantClass = VARIANTS[variant] || VARIANTS.default;
  const sizeClass = SIZES[size] || SIZES.default;

  return (
      <button
          type={type}   // ✅ make sure type is explicitly forwarded
          className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
          {...props}
      >
        {children}
      </button>
  );
}


Button.propTypes = {
  variant: PropTypes.oneOf(["default", "destructive", "outline", "secondary", "ghost", "link"]),
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

//export default Button;
export {Button};

//here



// // import React from "react";
// import "./Button.css";
// // import { loaderAsset } from "../../assets/imagesPath";
//
// const CustomButton = ({
//                         className,
//                         icon,
//                         imgStyle,
//                         alt,
//                         onClick,
//                         label,
//                         status,
//                         disabled = false,
//                         type = "button",
//                         loading = false,
//                         id,
//                         style,
//                       }) => {
//   return (
//       <button
//           style={style}
//           type={type}
//           onClick={onClick}
//           className={className}
//           disabled={loading || disabled}
//           id={id}
//       >
//         {!loading && label}
//         {loading ? (
//             // <img src={loaderAsset} height="30" width="30" />
//             <h5 className="mb-0">Loading...</h5>
//         ) : (
//             icon && <img className="ms-3" src={icon} alt={alt} width={10} height={10} />
//         )}
//       </button>
//   );
// };
//
// export default CustomButton;