import PropTypes from "prop-types";

function Separator({
                     className = "",
                     orientation = "horizontal",
                     decorative = true,
                     ...props
                   }) {
  const baseClasses = "shrink-0 bg-gray-200";
  const orientationClass =
      orientation === "horizontal" ? "w-full h-px" : "h-full w-px";

  return (
      <div
          role={decorative ? "presentation" : "separator"}
          aria-orientation={orientation}
          className={`${baseClasses} ${orientationClass} ${className}`}
          {...props}
      />
  );
}

Separator.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  decorative: PropTypes.bool,
};

export { Separator };

// import * as SeparatorPrimitive from "@radix-ui/react-separator";
// import * as React from "react";
// import PropTypes from "prop-types";
// import { cn } from "../../lib/utils";
//
// const Separator = React.forwardRef(
//   (
//     { className, orientation = "horizontal", decorative = true, ...props },
//     ref,
//   ) => (
//     <SeparatorPrimitive.Root
//       ref={ref}
//       decorative={decorative}
//       orientation={orientation}
//       className={cn(
//         "shrink-0 bg-border",
//         orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
//         className,
//       )}
//       {...props}
//     />
//   ),
// );
// Separator.displayName = SeparatorPrimitive.Root.displayName;
// Separator.propTypes = {
//   className: PropTypes.string,
//   orientation: PropTypes.oneOf(["horizontal", "vertical"]),
//   decorative: PropTypes.bool,
// };
//
// export { Separator };
