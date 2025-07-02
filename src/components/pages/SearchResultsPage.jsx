import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import SearchBar from '@/components/molecules/SearchBar'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import PropertyCard from '@/components/molecules/PropertyCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'

const SearchResultsPage = () => {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    city: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    priceMin: searchParams.get('minPrice') || '',
    priceMax: searchParams.get('maxPrice') || '',
    areaMin: searchParams.get('areaMin') || '',
    areaMax: searchParams.get('areaMax') || '',
    amenities: []
  })

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError('')
      const results = await propertyService.search(filters)
      setProperties(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    
    // Update URL params
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value.length > 0) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','))
        } else {
          params.set(key, value)
        }
      }
    })
    setSearchParams(params)
    
    // Reload properties with new filters
    loadProperties()
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      city: '',
      propertyType: '',
      priceMin: '',
      priceMax: '',
      areaMin: '',
      areaMax: '',
      amenities: []
    }
    setFilters(clearedFilters)
    setSearchParams({})
    loadProperties()
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'area-large', label: 'Area: Largest First' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar variant="compact" />
        </div>
      </div>

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Search Results
                </h1>
                {!loading && (
                  <p className="text-gray-600">
                    {properties.length} properties found
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* Sort Dropdown */}
                <select className="form-input px-3 py-2 text-sm border border-gray-300 rounded-lg">
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ApperIcon name="Grid3X3" size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ApperIcon name="List" size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Content */}
            {loading && <Loading type={viewMode} />}

            {error && (
              <Error message={error} onRetry={loadProperties} />
            )}

            {!loading && !error && properties.length === 0 && (
              <Empty
                type="search"
                title={t('noResults')}
                message="Try adjusting your search criteria or browse all properties."
                actionText="Clear Filters"
                onAction={handleClearFilters}
              />
            )}

            {!loading && !error && properties.length > 0 && (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map(property => (
                      <PropertyCard key={property.Id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {properties.map(property => (
                      <div key={property.Id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-64 flex-shrink-0">
                            <img
                              src={property.images?.[0] || '/api/placeholder/300/200'}
                              alt={property.title_en}
                              className="w-full h-48 sm:h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                  {property.title_en}
                                </h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                  <ApperIcon name="MapPin" size={16} className="mr-2" />
                                  <span>{property.location?.area}, {property.location?.city}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                  {property.description_en}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <div className="price-badge px-3 py-1 rounded-lg text-lg font-bold mb-1">
                                  PKR {property.price?.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {t('perMonth')}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
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

                              <Button size="sm">
                                {t('viewDetails')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination could go here */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ApperIcon name="ChevronLeft" size={16} />
                      Previous
                    </Button>
                    <Button variant="primary" size="sm">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">
                      Next
                      <ApperIcon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage