import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Select from 'react-select'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { propertyService } from '@/services/api/propertyService'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Loading from '@/components/ui/Loading'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const AddPropertyPage = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [cities, setCities] = useState([])
  const [loadingCities, setLoadingCities] = useState(true)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    subtype: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    furnished: '',
    location: {
      city: '',
      area: '',
      address: ''
    },
    amenities: [],
    images: []
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadCities()
  }, [])

  const loadCities = async () => {
    try {
      setLoadingCities(true)
      const cityList = await propertyService.getCities()
      setCities(cityList.map(city => ({ value: city, label: city })))
    } catch (err) {
      toast.error('Failed to load cities')
    } finally {
      setLoadingCities(false)
    }
  }

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleCityChange = (selectedOption) => {
    const cityValue = selectedOption ? selectedOption.value : ''
    handleInputChange('location.city', cityValue)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.type) newErrors.type = 'Property type is required'
    if (!formData.subtype) newErrors.subtype = 'Property subtype is required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required'
    if (!formData.area || formData.area <= 0) newErrors.area = 'Valid area is required'
    if (!formData.bedrooms || formData.bedrooms < 0) newErrors.bedrooms = 'Number of bedrooms is required'
    if (!formData.bathrooms || formData.bathrooms < 0) newErrors.bathrooms = 'Number of bathrooms is required'
    if (!formData.furnished) newErrors.furnished = 'Furnished status is required'
    if (!formData.location.city.trim()) newErrors['location.city'] = 'City is required'
    if (!formData.location.area.trim()) newErrors['location.area'] = 'Area is required'
    if (!formData.location.address.trim()) newErrors['location.address'] = 'Address is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    try {
      setLoading(true)
      
      const propertyData = {
        ...formData,
        price: parseInt(formData.price),
        area: parseInt(formData.area),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        ownerId: user.Id,
        featured: false,
        status: 'active'
      }

      await propertyService.create(propertyData)
      toast.success('Property added successfully!')
      navigate('/my-properties')
    } catch (err) {
      toast.error(err.message || 'Failed to add property')
    } finally {
      setLoading(false)
    }
  }

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'flat', label: 'Flat' },
    { value: 'villa', label: 'Villa' },
    { value: 'commercial', label: 'Commercial' }
  ]

  const subtypes = {
    house: [
      { value: 'single_family', label: 'Single Family' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'duplex', label: 'Duplex' }
    ],
    apartment: [
      { value: 'studio', label: 'Studio' },
      { value: '1_bedroom', label: '1 Bedroom' },
      { value: '2_bedroom', label: '2 Bedroom' },
      { value: '3_bedroom', label: '3 Bedroom' },
      { value: '4_bedroom', label: '4+ Bedroom' }
    ],
    flat: [
      { value: 'studio', label: 'Studio' },
      { value: '1_bedroom', label: '1 Bedroom' },
      { value: '2_bedroom', label: '2 Bedroom' },
      { value: '3_bedroom', label: '3 Bedroom' }
    ],
    villa: [
      { value: 'luxury', label: 'Luxury Villa' },
      { value: 'standard', label: 'Standard Villa' }
    ],
    commercial: [
      { value: 'office', label: 'Office' },
      { value: 'shop', label: 'Shop' },
      { value: 'warehouse', label: 'Warehouse' }
    ]
  }

  const furnishedOptions = [
    { value: 'furnished', label: 'Furnished' },
    { value: 'semi_furnished', label: 'Semi Furnished' },
    { value: 'unfurnished', label: 'Unfurnished' }
  ]

  const citySelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '48px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af'
    })
  }

  if (loadingCities) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Add New Property
              </h1>
              <p className="text-gray-600">
                Fill in the details below to list your property for rent
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/my-properties')}
            >
              <ApperIcon name="ArrowLeft" size={18} />
              <span>Back to Properties</span>
            </Button>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    label="Property Title"
                    type="text"
                    placeholder="e.g., Beautiful 3 Bedroom House in DHA"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    error={errors.title}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your property, its features, and nearby amenities..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.type ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.type}
                    onChange={(e) => {
                      handleInputChange('type', e.target.value)
                      handleInputChange('subtype', '') // Reset subtype when type changes
                    }}
                  >
                    <option value="">Select Property Type</option>
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Subtype
                  </label>
                  <select
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.subtype ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.subtype}
                    onChange={(e) => handleInputChange('subtype', e.target.value)}
                    disabled={!formData.type}
                  >
                    <option value="">Select Subtype</option>
                    {formData.type && subtypes[formData.type]?.map(subtype => (
                      <option key={subtype.value} value={subtype.value}>
                        {subtype.label}
                      </option>
                    ))}
                  </select>
                  {errors.subtype && (
                    <p className="mt-1 text-sm text-red-600">{errors.subtype}</p>
                  )}
                </div>

                <Input
                  label="Monthly Rent (PKR)"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  error={errors.price}
                  required
                />

                <Input
                  label="Area (Sq Ft)"
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  error={errors.area}
                  required
                />

                <Input
                  label="Bedrooms"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  error={errors.bedrooms}
                  required
                />

                <Input
                  label="Bathrooms"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  error={errors.bathrooms}
                  required
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furnished Status
                  </label>
                  <select
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.furnished ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.furnished}
                    onChange={(e) => handleInputChange('furnished', e.target.value)}
                  >
                    <option value="">Select Furnished Status</option>
                    {furnishedOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.furnished && (
                    <p className="mt-1 text-sm text-red-600">{errors.furnished}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Select
                    options={cities}
                    value={cities.find(city => city.value === formData.location.city) || null}
                    onChange={handleCityChange}
                    placeholder="Select or type a city..."
                    isSearchable
                    isClearable
                    styles={citySelectStyles}
                    noOptionsMessage={() => "Type to add a new city"}
                    formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                    isValidNewOption={(inputValue) => inputValue.trim().length > 0}
                    onCreateOption={(inputValue) => {
                      const newCity = { value: inputValue.trim(), label: inputValue.trim() }
                      setCities(prev => [...prev, newCity])
                      handleInputChange('location.city', inputValue.trim())
                    }}
                    components={{
                      DropdownIndicator: () => (
                        <div className="px-2">
                          <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
                        </div>
                      )
                    }}
                  />
                  {errors['location.city'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['location.city']}</p>
                  )}
                </div>

                <Input
                  label="Area/Locality"
                  type="text"
                  placeholder="e.g., DHA Phase 5, Gulberg"
                  value={formData.location.area}
                  onChange={(e) => handleInputChange('location.area', e.target.value)}
                  error={errors['location.area']}
                  required
                />

                <div className="md:col-span-2">
                  <Input
                    label="Complete Address"
                    type="text"
                    placeholder="e.g., House # 123, Street 4, DHA Phase 5"
                    value={formData.location.address}
                    onChange={(e) => handleInputChange('location.address', e.target.value)}
                    error={errors['location.address']}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/my-properties')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" size={18} className="animate-spin" />
                    <span>Adding Property...</span>
                  </>
                ) : (
                  <>
                    <ApperIcon name="Plus" size={18} />
                    <span>Add Property</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AddPropertyPage