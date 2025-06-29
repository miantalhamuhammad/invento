import * as React from "react";
import PropTypes from "prop-types";

import { cn } from "../../lib/utils";

// Card
const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
        {...props}
    />
));
Card.displayName = "Card";

// CardHeader
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

// CardTitle
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

// CardDescription
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

// CardContent
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// CardFooter
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

// Optional PropTypes (for ESLint & clarity)
const propTypes = {
    className: PropTypes.string,
};

Card.propTypes = propTypes;
CardHeader.propTypes = propTypes;
CardTitle.propTypes = propTypes;
CardDescription.propTypes = propTypes;
CardContent.propTypes = propTypes;
CardFooter.propTypes = propTypes;

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
