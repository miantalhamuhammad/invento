import PropTypes from "prop-types";
import { CheckIcon } from "lucide-react";

function Checkbox({ className = "", checked=false, onChange, ...props }) {
    return (
        <label className={`inline-flex items-center gap-2 cursor-pointer`}>
      <span
          className={`
          relative flex items-center justify-center 
          h-4 w-4 shrink-0 rounded-sm border border-blue-600 shadow 
          focus:outline-none focus:ring-1 focus:ring-blue-400 
          disabled:cursor-not-allowed disabled:opacity-50
          ${checked ? "bg-blue-600 text-white" : "bg-white"}
          ${className}
        `}
      >
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="appearance-none absolute inset-0 w-full h-full cursor-pointer"
            {...props}
        />
          {checked && <CheckIcon className="h-3 w-3 pointer-events-none z-10" />}
      </span>
        </label>
    );
}

Checkbox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export { Checkbox };

// import * as React from "react";
// import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
// import { CheckIcon } from "lucide-react";
// import PropTypes from "prop-types";
//
// import { cn } from "../../lib/utils";
//
// const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
//     <CheckboxPrimitive.Root
//         ref={ref}
//         className={cn(
//             "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
//             className
//         )}
//         {...props}
//     >
//         <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
//             <CheckIcon className="h-4 w-4" />
//         </CheckboxPrimitive.Indicator>
//     </CheckboxPrimitive.Root>
// ));
//
// Checkbox.displayName = CheckboxPrimitive.Root.displayName;
//
// // Optional prop-types for linting
// Checkbox.propTypes = {
//     className: PropTypes.string,
// };
//
// export { Checkbox };
