import { useSelector } from 'react-redux';

// Hook to get current user's permissions and role
export const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    permissions: auth.user?.role?.permissions?.map(p => p.name) || [],
    roleName: auth.user?.role?.name,
    roleId: auth.user?.role?.id,
  };
};

// Hook to check if user has specific permission
export const usePermission = (permissionName) => {
  const { permissions, user } = useAuth();

  // Temporary fix: Always allow admin user to access everything
  if (user?.email === 'admin@gmail.com' || user?.username === 'admin') {
    return true;
  }

  return permissions.includes(permissionName);
};

// Hook to check if user has any of the specified permissions
export const useAnyPermission = (permissionNames) => {
  const { permissions } = useAuth();
  return permissionNames.some(permission => permissions.includes(permission));
};

// Hook to check if user has all specified permissions
export const useAllPermissions = (permissionNames) => {
  const { permissions } = useAuth();
  return permissionNames.every(permission => permissions.includes(permission));
};

// Hook to check if user has specific role
export const useRole = (roleName) => {
  const { roleName: userRole } = useAuth();
  return userRole === roleName;
};

// Hook to check if user has any of the specified roles
export const useAnyRole = (roleNames) => {
  const { roleName } = useAuth();
  return roleNames.includes(roleName);
};
