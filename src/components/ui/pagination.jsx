import PropTypes from "prop-types";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";

// Reusable button styles for pagination links
const getButtonClass = ({ isActive = false, size = "icon", extra = "" }) => {
    const base =
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const sizes = {
        icon: "h-9 w-9",
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6 text-base",
    };
    const variant = isActive
        ? "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
        : "bg-transparent text-gray-700 hover:bg-gray-100";

    return `${base} ${sizes[size] || sizes.icon} ${variant} ${extra}`;
};

// Pagination root wrapper
function Pagination({ className = "", ...props }) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={`mx-auto flex w-full justify-center ${className}`}
            {...props}
        />
    );
}

Pagination.propTypes = {
    className: PropTypes.string,
};

// Content wrapper for pagination items
function PaginationContent({ className = "", children, ...props }) {
    return (
        <ul className={`flex flex-row items-center gap-1 ${className}`} {...props}>
            {children}
        </ul>
    );
}

PaginationContent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

// Individual item wrapper
function PaginationItem({ className = "", children, ...props }) {
    return (
        <li className={`list-none ${className}`} {...props}>
            {children}
        </li>
    );
}

PaginationItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

// Pagination link (numbered or active/ghost)
function PaginationLink({ className = "", isActive = false, size = "icon", children, ...props }) {
    const finalClass = getButtonClass({ isActive, size, extra: className });

    return (
        <a className={finalClass} {...props}>
            {children}
        </a>
    );
}

PaginationLink.propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    size: PropTypes.string,
    children: PropTypes.node,
};

// Previous link
function PaginationPrevious({ className = "", ...props }) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={`gap-1 pl-2.5 ${className}`}
            {...props}
        >
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Previous</span>
        </PaginationLink>
    );
}

PaginationPrevious.propTypes = {
    className: PropTypes.string,
};

// Next link
function PaginationNext({ className = "", ...props }) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={`gap-1 pr-2.5 ${className}`}
            {...props}
        >
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4" />
        </PaginationLink>
    );
}

PaginationNext.propTypes = {
    className: PropTypes.string,
};

// Ellipsis for more pages
function PaginationEllipsis({ className = "", ...props }) {
    return (
        <span
            aria-hidden
            className={`flex h-9 w-9 items-center justify-center ${className}`}
            {...props}
        >
      <MoreHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
    );
}

PaginationEllipsis.propTypes = {
    className: PropTypes.string,
};

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};

// import {
//     ChevronLeftIcon,
//     ChevronRightIcon,
//     MoreHorizontalIcon,
// } from "lucide-react";
// import * as React from "react";
// import PropTypes from "prop-types";
//
// import { cn } from "../../lib/utils";
// import { buttonVariants } from "./button";
//
// const Pagination = ({ className, ...props }) => (
//     <nav
//         role="navigation"
//         aria-label="pagination"
//         className={cn("mx-auto flex w-full justify-center", className)}
//         {...props}
//     />
// );
// Pagination.displayName = "Pagination";
// Pagination.propTypes = {
//     className: PropTypes.string,
// }
//
// const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
//     <ul
//         ref={ref}
//         className={cn("flex flex-row items-center gap-1", className)}
//         {...props}
//     />
// ));
// PaginationContent.displayName = "PaginationContent";
// PaginationContent.propTypes = {
//     className: PropTypes.string,
// }
// const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
//     <li
//         ref={ref}
//         className={cn("list-none", className)}  // Add 'list-none' to remove list styling
//         {...props}
//     />
// ));
// PaginationItem.displayName = "PaginationItem";
// PaginationItem.propTypes = {
//     className: PropTypes.string,
// }
//
// const PaginationLink = ({ className, isActive, size = "icon", ...props }) => (
//     <a
//         className={cn(
//             buttonVariants({
//                 variant: isActive ? "outline" : "ghost",
//                 size,
//             }),
//             className
//         )}
//         {...props}
//     />
// );
// PaginationLink.displayName = "PaginationLink";
//
// PaginationLink.propTypes = {
//     className: PropTypes.string,
//     isActive: PropTypes.bool,
//     size: PropTypes.string,
// };
//
// const PaginationPrevious = ({ className, ...props }) => (
//     <PaginationLink
//         aria-label="Go to previous page"
//         size="default"
//         className={cn("gap-1 pl-2.5", className)}
//         {...props}
//     >
//         <ChevronLeftIcon className="h-4 w-4" />
//         <span>Previous</span>
//     </PaginationLink>
// );
// PaginationPrevious.displayName = "PaginationPrevious";
// PaginationPrevious.propTypes = {
//     className: PropTypes.string,
// }
//
// const PaginationNext = ({ className, ...props }) => (
//     <PaginationLink
//         aria-label="Go to next page"
//         size="default"
//         className={cn("gap-1 pr-2.5", className)}
//         {...props}
//     >
//         <span>Next</span>
//         <ChevronRightIcon className="h-4 w-4" />
//     </PaginationLink>
// );
// PaginationNext.displayName = "PaginationNext";
// PaginationNext.propTypes = {
//     className: PropTypes.string,
// }
// const PaginationEllipsis = ({ className, ...props }) => (
//     <span
//         aria-hidden
//         className={cn("flex h-9 w-9 items-center justify-center", className)}
//         {...props}
//     >
//     <MoreHorizontalIcon className="h-4 w-4" />
//     <span className="sr-only">More pages</span>
//   </span>
// );
// PaginationEllipsis.displayName = "PaginationEllipsis";
// PaginationEllipsis.propTypes = {
//     className: PropTypes.string,
// }
//
//
// export {
//     Pagination,
//     PaginationContent,
//     PaginationLink,
//     PaginationItem,
//     PaginationPrevious,
//     PaginationNext,
//     PaginationEllipsis,
// };
