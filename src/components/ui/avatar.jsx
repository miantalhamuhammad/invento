"use client";
import PropTypes from "prop-types";
import { useState } from "react";

// Avatar wrapper
function Avatar({ className = "", children, ...props }) {
  const baseClasses =
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full";
  return (
      <div className={`${baseClasses} ${className}`} {...props}>
        {children}
      </div>
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// Avatar image with error fallback handling
function AvatarImage({ className = "", src, alt = "", onError, onLoad, ...props }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) return null;

  const baseClasses = "aspect-square h-full w-full object-cover";
  return (
      <img
          src={src}
          alt={alt}
          className={`${baseClasses} ${className}`}
          onError={(e) => {
            setHasError(true);
            if (onError) onError(e);
          }}
          onLoad={onLoad}
          {...props}
      />
  );
}

AvatarImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
};

// Avatar fallback (initials or placeholder)
function AvatarFallback({ className = "", children, ...props }) {
  const baseClasses =
      "flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-600 text-sm font-medium";
  return (
      <div className={`${baseClasses} ${className}`} {...props}>
        {children}
      </div>
  );
}

AvatarFallback.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Avatar, AvatarImage, AvatarFallback };

//
// "use client";
//
// import * as AvatarPrimitive from "@radix-ui/react-avatar";
// import * as React from "react";
// import PropTypes from "prop-types";
//
// import { cn } from "../../lib/utils";
//
// const Avatar = React.forwardRef(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Root
//     ref={ref}
//     className={cn(
//       "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
//       className,
//     )}
//     {...props}
//   />
// ));
// Avatar.displayName = AvatarPrimitive.Root.displayName;
// Avatar.propTypes = {
//   className: PropTypes.string,
//   children: PropTypes.node,
// };
//
// const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Image
//     ref={ref}
//     className={cn("aspect-square h-full w-full", className)}
//     {...props}
//   />
// ));
// AvatarImage.displayName = AvatarPrimitive.Image.displayName;
// AvatarImage.propTypes = {
//   className: PropTypes.string,
//   src: PropTypes.string,
//   alt: PropTypes.string,
// };
//
// const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Fallback
//     ref={ref}
//     className={cn(
//       "flex h-full w-full items-center justify-center rounded-full bg-muted",
//       className,
//     )}
//     {...props}
//   />
// ));
// AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
// AvatarFallback.propTypes = {
//   className: PropTypes.string,
//   children: PropTypes.node,
//   delayMs: PropTypes.number,
// };
//
// export { Avatar, AvatarImage, AvatarFallback };
