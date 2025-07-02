import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { propertyService } from '@/services/api/propertyService'
import Button from '@/components/atoms/Button'
import PropertyCard from '@/components/molecules/PropertyCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const MyPropertiesPage = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    loadUserProperties()
  }, [])

  const loadUserProperties = async () => {
    try {
      setLoading(true)
      setError('')
      const userProperties = await propertyService.getUserProperties(user.Id)
      setProperties(userProperties)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProperty = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      await propertyService.delete(propertyId)
      setProperties(prev => prev.filter(p => p.Id !== propertyId))
      toast.success('Property deleted successfully!')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const getFilteredProperties = () => {
    switch (activeTab) {
      case 'active':
        return properties.filter(p => p.status === 'active')
      case 'inactive':
        return properties.filter(p => p.status === 'inactive')
      case 'featured':
        return properties.filter(p => p.featured)
      default:
        return properties
    }
  }

  const tabs = [
    { id: 'all', label: 'All Properties', count: properties.length },
    { id: 'active', label: 'Active', count: properties.filter(p => p.status === 'active').length },
    { id: 'inactive', label: 'Inactive', count: properties.filter(p => p.status === 'inactive').length },
    { id: 'featured', label: 'Featured', count: properties.filter(p => p.featured).length }
  ]

  const filteredProperties = getFilteredProperties()

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Properties
              </h1>
              <p className="text-gray-600">
                Manage your property listings and view performance analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={loadUserProperties}
              >
                <ApperIcon name="RefreshCw" size={18} />
                <span>Refresh</span>
              </Button>
              <Button>
                <ApperIcon name="Plus" size={18} />
                <span>Add Property</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-primary/10 rounded-lg p-3">
                <ApperIcon name="Home" size={24} className="text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
                <p className="text-gray-600">Total Properties</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3">
                <ApperIcon name="TrendingUp" size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {properties.filter(p => p.status === 'active').length}
                </p>
                <p className="text-gray-600">Active Listings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-lg p-3">
                <ApperIcon name="Star" size={24} className="text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {properties.filter(p => p.featured).length}
                </p>
                <p className="text-gray-600">Featured</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3">
                <ApperIcon name="Eye" size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-gray-600">Total Views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {loading && <Loading />}

            {error && (
              <Error message={error} onRetry={loadUserProperties} />
            )}

            {!loading && !error && filteredProperties.length === 0 && (
              <Empty
                title={`No ${activeTab === 'all' ? '' : activeTab} properties found`}
                message="Start by adding your first property listing to reach potential tenants."
                actionText="Add Your First Property"
                onAction={() => console.log('Add property')}
              />
            )}

            {!loading && !error && filteredProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <PropertyCard property={property} />
                    
                    {/* Property Actions Overlay */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex flex-col space-y-1">
                        <button
                          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-primary transition-colors"
                          title="Edit Property"
                        >
                          <ApperIcon name="Edit" size={16} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete Property"
                          onClick={() => handleDeleteProperty(property.Id)}
                        >
                          <ApperIcon name="Trash2" size={16} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-yellow-600 transition-colors"
                          title="Toggle Featured"
                        >
                          <ApperIcon name={property.featured ? "Star" : "Star"} size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPropertiesPage