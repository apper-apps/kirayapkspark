import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import LanguageToggle from '@/components/molecules/LanguageToggle'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const { t } = useLanguage()

  const quickLinks = [
    { path: '/', label: t('home') },
    { path: '/category/residential', label: t('residential') },
    { path: '/category/commercial', label: t('commercial') },
    { path: '/category/agricultural', label: t('agricultural') }
  ]

  const cities = [
    { path: '/search?location=karachi', label: t('karachi') },
    { path: '/search?location=lahore', label: t('lahore') },
    { path: '/search?location=islamabad', label: t('islamabad') },
    { path: '/search?location=rawalpindi', label: t('rawalpindi') },
    { path: '/search?location=faisalabad', label: t('faisalabad') },
    { path: '/search?location=multan', label: t('multan') }
  ]

  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white rounded-lg p-2">
                <ApperIcon name="Home" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KirayaPK</h3>
                <p className="text-sm text-gray-300">Rental Directory</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Pakistan's leading rental property platform connecting property seekers with landlords across the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <ApperIcon name="Instagram" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="font-semibold mb-4">{t('popularCities')}</h4>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.path}>
                  <Link
                    to={city.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Language */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Mail" size={16} />
                <span>info@kirayapk.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Phone" size={16} />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="MapPin" size={16} />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
            <div className="mt-4">
              <LanguageToggle className="bg-white/10 border-white/20 hover:bg-white/20" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 KirayaPK. All rights reserved. | Connecting Pakistan's Rental Market
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer