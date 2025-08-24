import React from 'react';
import { usePermission, useAnyPermission, useAllPermissions, useRole, useAnyRole } from '../../hooks/useAuth.js';

// Component to conditionally render based on permission
export const ProtectedComponent = ({
  permission,
  permissions,
  requireAll = false,
  role,
  roles,
  fallback = null,
  children
}) => {
  const hasPermission = permission ? usePermission(permission) : true;
  const hasAnyPermission = permissions ? useAnyPermission(permissions) : true;
  const hasAllPermissions = permissions && requireAll ? useAllPermissions(permissions) : true;
  const hasRole = role ? useRole(role) : true;
  const hasAnyRole = roles ? useAnyRole(roles) : true;

  const isAuthorized = hasPermission &&
                      hasAnyPermission &&
                      hasAllPermissions &&
                      hasRole &&
                      hasAnyRole;

  return isAuthorized ? children : fallback;
};

// Higher-order component for protecting routes/components
export const withPermission = (permission) => (Component) => {
  return function PermissionWrappedComponent(props) {
    const hasPermission = usePermission(permission);

    if (!hasPermission) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Access Denied
            </h3>
            <p className="text-gray-600">
              You don't have permission to access this resource.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

// Component for permission-based button rendering
export const PermissionButton = ({
  permission,
  permissions,
  requireAll = false,
  onClick,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const hasPermission = permission ? usePermission(permission) : true;
  const hasAnyPermission = permissions ? useAnyPermission(permissions) : true;
  const hasAllPermissions = permissions && requireAll ? useAllPermissions(permissions) : true;

  const isAuthorized = hasPermission && hasAnyPermission && hasAllPermissions;

  if (!isAuthorized) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

// Component for role-based navigation items
export const ProtectedNavItem = ({
  permission,
  permissions,
  role,
  roles,
  children
}) => {
  return (
    <ProtectedComponent
      permission={permission}
      permissions={permissions}
      role={role}
      roles={roles}
    >
      {children}
    </ProtectedComponent>
  );
};
