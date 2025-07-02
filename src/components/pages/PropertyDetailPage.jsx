import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'
import { toast } from 'react-toastify'

const PropertyDetailPage = () => {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    loadProperty()
  }, [id])

  const loadProperty = async () => {
    try {
      setLoading(true)
      setError('')
      const propertyData = await propertyService.getById(parseInt(id))
      setProperty(propertyData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent successfully! The property owner will contact you soon.')
    setShowContactForm(false)
    setContactForm({ name: '', phone: '', email: '', message: '' })
  }

  const handleContactFormChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading type="property-detail" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadProperty} />
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message="Property not found" />
        </div>
      </div>
    )
  }

  const title = language === 'ur' ? property.title_ur : property.title_en
  const description = language === 'ur' ? property.description_ur : property.description_en

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ApperIcon name="ChevronRight" size={16} />
            <Link to="/search" className="hover:text-primary">Search</Link>
            <ApperIcon name="ChevronRight" size={16} />
            <span className="text-gray-900 font-medium">{title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={property.images?.[selectedImageIndex] || '/api/placeholder/800/500'}
                  alt={title}
                  className="w-full h-96 object-cover"
                />
                
                {property.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="featured-badge px-3 py-1 rounded-full text-sm font-medium">
                      {t('featured')}
                    </span>
                  </div>
                )}

                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors">
                  <ApperIcon name="Heart" size={20} className="text-gray-600" />
                </button>

                {/* Image Navigation */}
                {property.images?.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => 
                        prev === 0 ? property.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <ApperIcon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => 
                        prev === property.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <ApperIcon name="ChevronRight" size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {property.images?.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index 
                            ? 'border-primary' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ApperIcon name="Home" size={24} className="mx-auto text-primary mb-2" />
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="font-semibold">{property.area} {t(property.areaUnit)}</p>
                </div>

                {property.bedrooms && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <ApperIcon name="Bed" size={24} className="mx-auto text-primary mb-2" />
                    <p className="text-sm text-gray-600">{t('bedrooms')}</p>
                    <p className="font-semibold">{property.bedrooms}</p>
                  </div>
                )}

                {property.bathrooms && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <ApperIcon name="Bath" size={24} className="mx-auto text-primary mb-2" />
                    <p className="text-sm text-gray-600">{t('bathrooms')}</p>
                    <p className="font-semibold">{property.bathrooms}</p>
                  </div>
                )}

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ApperIcon name="Car" size={24} className="mx-auto text-primary mb-2" />
                  <p className="text-sm text-gray-600">{t('parking')}</p>
                  <p className="font-semibold">{property.parking || 'Available'}</p>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('amenities')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <ApperIcon name="Check" size={16} className="text-primary" />
                        <span className="text-sm text-gray-700 capitalize">{t(amenity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Contact Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="price-badge text-2xl font-bold px-4 py-2 rounded-lg inline-block mb-2">
                  {formatPrice(property.price)}
                </div>
                <p className="text-gray-600">{t('perMonth')}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium capitalize">{t(property.type)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{property.location?.city}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium">{property.location?.area}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full"
                  onClick={() => setShowContactForm(true)}
                >
                  <ApperIcon name="MessageCircle" size={18} />
                  <span>{t('contact')} Owner</span>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <ApperIcon name="Phone" size={18} />
                  <span>Call Now</span>
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary rounded-full p-2">
                    <ApperIcon name="User" size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {property.contactInfo?.name || 'Property Owner'}
                    </p>
                    <p className="text-sm text-gray-600">Verified Agent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="MapPin" size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{property.location?.area}</p>
                    <p className="text-sm text-gray-600">{property.location?.city}</p>
                    <p className="text-sm text-gray-600">{property.location?.address}</p>
                  </div>
                </div>
              </div>
              
              {/* Map placeholder */}
              <div className="mt-4 bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <ApperIcon name="Map" size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Interactive map</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Contact Property Owner</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <Input
                label={t('name')}
                value={contactForm.name}
                onChange={(e) => handleContactFormChange('name', e.target.value)}
                required
              />
              
              <Input
                label={t('phone')}
                type="tel"
                value={contactForm.phone}
                onChange={(e) => handleContactFormChange('phone', e.target.value)}
                required
              />
              
              <Input
                label={t('email')}
                type="email"
                value={contactForm.email}
                onChange={(e) => handleContactFormChange('email', e.target.value)}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('message')}
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => handleContactFormChange('message', e.target.value)}
                  className="form-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none resize-none"
                  rows={4}
                  placeholder="I'm interested in this property..."
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {t('sendMessage')}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetailPage