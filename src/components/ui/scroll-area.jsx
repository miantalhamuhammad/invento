import PropTypes from "prop-types";

// ScrollArea container
function ScrollArea({ className = "", children, style = {}, ...props }) {
    return (
        <div
            className={`relative overflow-auto rounded-md ${className}`}
            style={{
                scrollbarWidth: "thin",
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
}

ScrollArea.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
};

// Optional: Custom ScrollBar (just a styled indicator container)
function ScrollBar({ orientation = "vertical", className = "", ...props }) {
    const baseClasses = "absolute z-10 bg-gray-200 rounded-full";
    const orientationStyles =
        orientation === "vertical"
            ? "top-0 right-0 w-2 h-full"
            : "bottom-0 left-0 h-2 w-full";

    return (
        <div
            className={`${baseClasses} ${orientationStyles} ${className}`}
            {...props}
        />
    );
}

ScrollBar.propTypes = {
    orientation: PropTypes.oneOf(["vertical", "horizontal"]),
    className: PropTypes.string,
};

export { ScrollArea, ScrollBar };

// import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
// import * as React from "react";
// import PropTypes from "prop-types";
// import { cn } from "../../lib/utils";
//
// const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
//   <ScrollAreaPrimitive.Root
//     ref={ref}
//     className={cn("relative overflow-hidden", className)}
//     {...props}
//   >
//     <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
//       {children}
//     </ScrollAreaPrimitive.Viewport>
//     <ScrollBar />
//     <ScrollAreaPrimitive.Corner />
//   </ScrollAreaPrimitive.Root>
// ));
// ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
// ScrollArea.propTypes = {
//     className: PropTypes.string,
//     children: PropTypes.node,
// };
// const ScrollBar = React.forwardRef(
//   ({ className, orientation = "vertical", ...props }, ref) => (
//     <ScrollAreaPrimitive.ScrollAreaScrollbar
//       ref={ref}
//       orientation={orientation}
//       className={cn(
//         "flex touch-none select-none transition-colors",
//         orientation === "vertical" &&
//           "h-full w-2.5 border-l border-l-transparent p-[1px]",
//         orientation === "horizontal" &&
//           "h-2.5 flex-col border-t border-t-transparent p-[1px]",
//         className,
//       )}
//       {...props}
//     >
//       <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
//     </ScrollAreaPrimitive.ScrollAreaScrollbar>
//   ),
// );
// ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
// ScrollBar.propTypes = {
//     className: PropTypes.string,
//     orientation: PropTypes.oneOf(["vertical", "horizontal"]),
// };
// export { ScrollArea, ScrollBar };
