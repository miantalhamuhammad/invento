import React, { useState, useEffect } from 'react';
import { usePermissions } from '../../hooks/usePermissions.js';
import {
  useGetPermissionsQuery,
  useGetPermissionsByCategoryQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation
} from '../../redux/services/permissions.js';
import { PermissionGuard, CRUDGuard, PermissionsList, PermissionBadge } from './PermissionGuards.jsx';

const PermissionsManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);

  const {
    userPermissions,
    allPermissions,
    permissionGroups,
    loading,
    errors,
    stats,
    fetchAllPermissions,
    canManage,
    isAdmin
  } = usePermissions();

  // RTK Query hooks
  const {
    data: permissions = [],
    isLoading: permissionsLoading,
    error: permissionsError
  } = useGetPermissionsQuery({
    page: 1,
    limit: 100,
    search: searchTerm
  });

  const {
    data: groupedPermissions = {},
    isLoading: groupedLoading
  } = useGetPermissionsByCategoryQuery();

  const [createPermission, { isLoading: creating }] = useCreatePermissionMutation();
  const [updatePermission, { isLoading: updating }] = useUpdatePermissionMutation();
  const [deletePermission, { isLoading: deleting }] = useDeletePermissionMutation();

  // Initialize permissions on component mount
  useEffect(() => {
    fetchAllPermissions();
  }, [fetchAllPermissions]);

  // Filter permissions based on category and search
  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || permission.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Object.keys(groupedPermissions)];

  const handleCreatePermission = async (formData) => {
    try {
      await createPermission(formData).unwrap();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create permission:', error);
    }
  };

  const handleUpdatePermission = async (formData) => {
    try {
      await updatePermission({ id: editingPermission.id, ...formData }).unwrap();
      setEditingPermission(null);
    } catch (error) {
      console.error('Failed to update permission:', error);
    }
  };

  const handleDeletePermission = async (id) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      try {
        await deletePermission(id).unwrap();
      } catch (error) {
        console.error('Failed to delete permission:', error);
      }
    }
  };

  if (loading.allPermissions || permissionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permissions Management</h1>
          <p className="text-gray-600">Manage system permissions and access control</p>
        </div>

        <CRUDGuard resource="permissions" action="create">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Create Permission</span>
          </button>
        </CRUDGuard>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Permissions</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalPermissions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Your Permissions</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.userPermissionsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Categories</h3>
          <p className="text-2xl font-bold text-green-600">{stats.permissionCategories}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Admin Status</h3>
          <p className="text-2xl font-bold text-purple-600">{isAdmin ? 'Admin' : 'User'}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search permissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Your Permissions Section */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Permissions</h2>
        {userPermissions.length > 0 ? (
          <PermissionsList
            permissions={userPermissions.map(p => p.name)}
            className="max-h-40 overflow-y-auto"
          />
        ) : (
          <p className="text-gray-500">No permissions assigned</p>
        )}
      </div>

      {/* All Permissions Section */}
      <PermissionGuard permission="view_permissions">
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">All Permissions</h2>
          </div>
          <div className="p-6">
            {filteredPermissions.length > 0 ? (
              <div className="grid gap-4">
                {filteredPermissions.map((permission) => (
                  <div key={permission.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            {permission.name}
                          </h3>
                          <PermissionBadge permission={permission.name} />
                          {permission.category && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {permission.category}
                            </span>
                          )}
                        </div>
                        {permission.description && (
                          <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <CRUDGuard resource="permissions" action="update">
                          <button
                            onClick={() => setEditingPermission(permission)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </CRUDGuard>

                        <CRUDGuard resource="permissions" action="delete">
                          <button
                            onClick={() => handleDeletePermission(permission.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                            disabled={deleting}
                          >
                            Delete
                          </button>
                        </CRUDGuard>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No permissions found</p>
            )}
          </div>
        </div>
      </PermissionGuard>

      {/* Error Display */}
      {(errors.allPermissions || permissionsError) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">
            {errors.allPermissions || permissionsError?.message || 'An error occurred'}
          </p>
        </div>
      )}

      {/* Modals would go here */}
      {showCreateModal && (
        <PermissionFormModal
          title="Create Permission"
          onSubmit={handleCreatePermission}
          onClose={() => setShowCreateModal(false)}
          loading={creating}
        />
      )}

      {editingPermission && (
        <PermissionFormModal
          title="Edit Permission"
          permission={editingPermission}
          onSubmit={handleUpdatePermission}
          onClose={() => setEditingPermission(null)}
          loading={updating}
        />
      )}
    </div>
  );
};

// Permission Form Modal Component
const PermissionFormModal = ({ title, permission, onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    name: permission?.name || '',
    description: permission?.description || '',
    category: permission?.category || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permission Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionsManagement;
