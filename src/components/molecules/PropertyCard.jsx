import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const PropertyCard = ({ property, className = '' }) => {
  const { t, language } = useLanguage()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const title = language === 'ur' ? property.title_ur : property.title_en
  const description = language === 'ur' ? property.description_ur : property.description_en

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`property-card bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div className="relative">
        <img
          src={property.images?.[0] || '/api/placeholder/400/250'}
          alt={title}
          className="w-full h-48 object-cover"
        />
        
        {property.featured && (
          <div className="absolute top-3 left-3">
            <span className="featured-badge px-2 py-1 rounded-full text-xs font-medium">
              {t('featured')}
            </span>
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
            <ApperIcon name="Heart" size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 flex-1">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <ApperIcon name="MapPin" size={16} className="mr-2" />
          <span className="text-sm">
            {property.location?.area}, {property.location?.city}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {property.bedrooms && (
              <div className="flex items-center">
                <ApperIcon name="Bed" size={16} className="mr-1" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <ApperIcon name="Bath" size={16} className="mr-1" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center">
              <ApperIcon name="Home" size={16} className="mr-1" />
              <span>{property.area} {t(property.areaUnit)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="price-badge px-3 py-1 rounded-lg text-lg font-bold">
              {formatPrice(property.price)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {t('perMonth')}
            </div>
          </div>
          
          <Link to={`/property/${property.Id}`}>
            <Button size="sm" className="text-sm">
              {t('viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default PropertyCard