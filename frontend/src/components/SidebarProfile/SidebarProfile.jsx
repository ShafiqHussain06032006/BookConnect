import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';

const SidebarProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const { stats, fetchStats } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  const menuItems = [
    {
      label: 'My Books',
      path: '/dashboard/my-books',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      count: stats?.totalBooksUploaded || 0,
    },
    {
      label: 'Requests Sent',
      path: '/dashboard/requests-sent',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      count: stats?.totalBorrowRequestsSent || 0,
    },
    {
      label: 'Requests Received',
      path: '/dashboard/requests-received',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      count: stats?.totalBorrowRequestsReceived || 0,
    },
    {
      label: 'My Purchases',
      path: '/dashboard/purchases',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      count: stats?.totalPurchasesMade || 0,
    },
    {
      label: 'Purchase Requests',
      path: '/dashboard/purchase-requests',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      count: stats?.totalPurchaseRequestsReceived || 0,
    },
  ];

  return (
    <>
      {/* Toggle Button - Fixed on left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-24 z-40 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition lg:hidden"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:shadow-lg`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 pt-12 lg:pt-6">
          {/* User Profile */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <h3 className="font-semibold text-lg text-gray-800">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats?.totalBooksUploaded || 0}</p>
              <p className="text-xs text-gray-600">Uploaded</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{stats?.totalBorrowRequestsReceived || 0}</p>
              <p className="text-xs text-gray-600">Requests</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">{stats?.totalBorrowRequestsSent || 0}</p>
              <p className="text-xs text-gray-600">Sent</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-orange-600">{stats?.totalPurchasesMade || 0}</p>
              <p className="text-xs text-gray-600">Purchased</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Upload Button */}
          <div className="mt-6">
            <Link
              to="/upload"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Book
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarProfile;
