import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import MapComponent from '@/components/molecules/MapComponent'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import SearchBar from '@/components/molecules/SearchBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'

const MapPage = () => {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showFilters, setShowFilters] = useState(false)

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

  useEffect(() => {
    applyFilters()
  }, [properties, filters])

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError('')
      const allProperties = await propertyService.getAll()
      setProperties(allProperties)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let results = [...properties]

    if (filters.city) {
      results = results.filter(p => 
        p.location?.city?.toLowerCase().includes(filters.city.toLowerCase()) ||
        p.location?.area?.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.propertyType) {
      results = results.filter(p => p.type === filters.propertyType)
    }

    if (filters.priceMin) {
      results = results.filter(p => p.price >= parseInt(filters.priceMin))
    }

    if (filters.priceMax) {
      results = results.filter(p => p.price <= parseInt(filters.priceMax))
    }

    if (filters.areaMin) {
      results = results.filter(p => p.area >= parseInt(filters.areaMin))
    }

    if (filters.areaMax) {
      results = results.filter(p => p.area <= parseInt(filters.areaMax))
    }

    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter(p => 
        filters.amenities.some(amenity => p.amenities?.includes(amenity))
      )
    }

    setFilteredProperties(results)
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
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar variant="compact" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar variant="compact" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadProperties} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar variant="compact" />
        </div>
      </div>

      <div className="relative">
        {/* Filter Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          showFilters ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none lg:border-r lg:border-gray-200`}>
          <div className="h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <ApperIcon name="X" size={16} />
              </Button>
            </div>
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Overlay for mobile */}
        {showFilters && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Main Map Content */}
        <div className="lg:ml-80">
          {/* Map Controls Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <ApperIcon name="Filter" size={16} />
                  <span>Filters</span>
                </Button>
                
                <div className="hidden lg:block">
                  <h1 className="text-xl font-bold text-gray-900">
                    Property Map View
                  </h1>
                  <p className="text-sm text-gray-600">
                    {filteredProperties.length} of {properties.length} properties shown
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <ApperIcon name="MapPin" size={16} />
                  <span>{filteredProperties.length} properties</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadProperties}
                >
                  <ApperIcon name="RefreshCw" size={16} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative">
            <MapComponent
              properties={filteredProperties}
              height="calc(100vh - 180px)"
              center={[31.5204, 74.3587]} // Pakistan center
              zoom={6}
              showControls={true}
              className="w-full"
            />

            {/* Map Stats */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">
                    {filteredProperties.filter(p => p.featured).length} Featured
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">
                    {filteredProperties.filter(p => !p.featured).length} Regular
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage