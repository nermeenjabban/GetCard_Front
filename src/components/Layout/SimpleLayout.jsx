import React from 'react';
import { Outlet,Link } from 'react-router-dom';

const SimpleLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط تنقل بسيط */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">إدارة المهام</h1>
            <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
  الرئيسية
</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default SimpleLayout;