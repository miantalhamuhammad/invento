import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Current user's permissions
  userPermissions: [],

  // All available permissions in the system
  allPermissions: [],

  // Permission groups/categories
  permissionGroups: {},

  // Loading states
  loading: {
    userPermissions: false,
    allPermissions: false,
    checking: false,
  },

  // Error states
  errors: {
    userPermissions: null,
    allPermissions: null,
    checking: null,
  },

  // Cache for permission checks
  permissionCache: {},

  // Last updated timestamps
  lastUpdated: {
    userPermissions: null,
    allPermissions: null,
  },
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    // Set user permissions
    setUserPermissions: (state, action) => {
      state.userPermissions = action.payload;
      state.lastUpdated.userPermissions = Date.now();
      state.errors.userPermissions = null;
      // Clear cache when permissions change
      state.permissionCache = {};
    },

    // Set all available permissions
    setAllPermissions: (state, action) => {
      state.allPermissions = action.payload;
      state.lastUpdated.allPermissions = Date.now();
      state.errors.allPermissions = null;

      // Group permissions by category
      state.permissionGroups = action.payload.reduce((groups, permission) => {
        const category = permission.category || 'general';
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(permission);
        return groups;
      }, {});
    },

    // Add single permission to user permissions
    addUserPermission: (state, action) => {
      const permission = action.payload;
      const exists = state.userPermissions.find(p => p.name === permission.name);
      if (!exists) {
        state.userPermissions.push(permission);
        state.permissionCache = {}; // Clear cache
      }
    },

    // Remove permission from user permissions
    removeUserPermission: (state, action) => {
      const permissionName = action.payload;
      state.userPermissions = state.userPermissions.filter(
        p => p.name !== permissionName
      );
      state.permissionCache = {}; // Clear cache
    },

    // Cache permission check result
    cachePermissionCheck: (state, action) => {
      const { permission, result } = action.payload;
      state.permissionCache[permission] = {
        result,
        timestamp: Date.now(),
      };
    },

    // Set loading state
    setLoading: (state, action) => {
      const { type, loading } = action.payload;
      state.loading[type] = loading;
    },

    // Set error state
    setError: (state, action) => {
      const { type, error } = action.payload;
      state.errors[type] = error;
    },

    // Clear all errors
    clearErrors: (state) => {
      state.errors = {
        userPermissions: null,
        allPermissions: null,
        checking: null,
      };
    },

    // Clear permission cache
    clearPermissionCache: (state) => {
      state.permissionCache = {};
    },

    // Reset permissions state
    resetPermissions: (state) => {
      return { ...initialState };
    },
  },
});

export const {
  setUserPermissions,
  setAllPermissions,
  addUserPermission,
  removeUserPermission,
  cachePermissionCheck,
  setLoading,
  setError,
  clearErrors,
  clearPermissionCache,
  resetPermissions,
} = permissionsSlice.actions;

// Selectors
export const selectUserPermissions = (state) => state.permissions.userPermissions;
export const selectAllPermissions = (state) => state.permissions.allPermissions;
export const selectPermissionGroups = (state) => state.permissions.permissionGroups;
export const selectPermissionsLoading = (state) => state.permissions.loading;
export const selectPermissionsErrors = (state) => state.permissions.errors;
export const selectPermissionCache = (state) => state.permissions.permissionCache;

// Advanced selectors
export const selectUserPermissionNames = (state) =>
  state.permissions.userPermissions.map(p => p.name);

export const selectPermissionsByCategory = (state) => (category) =>
  state.permissions.permissionGroups[category] || [];

export const selectHasPermission = (state) => (permission) => {
  // Check cache first
  const cached = state.permissions.permissionCache[permission];
  if (cached && Date.now() - cached.timestamp < 60000) { // 1 minute cache
    return cached.result;
  }

  // Check if user has the permission
  return state.permissions.userPermissions.some(p => p.name === permission);
};

export const selectHasAnyPermission = (state) => (permissions) => {
  return permissions.some(permission =>
    state.permissions.userPermissions.some(p => p.name === permission)
  );
};

export const selectHasAllPermissions = (state) => (permissions) => {
  return permissions.every(permission =>
    state.permissions.userPermissions.some(p => p.name === permission)
  );
};

export default permissionsSlice.reducer;
