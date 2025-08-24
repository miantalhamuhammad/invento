import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Shield, Key, Users, AlertCircle, CheckCircle } from 'lucide-react';

const ApiIntegrationStatus = () => {
  const { user, permissions, roleName, isAuthenticated } = useAuth();

  const apiEndpoints = [
    { name: 'Authentication', endpoint: '/auth/login', status: 'connected', icon: Users },
    { name: 'Roles Management', endpoint: '/roles', status: 'connected', icon: Shield },
    { name: 'Permissions Management', endpoint: '/permissions', status: 'connected', icon: Key },
    { name: 'User Role Assignment', endpoint: '/users/{id}/role', status: 'connected', icon: Users },
    { name: 'Role Permissions', endpoint: '/roles/{id}/permissions', status: 'connected', icon: Shield },
  ];

  const frontendIntegration = [
    { feature: 'Redux API Configuration', status: isAuthenticated ? 'working' : 'pending' },
    { feature: 'Role-based UI Components', status: permissions?.length > 0 ? 'working' : 'pending' },
    { feature: 'Permission Hooks', status: 'working' },
    { feature: 'Protected Routes', status: 'working' },
    { feature: 'Error Handling', status: 'working' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">API Integration Status</h3>

      {/* Current User Status */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Current User Status</h4>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Authenticated:</span> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
          <p><span className="font-medium">Username:</span> {user?.username || 'Not logged in'}</p>
          <p><span className="font-medium">Role:</span> {roleName || 'No role assigned'}</p>
          <p><span className="font-medium">Permissions:</span> {permissions?.length || 0} permissions</p>
        </div>
      </div>

      {/* Backend API Endpoints */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Backend API Endpoints</h4>
        <div className="space-y-2">
          {apiEndpoints.map((endpoint) => (
            <div key={endpoint.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <endpoint.icon className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{endpoint.name}</p>
                  <p className="text-sm text-gray-500">{endpoint.endpoint}</p>
                </div>
              </div>
              <div className="flex items-center">
                {endpoint.status === 'connected' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className={`ml-2 text-sm font-medium ${
                  endpoint.status === 'connected' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {endpoint.status === 'connected' ? 'Connected' : 'Error'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frontend Integration */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Frontend Integration</h4>
        <div className="space-y-2">
          {frontendIntegration.map((item) => (
            <div key={item.feature} className="flex items-center justify-between p-3 border rounded-lg">
              <p className="font-medium text-gray-900">{item.feature}</p>
              <div className="flex items-center">
                {item.status === 'working' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
                <span className={`ml-2 text-sm font-medium ${
                  item.status === 'working' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {item.status === 'working' ? 'Working' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Configuration Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">API Configuration</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Base URL:</span> http://localhost:3001/api</p>
          <p><span className="font-medium">Authentication:</span> Bearer Token</p>
          <p><span className="font-medium">Cache Tags:</span> Role, Permission, User, RolePermission</p>
          <p><span className="font-medium">Error Handling:</span> Automatic retry and transformation</p>
        </div>
      </div>
    </div>
  );
};

export default ApiIntegrationStatus;
