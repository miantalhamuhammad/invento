import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setUserPermissions,
  setAllPermissions,
  setLoading,
  setError,
  cachePermissionCheck
} from '../slices/permissionsSlice.js';

// Fetch user permissions
export const fetchUserPermissions = createAsyncThunk(
  'permissions/fetchUserPermissions',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ type: 'userPermissions', loading: true }));

      // This would typically call your API
      // For now, we'll get permissions from the user's roles
      const response = await fetch(`/api/users/${userId}/permissions`);

      if (!response.ok) {
        throw new Error('Failed to fetch user permissions');
      }

      const permissions = await response.json();
      dispatch(setUserPermissions(permissions.data || permissions));

      return permissions.data || permissions;
    } catch (error) {
      dispatch(setError({ type: 'userPermissions', error: error.message }));
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading({ type: 'userPermissions', loading: false }));
    }
  }
);

// Fetch all available permissions
export const fetchAllPermissions = createAsyncThunk(
  'permissions/fetchAllPermissions',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ type: 'allPermissions', loading: true }));

      const response = await fetch('/api/permissions');

      if (!response.ok) {
        throw new Error('Failed to fetch permissions');
      }

      const permissions = await response.json();
      dispatch(setAllPermissions(permissions.data || permissions));

      return permissions.data || permissions;
    } catch (error) {
      dispatch(setError({ type: 'allPermissions', error: error.message }));
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading({ type: 'allPermissions', loading: false }));
    }
  }
);

// Check if user has specific permission (with caching)
export const checkPermission = createAsyncThunk(
  'permissions/checkPermission',
  async (permission, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cached = state.permissions.permissionCache[permission];

      // Return cached result if still valid (1 minute cache)
      if (cached && Date.now() - cached.timestamp < 60000) {
        return cached.result;
      }

      dispatch(setLoading({ type: 'checking', loading: true }));

      // Check locally first
      const userPermissions = state.permissions.userPermissions;
      const hasPermission = userPermissions.some(p => p.name === permission);

      // Cache the result
      dispatch(cachePermissionCheck({ permission, result: hasPermission }));

      return hasPermission;
    } catch (error) {
      dispatch(setError({ type: 'checking', error: error.message }));
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading({ type: 'checking', loading: false }));
    }
  }
);

// Bulk permission check
export const checkPermissions = createAsyncThunk(
  'permissions/checkPermissions',
  async (permissions, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(setLoading({ type: 'checking', loading: true }));

      const state = getState();
      const userPermissions = state.permissions.userPermissions;

      const results = {};

      permissions.forEach(permission => {
        const hasPermission = userPermissions.some(p => p.name === permission);
        results[permission] = hasPermission;

        // Cache each result
        dispatch(cachePermissionCheck({ permission, result: hasPermission }));
      });

      return results;
    } catch (error) {
      dispatch(setError({ type: 'checking', error: error.message }));
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading({ type: 'checking', loading: false }));
    }
  }
);

// Initialize permissions for authenticated user
export const initializePermissions = createAsyncThunk(
  'permissions/initialize',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      // Fetch user's permissions and all available permissions in parallel
      const [userPermissionsResult, allPermissionsResult] = await Promise.allSettled([
        dispatch(fetchUserPermissions(user.id)),
        dispatch(fetchAllPermissions())
      ]);

      const results = {
        userPermissions: userPermissionsResult.status === 'fulfilled' ? userPermissionsResult.value : null,
        allPermissions: allPermissionsResult.status === 'fulfilled' ? allPermissionsResult.value : null,
        errors: []
      };

      if (userPermissionsResult.status === 'rejected') {
        results.errors.push(`User permissions: ${userPermissionsResult.reason}`);
      }

      if (allPermissionsResult.status === 'rejected') {
        results.errors.push(`All permissions: ${allPermissionsResult.reason}`);
      }

      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Refresh permissions (clear cache and refetch)
export const refreshPermissions = createAsyncThunk(
  'permissions/refresh',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      // Clear cache first
      dispatch({ type: 'permissions/clearPermissionCache' });

      // Refetch permissions
      await dispatch(fetchUserPermissions(userId));

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
