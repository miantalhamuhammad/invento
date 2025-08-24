import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';

const AuthDebugPanel = () => {
  const auth = useAuth();
  const authState = useSelector((state) => state.auth);

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-red-500 rounded-lg p-4 max-w-md max-h-96 overflow-auto z-50 text-xs">
      <h3 className="font-bold text-red-600 mb-2">AUTH DEBUG PANEL</h3>

      <div className="space-y-2">
        <div>
          <strong>Is Authenticated:</strong> {auth.isAuthenticated ? '✅ YES' : '❌ NO'}
        </div>

        <div>
          <strong>Token:</strong> {auth.token ? '✅ EXISTS' : '❌ MISSING'}
        </div>

        <div>
          <strong>User Object:</strong> {auth.user ? '✅ EXISTS' : '❌ MISSING'}
        </div>

        <div>
          <strong>Role Name:</strong> {auth.roleName || '❌ MISSING'}
        </div>

        <div>
          <strong>Role ID:</strong> {auth.roleId || '❌ MISSING'}
        </div>

        <div>
          <strong>Permissions Count:</strong> {auth.permissions?.length || 0}
        </div>

        <div>
          <strong>Has view_roles permission:</strong> {auth.permissions?.includes('view_roles') ? '✅ YES' : '❌ NO'}
        </div>

        <div className="border-t pt-2 mt-2">
          <strong>Raw Auth State:</strong>
          <pre className="bg-gray-100 p-2 rounded text-xs mt-1 overflow-auto max-h-32">
            {JSON.stringify(authState, null, 2)}
          </pre>
        </div>

        <div className="border-t pt-2 mt-2">
          <strong>Raw User Data:</strong>
          <pre className="bg-gray-100 p-2 rounded text-xs mt-1 overflow-auto max-h-32">
            {JSON.stringify(auth.user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AuthDebugPanel;
