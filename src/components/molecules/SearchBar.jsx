import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ variant = 'hero', className = '' }) => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: ''
  })

  const cities = [
    { value: 'karachi', label: t('karachi') },
    { value: 'lahore', label: t('lahore') },
    { value: 'islamabad', label: t('islamabad') },
    { value: 'rawalpindi', label: t('rawalpindi') },
    { value: 'faisalabad', label: t('faisalabad') },
    { value: 'multan', label: t('multan') }
  ]

  const propertyTypes = [
    { value: 'residential', label: t('residential') },
    { value: 'commercial', label: t('commercial') },
    { value: 'agricultural', label: t('agricultural') }
  ]

  const handleSearch = () => {
    const queryParams = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) queryParams.set(key, value)
    })
    navigate(`/search?${queryParams.toString()}`)
  }

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({ ...prev, [field]: value }))
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder={t('location')}
              value={searchParams.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Select
              options={propertyTypes}
              value={searchParams.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
              placeholder={t('propertyType')}
            />
          </div>
          <Button onClick={handleSearch} className="md:w-auto">
            <ApperIcon name="Search" size={20} />
            <span>{t('search')}</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-xl p-8 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <Select
            label={t('location')}
            options={cities}
            value={searchParams.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder={`${t('location')}...`}
          />
        </div>
        
        <div>
          <Select
            label={t('propertyType')}
            options={propertyTypes}
            value={searchParams.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            placeholder={`${t('propertyType')}...`}
          />
        </div>
        
        <div>
          <Input
            label={`${t('price')} (${t('perMonth')})`}
            type="number"
            placeholder="Min PKR"
            value={searchParams.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
          />
        </div>
        
        <div>
          <Input
            label=" "
            type="number"
            placeholder="Max PKR"
            value={searchParams.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleSearch}
          size="lg"
          className="px-12"
        >
          <ApperIcon name="Search" size={24} />
          <span>{t('searchProperties')}</span>
        </Button>
      </div>
    </div>
  )
}

export default SearchBar