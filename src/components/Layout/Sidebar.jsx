import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiCheckSquare, 
  FiUser, 
  FiSettings, 
  FiLogOut
} from 'react-icons/fi';

const Sidebar = ({ onClose, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    // { path: '/dashboard', icon: <FiHome />, label: 'الرئيسية' },
    { path: '/tasks', icon: <FiCheckSquare />, label: 'المهام' },
    // { path: '/profile', icon: <FiUser />, label: 'الملف الشخصي' },
    // { path: '/settings', icon: <FiSettings />, label: 'الإعدادات' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={() => handleNavigation('/dashboard')}
          className="flex items-center gap-3 w-full text-left"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <FiCheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">Task Manager</h1>
            <p className="text-xs text-gray-500">إدارة المهام</p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiLogOut className="text-lg" />
          <span className="font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;