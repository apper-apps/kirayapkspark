import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import SearchBar from '@/components/molecules/SearchBar'
import PropertyCard from '@/components/molecules/PropertyCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'

const HomePage = () => {
  const { t } = useLanguage()
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadFeaturedProperties()
  }, [])

  const loadFeaturedProperties = async () => {
    try {
      setLoading(true)
      setError('')
      const properties = await propertyService.getFeatured()
      setFeaturedProperties(properties)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    {
      type: 'residential',
      title: t('residential'),
      description: 'Houses, Apartments, Flats',
      icon: 'Building',
      color: 'from-blue-500 to-blue-600',
      image: '/api/placeholder/400/250'
    },
    {
      type: 'commercial',
      title: t('commercial'),
      description: 'Offices, Shops, Warehouses',
      icon: 'Store',
      color: 'from-green-500 to-green-600',
      image: '/api/placeholder/400/250'
    },
    {
      type: 'agricultural',
      title: t('agricultural'),
      description: 'Farmland, Orchards, Livestock',
      icon: 'Wheat',
      color: 'from-orange-500 to-orange-600',
      image: '/api/placeholder/400/250'
    }
  ]

  const popularCities = [
    { name: t('karachi'), slug: 'karachi', properties: '12,500+' },
    { name: t('lahore'), slug: 'lahore', properties: '8,200+' },
    { name: t('islamabad'), slug: 'islamabad', properties: '5,800+' },
    { name: t('rawalpindi'), slug: 'rawalpindi', properties: '4,100+' },
    { name: t('faisalabad'), slug: 'faisalabad', properties: '3,600+' },
    { name: t('multan'), slug: 'multan', properties: '2,900+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-green-800 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t('findYourPerfectRental')}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('searchThousands')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SearchBar className="max-w-4xl mx-auto" />
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-white/5 rounded-full"></div>
      </section>

      {/* Property Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect rental property that matches your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/category/${category.type}`}>
                  <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
                        <ApperIcon name={category.icon} size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-white/90 text-center">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('popularCities')}
            </h2>
            <p className="text-gray-600">
              Explore rental properties in Pakistan's major cities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCities.map((city, index) => (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/search?location=${city.slug}`}>
                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {city.name}
                        </h3>
                        <p className="text-primary font-medium">
                          {city.properties} properties
                        </p>
                      </div>
                      <div className="bg-primary/10 rounded-full p-3">
                        <ApperIcon name="MapPin" size={24} className="text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('featuredProperties')}
              </h2>
              <p className="text-gray-600">
                Hand-picked premium properties for you
              </p>
            </div>
            <Link to="/search">
              <Button variant="outline">
                View All Properties
                <ApperIcon name="ArrowRight" size={16} />
              </Button>
            </Link>
          </div>

          {loading && <Loading />}

          {error && (
            <Error message={error} onRetry={loadFeaturedProperties} />
          )}

          {!loading && !error && featuredProperties.length === 0 && (
            <Empty
              title="No Featured Properties"
              message="Check back soon for our latest featured listings."
              actionText="Browse All Properties"
              onAction={() => window.location.href = '/search'}
            />
          )}

          {!loading && !error && featuredProperties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property, index) => (
                <motion.div
                  key={property.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of satisfied customers who found their perfect rental through KirayaPK
          </p>
          <Link to="/search">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Start Your Search
              <ApperIcon name="Search" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage