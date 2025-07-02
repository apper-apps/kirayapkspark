import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import LanguageToggle from "@/components/molecules/LanguageToggle";

const Header = () => {
  const { t } = useLanguage()
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

const navigationItems = [
    { path: '/', label: t('home'), icon: 'Home' },
    { path: '/category/residential', label: t('residential'), icon: 'Building' },
    { path: '/category/commercial', label: t('commercial'), icon: 'Store' },
    { path: '/category/agricultural', label: t('agricultural'), icon: 'Wheat' },
    { path: '/search', label: t('search'), icon: 'Search' },
    { path: '/map', label: 'Map', icon: 'Map' }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-2">
              <ApperIcon name="Home" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-dark">KirayaPK</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Rental Directory</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                }`}
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
{/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user?.avatar || '/api/placeholder/32/32'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <ApperIcon name="User" size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/my-properties"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <ApperIcon name="Home" size={16} />
                      <span>My Properties</span>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <ApperIcon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <ApperIcon name="LogIn" size={16} />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    <ApperIcon name="UserPlus" size={16} />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
>
                  <ApperIcon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
              {/* Mobile Auth Section */}
              {!isAuthenticated && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <ApperIcon name="LogIn" size={18} />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-white"
                  >
                    <ApperIcon name="UserPlus" size={18} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
</nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header