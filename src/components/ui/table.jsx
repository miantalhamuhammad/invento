import PropTypes from "prop-types";

function Table({ className = "", ...props }) {
    return (
        <div className="relative w-full overflow-auto">
            <table className={`w-full caption-bottom text-sm ${className}`} {...props} />
        </div>
    );
}

function TableHeader({ className = "", ...props }) {
    return <thead className={`[&_tr]:border-b ${className}`} {...props} />;
}

function TableBody({ className = "", ...props }) {
    return <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />;
}

function TableFooter({ className = "", ...props }) {
    return (
        <tfoot
            className={`border-t bg-gray-100 font-medium [&>tr]:last:border-b-0 ${className}`}
            {...props}
        />
    );
}

function TableRow({ className = "", ...props }) {
    return (
        <tr
            className={`border-b transition-colors hover:bg-gray-100 data-[state=selected]:bg-gray-100 ${className}`}
            {...props}
        />
    );
}

function TableHead({ className = "", ...props }) {
    return (
        <th
            className={`h-10 px-2 text-left align-middle font-medium text-gray-500 
        [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${className}`}
            {...props}
        />
    );
}

function TableCell({ className = "", ...props }) {
    return (
        <td
            className={`p-2 align-middle 
        [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${className}`}
            {...props}
        />
    );
}

function TableCaption({ className = "", ...props }) {
    return (
        <caption className={`mt-4 text-sm text-gray-400 ${className}`} {...props} />
    );
}

// PropTypes
const propTypes = {
    className: PropTypes.string,
};

Table.propTypes = propTypes;
TableHeader.propTypes = propTypes;
TableBody.propTypes = propTypes;
TableFooter.propTypes = propTypes;
TableRow.propTypes = propTypes;
TableHead.propTypes = propTypes;
TableCell.propTypes = propTypes;
TableCaption.propTypes = propTypes;

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};

// import * as React from "react";
// import { cn } from "../../lib/utils";
// import PropTypes from "prop-types";
//
// const Table = React.forwardRef(({ className, ...props }, ref) => (
//     <div className="relative w-full overflow-auto">
//         <table
//             ref={ref}
//             className={cn("w-full caption-bottom text-sm", className)}
//             {...props}
//         />
//     </div>
// ));
// Table.displayName = "Table";
// Table.propTypes = {
//     className: PropTypes.string,
// }
//
// const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
//     <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
// ));
// TableHeader.displayName = "TableHeader";
// TableHeader.propTypes = {
//     className: PropTypes.string,
// }
//
// const TableBody = React.forwardRef(({ className, ...props }, ref) => (
//     <tbody
//         ref={ref}
//         className={cn("[&_tr:last-child]:border-0", className)}
//         {...props}
//     />
// ));
// TableBody.displayName = "TableBody";
// TableBody.propTypes = {
//     className: PropTypes.string,
// }
//
// const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
//     <tfoot
//         ref={ref}
//         className={cn(
//             "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
//             className
//         )}
//         {...props}
//     />
// ));
// TableFooter.displayName = "TableFooter";
// TableFooter.propTypes = {
//     className: PropTypes.string,
// }
//
// const TableRow = React.forwardRef(({ className, ...props }, ref) => (
//     <tr
//         ref={ref}
//         className={cn(
//             "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
//             className
//         )}
//         {...props}
//     />
// ));
// TableRow.displayName = "TableRow";
// TableRow.propTypes = {
//     className: PropTypes.string,
// }
//
// const TableHead = React.forwardRef(({ className, ...props }, ref) => (
//     <th
//         ref={ref}
//         className={cn(
//             "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
//             className
//         )}
//         {...props}
//     />
// ));
// TableHead.displayName = "TableHead";
// TableHead.propTypes = {
//     className: PropTypes.string,
// }
// const TableCell = React.forwardRef(({ className, ...props }, ref) => (
//     <td
//         ref={ref}
//         className={cn(
//             "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
//             className
//         )}
//         {...props}
//     />
// ));
// TableCell.displayName = "TableCell";
// TableCell.propTypes = {
//     className: PropTypes.string,
// }
//
// const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
//     <caption
//         ref={ref}
//         className={cn("mt-4 text-sm text-muted-foreground", className)}
//         {...props}
//     />
// ));
// TableCaption.displayName = "TableCaption";
// TableCaption.propTypes = {
//     className: PropTypes.string,
// }
//
// export {
//     Table,
//     TableHeader,
//     TableBody,
//     TableFooter,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableCaption,
// };
