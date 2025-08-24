import React from 'react';
import { usePermissions } from '../../hooks/usePermissions.js';

/**
 * Permission Guard Component
 * Conditionally renders children based on user permissions
 */
export const PermissionGuard = ({
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  loading = null,
  children
}) => {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    loading: permissionsLoading
  } = usePermissions();

  // Show loading state if permissions are still being fetched
  if (permissionsLoading.userPermissions) {
    return loading || <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>;
  }

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  return hasAccess ? children : fallback;
};

/**
 * CRUD Permission Guard
 * Guards based on CRUD operations for a specific resource
 */
export const CRUDGuard = ({
  resource,
  action,
  fallback = null,
  children
}) => {
  const { getResourcePermissions, loading } = usePermissions();

  if (loading.userPermissions) {
    return <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>;
  }

  const permissions = getResourcePermissions(resource);
  const hasAccess = permissions[action] || false;

  return hasAccess ? children : fallback;
};

/**
 * Role-based Guard
 * Guards based on user roles
 */
export const RoleGuard = ({
  roles,
  requireAll = false,
  fallback = null,
  children
}) => {
  const { hasAnyPermission, hasAllPermissions, loading } = usePermissions();

  if (loading.userPermissions) {
    return <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>;
  }

  const hasAccess = requireAll
    ? hasAllPermissions(roles)
    : hasAnyPermission(roles);

  return hasAccess ? children : fallback;
};

/**
 * Admin Guard
 * Only shows content to admin users
 */
export const AdminGuard = ({
  superAdminOnly = false,
  fallback = null,
  children
}) => {
  const { isAdmin, isSuperAdmin, loading } = usePermissions();

  if (loading.userPermissions) {
    return <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>;
  }

  const hasAccess = superAdminOnly ? isSuperAdmin : isAdmin;

  return hasAccess ? children : fallback;
};

/**
 * Permission Badge
 * Shows a badge indicating permission status
 */
export const PermissionBadge = ({
  permission,
  showText = true,
  className = ""
}) => {
  const { hasPermission } = usePermissions();
  const granted = hasPermission(permission);

  const badgeClass = granted
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-red-100 text-red-800 border-red-200";

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${badgeClass} ${className}`}>
      <span className={`w-2 h-2 rounded-full mr-1 ${granted ? 'bg-green-400' : 'bg-red-400'}`}></span>
      {showText && (granted ? 'Granted' : 'Denied')}
    </span>
  );
};

/**
 * Permission List Component
 * Shows a list of permissions with their status
 */
export const PermissionsList = ({
  permissions,
  showStatus = true,
  className = ""
}) => {
  const { hasPermission } = usePermissions();

  return (
    <div className={`space-y-2 ${className}`}>
      {permissions.map((permission) => (
        <div key={permission} className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-sm font-medium text-gray-700">
            {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {showStatus && <PermissionBadge permission={permission} />}
        </div>
      ))}
    </div>
  );
};

/**
 * Resource Actions Component
 * Shows available actions for a resource based on permissions
 */
export const ResourceActions = ({
  resource,
  onAction,
  showLabels = true,
  className = ""
}) => {
  const { getResourcePermissions } = usePermissions();
  const permissions = getResourcePermissions(resource);

  const actions = [
    { key: 'create', label: 'Create', icon: '➕', color: 'blue' },
    { key: 'read', label: 'View', icon: '👁️', color: 'green' },
    { key: 'update', label: 'Edit', icon: '✏️', color: 'yellow' },
    { key: 'delete', label: 'Delete', icon: '🗑️', color: 'red' },
    { key: 'manage', label: 'Manage', icon: '⚙️', color: 'purple' },
  ];

  const getColorClass = (color, hasPermission) => {
    const colors = {
      blue: hasPermission ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed',
      green: hasPermission ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed',
      yellow: hasPermission ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 cursor-not-allowed',
      red: hasPermission ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed',
      purple: hasPermission ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-300 cursor-not-allowed',
    };
    return colors[color];
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      {actions.map((action) => {
        const hasPermission = permissions[action.key];
        return (
          <button
            key={action.key}
            onClick={() => hasPermission && onAction?.(action.key)}
            disabled={!hasPermission}
            className={`
              px-3 py-2 rounded-md text-white text-sm font-medium transition-colors
              ${getColorClass(action.color, hasPermission)}
            `}
            title={`${action.label} ${resource}`}
          >
            <span className="mr-1">{action.icon}</span>
            {showLabels && action.label}
          </button>
        );
      })}
    </div>
  );
};
