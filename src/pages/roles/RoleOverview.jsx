import React, { useState } from 'react';
import { Shield, Key, Users, TrendingUp, Lock, UserCheck, Plus, Settings, AlertTriangle, Activity, BarChart3 } from 'lucide-react';
import { useGetRolesQuery } from '../../redux/services/roles';
import { useGetPermissionsQuery } from '../../redux/services/permissions';
import { useGetUsersQuery } from '../../redux/services/users';
import { useAuth } from '../../hooks/useAuth';

const RoleOverview = () => {
  const [timeRange, setTimeRange] = useState('30');
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: permissions, isLoading: permissionsLoading } = useGetPermissionsQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { user, permissions: userPermissions, roleName } = useAuth();

  const isLoading = rolesLoading || permissionsLoading || usersLoading;

  // Calculate advanced statistics
  const totalRoles = roles?.length || 0;
  const totalPermissions = permissions?.length || 0;
  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter(u => u.is_active).length || 0;
  const usersWithRoles = users?.filter(u => u.role).length || 0;
  const userPermissionCount = userPermissions?.length || 0;

  // Calculate permission coverage
  const permissionCoverage = totalPermissions > 0 ? (userPermissionCount / totalPermissions) * 100 : 0;

  // Role distribution data
  const roleDistribution = roles?.map(role => ({
    ...role,
    userCount: users?.filter(user => user.role?.id === role.id).length || 0,
    percentage: totalUsers > 0 ? ((users?.filter(user => user.role?.id === role.id).length || 0) / totalUsers) * 100 : 0
  })) || [];

  // System health metrics
  const systemHealth = {
    rolesConfigured: totalRoles > 0,
    permissionsSet: totalPermissions > 0,
    usersAssigned: usersWithRoles > 0,
    adminAccess: userPermissions?.includes('manage_role_permissions')
  };

  const healthScore = Object.values(systemHealth).filter(Boolean).length;

  // Recent activity simulation (in real app, this would come from audit logs)
  const recentActivity = [
    { action: 'Role Created', target: 'Manager Role', time: '2 hours ago', user: 'admin' },
    { action: 'Permission Assigned', target: 'view_products', time: '3 hours ago', user: 'admin' },
    { action: 'User Role Updated', target: 'john_doe', time: '5 hours ago', user: 'admin' },
    { action: 'Bulk Assignment', target: '5 users', time: '1 day ago', user: 'admin' },
  ];

  const stats = [
    {
      name: 'Total Roles',
      value: totalRoles,
      icon: Shield,
      color: 'blue',
      description: 'Active roles in the system',
      trend: '+12%',
      trendDirection: 'up'
    },
    {
      name: 'Total Permissions',
      value: totalPermissions,
      icon: Key,
      color: 'green',
      description: 'Available permissions',
      trend: '+5%',
      trendDirection: 'up'
    },
    {
      name: 'Active Users',
      value: `${activeUsers}/${totalUsers}`,
      icon: UserCheck,
      color: 'purple',
      description: 'Users with active accounts',
      trend: `${totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(0) : 0}%`,
      trendDirection: 'neutral'
    },
    {
      name: 'Your Access Level',
      value: `${userPermissionCount}/${totalPermissions}`,
      icon: Lock,
      color: 'orange',
      description: 'Permissions assigned to you',
      trend: `${permissionCoverage.toFixed(0)}%`,
      trendDirection: permissionCoverage > 50 ? 'up' : 'down'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Welcome back, {user?.username}!</h2>
              <p className="text-blue-100 mt-1">
                You're logged in as <span className="font-semibold">{roleName}</span> with {userPermissionCount} permissions
              </p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-blue-100">
                <span>Permission Coverage: {permissionCoverage.toFixed(0)}%</span>
                <span>System Health: {healthScore}/4</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{healthScore}/4</div>
            <div className="text-sm text-blue-100">System Health</div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`flex-shrink-0 p-3 rounded-md bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  stat.trendDirection === 'up' ? 'text-green-600' : 
                  stat.trendDirection === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.trend}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* System Health Dashboard */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">System Health</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            healthScore === 4 ? 'bg-green-100 text-green-800' :
            healthScore >= 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            {healthScore === 4 ? 'Excellent' : healthScore >= 2 ? 'Good' : 'Needs Attention'}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: 'rolesConfigured', label: 'Roles Configured', icon: Shield },
            { key: 'permissionsSet', label: 'Permissions Set', icon: Key },
            { key: 'usersAssigned', label: 'Users Assigned', icon: Users },
            { key: 'adminAccess', label: 'Admin Access', icon: Settings }
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center space-x-3 p-3 border rounded-lg">
              <Icon className={`h-5 w-5 ${systemHealth[key] ? 'text-green-500' : 'text-red-500'}`} />
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className={`text-xs ${systemHealth[key] ? 'text-green-600' : 'text-red-600'}`}>
                  {systemHealth[key] ? 'Configured' : 'Not Set'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Distribution Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Role Distribution</h3>
        <div className="space-y-4">
          {roleDistribution.map((role) => (
            <div key={role.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{role.name}</p>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${role.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-16 text-right">{role.userCount} users</span>
                <span className="text-xs text-gray-400 w-12 text-right">{role.percentage.toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPermissions?.includes('create_roles') && (
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Shield className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Create New Role</p>
                  <p className="text-sm text-gray-500">Add a new role to the system</p>
                </div>
              </button>
            )}

            {userPermissions?.includes('view_permissions') && (
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Key className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Manage Permissions</p>
                  <p className="text-sm text-gray-500">View and edit permissions</p>
                </div>
              </button>
            )}

            {userPermissions?.includes('update_users') && (
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Users className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Assign Users</p>
                  <p className="text-sm text-gray-500">Assign roles to users</p>
                </div>
              </button>
            )}

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <BarChart3 className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">View Matrix</p>
                <p className="text-sm text-gray-500">Permission matrix overview</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Activity className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">System Audit</p>
                <p className="text-sm text-gray-500">View system activity logs</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Settings className="h-8 w-8 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">System Settings</p>
                <p className="text-sm text-gray-500">Configure system preferences</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.target}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-xs text-gray-400">by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Permissions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Your Current Permissions</h3>
        </div>
        <div className="p-6">
          {userPermissions && userPermissions.length > 0 ? (
            <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {userPermissions.map((permission, index) => (
                  <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No Permissions Assigned</h3>
              <p className="mt-1 text-sm text-gray-500">Contact your administrator to assign permissions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleOverview;
