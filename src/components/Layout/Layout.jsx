import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // تأكد أن هذا المسار صحيح
import Sidebar from './Sidebar';
import Header from './Header';
import { FiMenu } from 'react-icons/fi';
import LoadingSpinner from '../UI/LoadingSpinner'; // تأكد من استيراده

const Layout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    
    const timer = setTimeout(() => {
      if (!user) {
      
        navigate('/login');
      }
      setIsCheckingAuth(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-64 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
      </div>

      {/* Main content */}
      <div className="lg:pr-64">
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
          onLogout={handleLogout}
        />

        {/* Main content area */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed bottom-4 left-4 z-50 p-3 bg-primary-600 text-white rounded-full shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <FiMenu className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Layout;