// ============================================
// FILE: Navbar.jsx (Updated)
// ============================================
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse', path: '/browse' },
    { name: 'Upload', path: '/upload', protected: true },
    { name: 'Chat', path: '/chat', protected: true },
  ];

  const isActive = (path) => location.pathname === path;

  // Get user initials
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-circle">
            <span className="logo-text">BC</span>
          </div>
          <span className="logo-name">BookConnect</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          {navLinks.map((link) => {
            if (link.protected && !isAuthenticated) return null;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Auth Section */}
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="profile-dropdown-container" ref={dropdownRef}>
              {/* Profile Button */}
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="profile-button"
              >
                <div className="user-avatar">
                  <span>{getInitials(user?.name)}</span>
                </div>
                <span className="user-name-desktop">{user?.name}</span>
                <svg
                  className={`dropdown-arrow ${showProfileDropdown ? 'rotate' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="profile-dropdown-menu">
                  {/* User Info Section */}
                  <div className="dropdown-user-info">
                    <div className="dropdown-avatar">
                      {getInitials(user?.name)}
                    </div>
                    <div className="dropdown-user-details">
                      <p className="dropdown-username">{user?.name}</p>
                      <p className="dropdown-email">{user?.email}</p>
                      {user?.phone && (
                        <p className="dropdown-phone">{user.phone}</p>
                      )}
                      <span className="account-badge">
                        {user?.loginMethod === 'google' ? '🔗 Google Account' : '📧 Email Account'}
                      </span>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  {/* Menu Items */}
                  <Link
                    to="/profile"
                    className="dropdown-menu-item"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>

                  <Link
                    to="/my-books"
                    className="dropdown-menu-item"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    My Books
                  </Link>

                  <Link
                    to="/settings"
                    className="dropdown-menu-item"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>

                  <div className="dropdown-divider"></div>

                  <button
                    onClick={handleLogout}
                    className="dropdown-menu-item logout-item"
                  >
                    <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="signin-btn">
                Sign In
              </Link>
              <Link to="/register" className="signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => {
            if (link.protected && !isAuthenticated) return null;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}

          {isAuthenticated ? (
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <div className="mobile-avatar">
                  {getInitials(user?.name)}
                </div>
                <div className="mobile-user-details">
                  <span className="mobile-username">{user?.name}</span>
                  <span className="mobile-email">{user?.email}</span>
                </div>
              </div>

              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-menu-link"
              >
                👤 My Profile
              </Link>
              <Link
                to="/my-books"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-menu-link"
              >
                📚 My Books
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-menu-link"
              >
                ⚙️ Settings
              </Link>

              <button
                className="mobile-logout"
                onClick={handleLogout}
              >
                🚪 Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-signin"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;