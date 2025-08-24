import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import {
  selectUserPermissions,
  selectAllPermissions,
  selectPermissionGroups,
  selectPermissionsLoading,
  selectPermissionsErrors,
  selectHasPermission,
  selectHasAnyPermission,
  selectHasAllPermissions,
  selectUserPermissionNames,
} from '../slices/permissionsSlice.js';
import {
  fetchUserPermissions,
  fetchAllPermissions,
  checkPermission,
  checkPermissions,
  initializePermissions,
  refreshPermissions,
} from '../thunks/permissionsThunks.js';

/**
 * Comprehensive permissions management hook
 * Provides all permission-related functionality in one place
 */
export const usePermissions = () => {
  const dispatch = useDispatch();

  // Selectors
  const userPermissions = useSelector(selectUserPermissions);
  const allPermissions = useSelector(selectAllPermissions);
  const permissionGroups = useSelector(selectPermissionGroups);
  const loading = useSelector(selectPermissionsLoading);
  const errors = useSelector(selectPermissionsErrors);
  const userPermissionNames = useSelector(selectUserPermissionNames);

  // Permission checking functions
  const hasPermission = useCallback((permission) => {
    return userPermissions.some(p => p.name === permission);
  }, [userPermissions]);

  const hasAnyPermission = useCallback((permissions) => {
    return permissions.some(permission => hasPermission(permission));
  }, [hasPermission]);

  const hasAllPermissions = useCallback((permissions) => {
    return permissions.every(permission => hasPermission(permission));
  }, [hasPermission]);

  // Advanced permission checking
  const canCreate = useCallback((resource) => {
    return hasPermission(`create_${resource}`) || hasPermission('admin');
  }, [hasPermission]);

  const canRead = useCallback((resource) => {
    return hasPermission(`view_${resource}`) || hasPermission('admin');
  }, [hasPermission]);

  const canUpdate = useCallback((resource) => {
    return hasPermission(`update_${resource}`) || hasPermission('admin');
  }, [hasPermission]);

  const canDelete = useCallback((resource) => {
    return hasPermission(`delete_${resource}`) || hasPermission('admin');
  }, [hasPermission]);

  const canManage = useCallback((resource) => {
    return hasPermission(`manage_${resource}`) || hasPermission('admin');
  }, [hasPermission]);

  // CRUD permissions for a resource
  const getResourcePermissions = useCallback((resource) => {
    return {
      create: canCreate(resource),
      read: canRead(resource),
      update: canUpdate(resource),
      delete: canDelete(resource),
      manage: canManage(resource),
    };
  }, [canCreate, canRead, canUpdate, canDelete, canManage]);

  // Get permissions by category
  const getPermissionsByCategory = useCallback((category) => {
    return permissionGroups[category] || [];
  }, [permissionGroups]);

  // Check if user is admin or super admin
  const isAdmin = useMemo(() => {
    return hasPermission('admin') || hasPermission('super_admin');
  }, [hasPermission]);

  const isSuperAdmin = useMemo(() => {
    return hasPermission('super_admin');
  }, [hasPermission]);

  // Action dispatchers
  const actions = useMemo(() => ({
    fetchUserPermissions: (userId) => dispatch(fetchUserPermissions(userId)),
    fetchAllPermissions: () => dispatch(fetchAllPermissions()),
    checkPermission: (permission) => dispatch(checkPermission(permission)),
    checkPermissions: (permissions) => dispatch(checkPermissions(permissions)),
    initializePermissions: (user) => dispatch(initializePermissions(user)),
    refreshPermissions: (userId) => dispatch(refreshPermissions(userId)),
  }), [dispatch]);

  // Permission statistics
  const stats = useMemo(() => ({
    totalPermissions: allPermissions.length,
    userPermissionsCount: userPermissions.length,
    permissionCategories: Object.keys(permissionGroups).length,
    permissionsByCategory: Object.entries(permissionGroups).map(([category, perms]) => ({
      category,
      count: perms.length,
      userHasCount: perms.filter(p => hasPermission(p.name)).length,
    })),
  }), [allPermissions, userPermissions, permissionGroups, hasPermission]);

  return {
    // Data
    userPermissions,
    allPermissions,
    permissionGroups,
    userPermissionNames,

    // States
    loading,
    errors,

    // Permission checking
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,

    // CRUD permissions
    canCreate,
    canRead,
    canUpdate,
    canDelete,
    canManage,
    getResourcePermissions,

    // Category functions
    getPermissionsByCategory,

    // Role checking
    isAdmin,
    isSuperAdmin,

    // Actions
    ...actions,

    // Statistics
    stats,
  };
};

/**
 * Hook for checking specific permission with loading state
 */
export const usePermissionCheck = (permission) => {
  const { hasPermission, loading } = usePermissions();

  return {
    hasPermission: hasPermission(permission),
    loading: loading.checking,
  };
};

/**
 * Hook for CRUD permissions on a specific resource
 */
export const useResourcePermissions = (resource) => {
  const { getResourcePermissions, loading } = usePermissions();

  return {
    permissions: getResourcePermissions(resource),
    loading: loading.userPermissions,
  };
};

/**
 * Hook for permission-based component rendering
 */
export const usePermissionGuard = () => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  const PermissionGuard = useCallback(({
    permission,
    permissions,
    requireAll = false,
    fallback = null,
    children
  }) => {
    let hasAccess = false;

    if (permission) {
      hasAccess = hasPermission(permission);
    } else if (permissions) {
      hasAccess = requireAll
        ? hasAllPermissions(permissions)
        : hasAnyPermission(permissions);
    }

    return hasAccess ? children : fallback;
  }, [hasPermission, hasAnyPermission, hasAllPermissions]);

  return { PermissionGuard };
};

/**
 * Hook for initializing permissions on app start
 */
export const usePermissionInitializer = () => {
  const dispatch = useDispatch();
  const { loading, errors } = usePermissions();

  const initialize = useCallback((user) => {
    return dispatch(initializePermissions(user));
  }, [dispatch]);

  return {
    initialize,
    loading: loading.userPermissions || loading.allPermissions,
    errors,
  };
};
