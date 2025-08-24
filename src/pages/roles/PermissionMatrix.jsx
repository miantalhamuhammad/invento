import React, { useState } from 'react';
import { Shield, Key, Users, Settings, AlertTriangle } from 'lucide-react';
import { useGetRolesQuery } from '../../redux/services/roles';
import { useGetPermissionsQuery } from '../../redux/services/permissions';

const PermissionMatrix = () => {
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: permissions, isLoading: permissionsLoading } = useGetPermissionsQuery();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isLoading = rolesLoading || permissionsLoading;

  // Group permissions by category
  const permissionCategories = {
    roles: permissions?.filter(p => p.name.includes('role')) || [],
    permissions: permissions?.filter(p => p.name.includes('permission')) || [],
    users: permissions?.filter(p => p.name.includes('user')) || [],
    products: permissions?.filter(p => p.name.includes('product')) || [],
    categories: permissions?.filter(p => p.name.includes('categor')) || [],
    customers: permissions?.filter(p => p.name.includes('customer')) || [],
    suppliers: permissions?.filter(p => p.name.includes('supplier')) || [],
    warehouses: permissions?.filter(p => p.name.includes('warehouse')) || [],
    orders: permissions?.filter(p => p.name.includes('order')) || [],
    stock: permissions?.filter(p => p.name.includes('stock')) || [],
    employees: permissions?.filter(p => p.name.includes('employee')) || [],
    dashboard: permissions?.filter(p => p.name.includes('dashboard')) || [],
    other: permissions?.filter(p =>
      !p.name.includes('role') &&
      !p.name.includes('permission') &&
      !p.name.includes('user') &&
      !p.name.includes('product') &&
      !p.name.includes('categor') &&
      !p.name.includes('customer') &&
      !p.name.includes('supplier') &&
      !p.name.includes('warehouse') &&
      !p.name.includes('order') &&
      !p.name.includes('stock') &&
      !p.name.includes('employee') &&
      !p.name.includes('dashboard')
    ) || []
  };

  const filteredPermissions = selectedCategory === 'all'
    ? permissions
    : permissionCategories[selectedCategory];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!roles || !permissions) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Data Available</h3>
        <p className="mt-1 text-sm text-gray-500">Please ensure roles and permissions are properly configured.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Permission Matrix</h2>
        <p className="mt-1 text-sm text-gray-500">
          View which roles have which permissions across your system
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900">Total Roles</p>
              <p className="text-2xl font-bold text-blue-600">{roles?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <Key className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">Total Permissions</p>
              <p className="text-2xl font-bold text-green-600">{permissions?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-900">Categories</p>
              <p className="text-2xl font-bold text-purple-600">{Object.keys(permissionCategories).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedCategory === 'all'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({permissions?.length || 0})
        </button>
        {Object.entries(permissionCategories).map(([category, perms]) => (
          perms.length > 0 && (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category} ({perms.length})
            </button>
          )
        ))}
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Permission
                </th>
                {roles?.map((role) => (
                  <th key={role.id} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex flex-col items-center">
                      <Shield className="h-4 w-4 text-blue-500 mb-1" />
                      <span>{role.name}</span>
                      <span className="text-xs text-gray-400">({role.permissions?.length || 0})</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPermissions?.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 text-green-500 mr-2" />
                      <div>
                        <div className="font-medium">{permission.name}</div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">{permission.description}</div>
                      </div>
                    </div>
                  </td>
                  {roles?.map((role) => {
                    const hasPermission = role.permissions?.some(p => p.id === permission.id) ||
                                        role.permissions?.some(p => p.name === permission.name);
                    return (
                      <td key={role.id} className="px-3 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center">
                          {hasPermission ? (
                            <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                            </div>
                          ) : (
                            <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Legend</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-600">Has Permission</span>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center mr-2">
              <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-600">No Permission</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Permission Distribution</h3>
        <div className="space-y-3">
          {roles?.map((role) => {
            const permissionCount = role.permissions?.length || 0;
            const percentage = permissions?.length > 0 ? (permissionCount / permissions.length) * 100 : 0;

            return (
              <div key={role.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">{role.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-16 text-right">
                    {permissionCount}/{permissions?.length || 0}
                  </span>
                  <span className="text-xs text-gray-400 w-12 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PermissionMatrix;
