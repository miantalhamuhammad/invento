import React, { useState } from 'react';
import { Users, Edit, Search, UserPlus, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useGetRolesQuery } from '../../redux/services/roles';
import {
  useGetUsersQuery,
  useAssignUserRoleMutation,
  useBulkAssignRolesMutation
} from '../../redux/services/users';
import { ProtectedComponent, PermissionButton } from '../../components/auth/ProtectedComponent';

const UserRoleAssignment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bulkRoleId, setBulkRoleId] = useState('');

  // API hooks
  const { data: users, isLoading: usersLoading, error: usersError } = useGetUsersQuery({ search: searchTerm });
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery();
  const [assignUserRole, { isLoading: assigning }] = useAssignUserRoleMutation();
  const [bulkAssignRoles, { isLoading: bulkAssigning }] = useBulkAssignRolesMutation();

  const filteredUsers = users?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAssignRole = async (e) => {
    e.preventDefault();
    try {
      await assignUserRole({
        userId: selectedUser.id,
        roleId: selectedRoleId || null
      }).unwrap();
      setIsAssignModalOpen(false);
      setSelectedUser(null);
      setSelectedRoleId('');
    } catch (error) {
      console.error('Failed to assign role:', error);
      alert('Failed to assign role. Please try again.');
    }
  };

  const handleBulkAssign = async (e) => {
    e.preventDefault();
    try {
      await bulkAssignRoles({
        userIds: selectedUsers,
        roleId: bulkRoleId
      }).unwrap();
      setIsBulkModalOpen(false);
      setSelectedUsers([]);
      setBulkRoleId('');
    } catch (error) {
      console.error('Failed to bulk assign roles:', error);
      alert('Failed to bulk assign roles. Please try again.');
    }
  };

  const openAssignModal = (user) => {
    setSelectedUser(user);
    setSelectedRoleId(user.role?.id || '');
    setIsAssignModalOpen(true);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  if (usersLoading || rolesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading users</h3>
            <div className="mt-2 text-sm text-red-700">
              {usersError.message || 'Failed to load users'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedComponent
      permission="view_users"
      fallback={
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">You don't have permission to manage user roles.</p>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Role Assignment</h2>
            <p className="mt-1 text-sm text-gray-500">
              Assign roles to users and manage their access permissions
            </p>
          </div>
          <div className="flex gap-2">
            {selectedUsers.length > 0 && (
              <PermissionButton
                permission="update_users"
                onClick={() => setIsBulkModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Bulk Assign ({selectedUsers.length})
              </PermissionButton>
            )}
          </div>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Total Users: {users?.length || 0}</span>
            <span>Active: {users?.filter(u => u.is_active).length || 0}</span>
            <span>With Roles: {users?.filter(u => u.role).length || 0}</span>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Users & Their Roles</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUsers(filteredUsers.map(u => u.id));
                  } else {
                    setSelectedUsers([]);
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Select All</span>
            </label>
          </div>
          <ul className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <li key={user.id}>
                <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-4"
                    />
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">{user.username}</p>
                        {!user.is_active && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                        {user.is_active && (
                          <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      {user.role ? (
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-sm font-medium text-gray-900">{user.role.name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 italic">No role assigned</span>
                      )}
                    </div>

                    <PermissionButton
                      permission="update_users"
                      onClick={() => openAssignModal(user)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </PermissionButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search terms' : 'No users are available'}
              </p>
            </div>
          )}
        </div>

        {/* Role Distribution Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Role Distribution</h3>
          <div className="space-y-3">
            {roles?.map((role) => {
              const userCount = users?.filter(user => user.role?.id === role.id).length || 0;
              const percentage = users?.length > 0 ? (userCount / users.length) * 100 : 0;

              return (
                <div key={role.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{role.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-16 text-right">{userCount} users</span>
                    <span className="text-xs text-gray-400 w-12 text-right">{percentage.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}

            {/* Users without roles */}
            {(() => {
              const usersWithoutRoles = users?.filter(user => !user.role).length || 0;
              const percentage = users?.length > 0 ? (usersWithoutRoles / users.length) * 100 : 0;

              return usersWithoutRoles > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">No Role</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-16 text-right">{usersWithoutRoles} users</span>
                    <span className="text-xs text-gray-400 w-12 text-right">{percentage.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Assign Role Modal */}
        {isAssignModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Assign Role to {selectedUser.username}
              </h3>
              <form onSubmit={handleAssignRole}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Role
                  </label>
                  <select
                    value={selectedRoleId}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">No Role</option>
                    {roles?.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name} ({role.permissions?.length || 0} permissions)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAssignModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={assigning}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {assigning ? 'Assigning...' : 'Assign Role'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bulk Assign Modal */}
        {isBulkModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Bulk Assign Role to {selectedUsers.length} Users
              </h3>
              <form onSubmit={handleBulkAssign}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Role
                  </label>
                  <select
                    value={bulkRoleId}
                    onChange={(e) => setBulkRoleId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose a role...</option>
                    {roles?.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name} ({role.permissions?.length || 0} permissions)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    This will assign the selected role to {selectedUsers.length} selected users.
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsBulkModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bulkAssigning}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {bulkAssigning ? 'Assigning...' : 'Bulk Assign'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedComponent>
  );
};

export default UserRoleAssignment;
