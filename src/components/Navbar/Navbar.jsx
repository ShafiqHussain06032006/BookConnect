import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import './Navbar.css'; // 👈 external CSS file

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse', path: '/browse' },
    { name: 'Upload', path: '/upload', protected: true },
    { name: 'Chat', path: '/chat', protected: true },
  ];

  const isActive = (path) => location.pathname === path;

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

        {/* Auth Buttons */}
        <div className="auth-section">
          {isAuthenticated ? (
            <>
              <div className="user-info">
                <div className="user-icon">
                  <span>{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <span className="user-name">{user?.name}</span>
              </div>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
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
            <>
              <span className="mobile-username">{user?.name}</span>
              <button
                className="mobile-logout"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
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
