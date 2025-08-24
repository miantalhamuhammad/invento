import React from 'react';
import { useAuth, usePermission } from '../../hooks/useAuth.js';
import { ProtectedComponent, PermissionButton } from '../auth/ProtectedComponent.jsx';
import { Shield, User, Key } from 'lucide-react';

const UserRoleDisplay = () => {
  const { user, roleName, permissions } = useAuth();
  const canViewRoles = usePermission('view_roles');
  const canViewPermissions = usePermission('view_permissions');

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <User className="h-6 w-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Current User Access</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Shield className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">Role</span>
          </div>
          <p className="text-blue-700">{roleName || 'No role assigned'}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Key className="h-5 w-5 text-green-600 mr-2" />
            <span className="font-medium text-green-900">Permissions</span>
          </div>
          <p className="text-green-700">{permissions.length} permissions</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <User className="h-5 w-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-900">Username</span>
          </div>
          <p className="text-purple-700">{user.username}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <PermissionButton
          permission="view_roles"
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
        >
          Can View Roles
        </PermissionButton>
        <PermissionButton
          permission="view_permissions"
          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
        >
          Can View Permissions
        </PermissionButton>
        <PermissionButton
          permission="create_products"
          className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
        >
          Can Create Products
        </PermissionButton>
        <PermissionButton
          permission="view_dashboard"
          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
        >
          Can View Dashboard
        </PermissionButton>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-gray-900 mb-2">All Your Permissions:</h4>
        <div className="bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
          <div className="flex flex-wrap gap-1">
            {permissions.map((permission, index) => (
              <span key={index} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                {permission}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoleDisplay;
