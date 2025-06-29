import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import PropTypes from "prop-types";

import { cn } from "../../lib/utils";
import { toggleVariants } from "./toggle";

// Context to share variant and size across ToggleGroupItems
const ToggleGroupContext = React.createContext({
    size: "default",
    variant: "default",
});

// ToggleGroup component
const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
    >
        <ToggleGroupContext.Provider value={{ variant, size }}>
            {children}
        </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

// ToggleGroupItem component
const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            ref={ref}
            className={cn(
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                }),
                className
            )}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

// Optional: Add prop-types for runtime validation
ToggleGroup.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.node,
};

ToggleGroupItem.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.node,
};

export { ToggleGroup, ToggleGroupItem };
