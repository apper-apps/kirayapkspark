import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import SearchBar from '@/components/molecules/SearchBar'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import PropertyCard from '@/components/molecules/PropertyCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'

const CategoryPage = () => {
  const { type } = useParams()
  const { t } = useLanguage()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    city: '',
    propertyType: type,
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    amenities: []
  })

  useEffect(() => {
    loadProperties()
  }, [type])

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError('')
      const results = await propertyService.getByType(type)
      setProperties(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    loadProperties()
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      city: '',
      propertyType: type,
      priceMin: '',
      priceMax: '',
      areaMin: '',
      areaMax: '',
      amenities: []
    }
    setFilters(clearedFilters)
    loadProperties()
  }

const getCategoryInfo = () => {
    switch (type) {
      case 'residential':
        return {
          title: t('residential'),
          description: 'Find your perfect home with our residential rental properties across Pakistan',
          icon: 'Building',
          color: 'from-blue-500 to-blue-600',
          subcategories: ['House', 'Apartment', 'Villa', 'Studio', 'Flat', 'Room'],
          features: ['Furnished Options', 'Family-Friendly', 'Security', 'Modern Amenities']
        }
      case 'commercial':
        return {
          title: t('commercial'),
          description: 'Discover prime commercial rental spaces for your business needs',
          icon: 'Store',
          color: 'from-green-500 to-green-600',
          subcategories: ['Office', 'Shop', 'Warehouse', 'Factory', 'Showroom', 'Plaza'],
          features: ['High Foot Traffic', 'Business Ready', 'Flexible Terms', 'Prime Locations']
        }
      case 'agricultural':
        return {
          title: t('agricultural'),
          description: 'Explore agricultural rental lands and farming opportunities',
          icon: 'Wheat',
          color: 'from-orange-500 to-orange-600',
          subcategories: ['Farmland', 'Orchard', 'Livestock Farm', 'Poultry Farm', 'Dairy Farm', 'Greenhouse'],
          features: ['Fertile Soil', 'Water Access', 'Modern Equipment', 'Transportation']
        }
      default:
        return {
          title: 'Rental Properties',
          description: 'Browse available rental properties across Pakistan',
          icon: 'Home',
          color: 'from-gray-500 to-gray-600',
          subcategories: [],
          features: []
        }
    }
  }

  const categoryInfo = getCategoryInfo()

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <div className={`bg-gradient-to-r ${categoryInfo.color} py-16 px-4`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ApperIcon name={categoryInfo.icon} size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {categoryInfo.title} Properties
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            {categoryInfo.description}
          </p>
          
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center space-x-2 text-white/80 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            <ApperIcon name="ChevronRight" size={16} />
            <span className="text-white font-medium">{categoryInfo.title}</span>
          </nav>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar variant="compact" />
        </div>
      </div>

      {/* Subcategories */}
      {categoryInfo.subcategories.length > 0 && (
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 overflow-x-auto">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Browse by type:
              </span>
              {categoryInfo.subcategories.map((subcat) => (
                <button
                  key={subcat}
                  className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {subcat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {categoryInfo.title} Properties
                </h2>
                {!loading && (
                  <p className="text-gray-600">
                    {properties.length} properties available
                  </p>
                )}
              </div>

              {/* Sort Options */}
              <select className="form-input px-3 py-2 text-sm border border-gray-300 rounded-lg">
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area-large">Area: Largest First</option>
              </select>
            </div>

            {/* Results Content */}
            {loading && <Loading />}

            {error && (
              <Error message={error} onRetry={loadProperties} />
            )}

            {!loading && !error && properties.length === 0 && (
              <Empty
                title={`No ${categoryInfo.title} Properties Found`}
                message={`We don't have any ${categoryInfo.title.toLowerCase()} properties matching your criteria at the moment.`}
                actionText="Browse All Properties"
                onAction={() => window.location.href = '/search'}
              />
            )}

            {!loading && !error && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map(property => (
                  <PropertyCard key={property.Id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage