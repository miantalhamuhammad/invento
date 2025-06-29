import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";
import PropTypes from "prop-types";

import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

const Pagination = ({ className, ...props }) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
);
Pagination.displayName = "Pagination";
Pagination.propTypes = {
    className: PropTypes.string,
}

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
));
PaginationContent.displayName = "PaginationContent";
PaginationContent.propTypes = {
    className: PropTypes.string,
}
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn("list-none", className)}  // Add 'list-none' to remove list styling
        {...props}
    />
));
PaginationItem.displayName = "PaginationItem";
PaginationItem.propTypes = {
    className: PropTypes.string,
}

const PaginationLink = ({ className, isActive, size = "icon", ...props }) => (
    <a
        className={cn(
            buttonVariants({
                variant: isActive ? "outline" : "ghost",
                size,
            }),
            className
        )}
        {...props}
    />
);
PaginationLink.displayName = "PaginationLink";

PaginationLink.propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    size: PropTypes.string,
};

const PaginationPrevious = ({ className, ...props }) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 pl-2.5", className)}
        {...props}
    >
        <ChevronLeftIcon className="h-4 w-4" />
        <span>Previous</span>
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";
PaginationPrevious.propTypes = {
    className: PropTypes.string,
}

const PaginationNext = ({ className, ...props }) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 pr-2.5", className)}
        {...props}
    >
        <span>Next</span>
        <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";
PaginationNext.propTypes = {
    className: PropTypes.string,
}
const PaginationEllipsis = ({ className, ...props }) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
    <MoreHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";
PaginationEllipsis.propTypes = {
    className: PropTypes.string,
}


export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
