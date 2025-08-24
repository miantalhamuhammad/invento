import React, { useState } from 'react';
import { Shield, Key, Users, Settings, Grid } from 'lucide-react';
import RoleManagement from './RoleManagement';
import PermissionManagement from './PermissionManagement';
import UserRoleAssignment from './UserRoleAssignment';
import RoleOverview from './RoleOverview';
import PermissionMatrix from './PermissionMatrix';
import { ProtectedComponent } from '../../components/auth/ProtectedComponent';
import { Layout } from '../../components/layout/Layout';

const RolesAndPermissions = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon: Settings,
      component: RoleOverview,
      permission: 'view_roles'
    },
    {
      id: 'roles',
      name: 'Roles',
      icon: Shield,
      component: RoleManagement,
      permission: 'view_roles'
    },
    {
      id: 'permissions',
      name: 'Permissions',
      icon: Key,
      component: PermissionManagement,
      permission: 'view_permissions'
    },
    {
      id: 'assignments',
      name: 'User Assignments',
      icon: Users,
      component: UserRoleAssignment,
      permission: 'view_users'
    },
    {
      id: 'matrix',
      name: 'Permission Matrix',
      icon: Grid,
      component: PermissionMatrix,
      permission: 'view_permissions'
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <ProtectedComponent
      permission="view_roles"
      fallback={
        <div className="text-center py-12">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">You don't have permission to access role management.</p>
        </div>
      }
    >
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-gray-900">Roles & Permissions</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage user roles, permissions, and access control for your application
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <ProtectedComponent
                  key={tab.id}
                  permission={tab.permission}
                >
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    `}
                  >
                    <tab.icon
                      className={`
                        -ml-0.5 mr-2 h-5 w-5
                        ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {tab.name}
                  </button>
                </ProtectedComponent>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </Layout>
    </ProtectedComponent>
  );
};

export default RolesAndPermissions;
