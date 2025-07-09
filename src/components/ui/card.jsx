import PropTypes from "prop-types";

// Card
function Card({ className = "", children, ...props }) {
    return (
        <div
            className={`rounded-xl border bg-white text-black shadow ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// CardHeader
function CardHeader({ className = "", children, ...props }) {
    return (
        <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
            {children}
        </div>
    );
}

// CardTitle
function CardTitle({ className = "", children, ...props }) {
    return (
        <div className={`font-semibold leading-none tracking-tight ${className}`} {...props}>
            {children}
        </div>
    );
}

// CardDescription
function CardDescription({ className = "", children, ...props }) {
    return (
        <div className={`text-sm text-gray-500 ${className}`} {...props}>
            {children}
        </div>
    );
}

// CardContent
function CardContent({ className = "", children, ...props }) {
    return (
        <div className={`p-6 pt-0 ${className}`} {...props}>
            {children}
        </div>
    );
}

// CardFooter
function CardFooter({ className = "", children, ...props }) {
    return (
        <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
            {children}
        </div>
    );
}

// PropTypes
const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
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

// import * as React from "react";
// import PropTypes from "prop-types";
//
// import { cn } from "../../lib/utils";
//
// // Card
// const Card = React.forwardRef(({ className, ...props }, ref) => (
//     <div
//         ref={ref}
//         className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
//         {...props}
//     />
// ));
// Card.displayName = "Card";
//
// // CardHeader
// const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
// ));
// CardHeader.displayName = "CardHeader";
//
// // CardTitle
// const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
// ));
// CardTitle.displayName = "CardTitle";
//
// // CardDescription
// const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
// ));
// CardDescription.displayName = "CardDescription";
//
// // CardContent
// const CardContent = React.forwardRef(({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
// ));
// CardContent.displayName = "CardContent";
//
// // CardFooter
// const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
// ));
// CardFooter.displayName = "CardFooter";
//
// // Optional PropTypes (for ESLint & clarity)
// const propTypes = {
//     className: PropTypes.string,
// };
//
// Card.propTypes = propTypes;
// CardHeader.propTypes = propTypes;
// CardTitle.propTypes = propTypes;
// CardDescription.propTypes = propTypes;
// CardContent.propTypes = propTypes;
// CardFooter.propTypes = propTypes;
//
// export {
//     Card,
//     CardHeader,
//     CardFooter,
//     CardTitle,
//     CardDescription,
//     CardContent,
// };
