import React, { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters, className = '' }) => {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

const cities = [
    { value: 'karachi', label: t('karachi') },
    { value: 'lahore', label: t('lahore') },
    { value: 'islamabad', label: t('islamabad') },
    { value: 'rawalpindi', label: t('rawalpindi') },
    { value: 'faisalabad', label: t('faisalabad') },
    { value: 'multan', label: t('multan') },
    { value: 'peshawar', label: 'Peshawar' },
    { value: 'quetta', label: 'Quetta' },
    { value: 'sialkot', label: 'Sialkot' },
    { value: 'gujranwala', label: 'Gujranwala' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'bahawalpur', label: 'Bahawalpur' },
    { value: 'sargodha', label: 'Sargodha' },
    { value: 'sukkur', label: 'Sukkur' },
    { value: 'larkana', label: 'Larkana' },
    { value: 'sheikhupura', label: 'Sheikhupura' },
    { value: 'jhang', label: 'Jhang' },
    { value: 'rahimyarkhan', label: 'Rahim Yar Khan' },
    { value: 'gujrat', label: 'Gujrat' },
    { value: 'kasur', label: 'Kasur' },
    { value: 'mardan', label: 'Mardan' },
    { value: 'mingora', label: 'Mingora' },
    { value: 'nawabshah', label: 'Nawabshah' },
    { value: 'sahiwal', label: 'Sahiwal' },
    { value: 'mirpurkhas', label: 'Mirpur Khas' },
    { value: 'okara', label: 'Okara' },
    { value: 'chiniot', label: 'Chiniot' },
    { value: 'kamoke', label: 'Kamoke' },
    { value: 'mandi-bahauddin', label: 'Mandi Bahauddin' },
    { value: 'jhelum', label: 'Jhelum' },
    { value: 'sadiqabad', label: 'Sadiqabad' },
    { value: 'jacobabad', label: 'Jacobabad' },
    { value: 'shikarpur', label: 'Shikarpur' },
    { value: 'khanewal', label: 'Khanewal' },
    { value: 'hafizabad', label: 'Hafizabad' },
    { value: 'kohat', label: 'Kohat' },
    { value: 'muzaffargarh', label: 'Muzaffargarh' },
    { value: 'khanpur', label: 'Khanpur' },
    { value: 'gojra', label: 'Gojra' },
    { value: 'bahawalnagar', label: 'Bahawalnagar' },
    { value: 'muridke', label: 'Muridke' },
    { value: 'pakpattan', label: 'Pakpattan' },
    { value: 'abottabad', label: 'Abbottabad' },
    { value: 'tando-adam', label: 'Tando Adam' },
    { value: 'jaranwala', label: 'Jaranwala' },
    { value: 'kharian', label: 'Kharian' },
    { value: 'pattoki', label: 'Pattoki' },
    { value: 'bhalwal', label: 'Bhalwal' },
    { value: 'ahmadpur-east', label: 'Ahmadpur East' },
    { value: 'vihari', label: 'Vihari' },
    { value: 'kot-addu', label: 'Kot Addu' },
    { value: 'wah-cantonment', label: 'Wah Cantonment' },
    { value: 'dera-ghazi-khan', label: 'Dera Ghazi Khan' },
    { value: 'bannu', label: 'Bannu' },
    { value: 'swabi', label: 'Swabi' },
    { value: 'nowshera', label: 'Nowshera' },
    { value: 'charsadda', label: 'Charsadda' },
    { value: 'mansehra', label: 'Mansehra' },
    { value: 'karak', label: 'Karak' },
    { value: 'hangu', label: 'Hangu' },
    { value: 'lakki-marwat', label: 'Lakki Marwat' },
    { value: 'tank', label: 'Tank' },
    { value: 'haripur', label: 'Haripur' },
    { value: 'attock', label: 'Attock' },
    { value: 'taxila', label: 'Taxila' },
    { value: 'chakwal', label: 'Chakwal' },
    { value: 'talagang', label: 'Talagang' },
    { value: 'mianwali', label: 'Mianwali' },
    { value: 'khushab', label: 'Khushab' },
    { value: 'bhakkar', label: 'Bhakkar' },
    { value: 'layyah', label: 'Layyah' },
    { value: 'dera-ismail-khan', label: 'Dera Ismail Khan' },
    { value: 'zhob', label: 'Zhob' },
    { value: 'loralai', label: 'Loralai' },
    { value: 'ziarat', label: 'Ziarat' },
    { value: 'pishin', label: 'Pishin' },
    { value: 'chaman', label: 'Chaman' },
    { value: 'turbat', label: 'Turbat' },
    { value: 'gwadar', label: 'Gwadar' },
    { value: 'khuzdar', label: 'Khuzdar' },
    { value: 'hub', label: 'Hub' },
    { value: 'lasbela', label: 'Lasbela' },
    { value: 'kalat', label: 'Kalat' },
    { value: 'mastung', label: 'Mastung' },
    { value: 'sibi', label: 'Sibi' },
    { value: 'nasirabad', label: 'Nasirabad' },
    { value: 'jaffarabad', label: 'Jaffarabad' },
    { value: 'usta-mohammad', label: 'Usta Mohammad' },
    { value: 'dera-murad-jamali', label: 'Dera Murad Jamali' },
    { value: 'bolan', label: 'Bolan' },
    { value: 'kachhi', label: 'Kachhi' },
    { value: 'kohlu', label: 'Kohlu' },
    { value: 'dera-bugti', label: 'Dera Bugti' },
    { value: 'sui', label: 'Sui' },
    { value: 'panjgur', label: 'Panjgur' },
    { value: 'kech', label: 'Kech' },
    { value: 'awaran', label: 'Awaran' },
    { value: 'washuk', label: 'Washuk' },
    { value: 'chagai', label: 'Chagai' },
    { value: 'nushki', label: 'Nushki' },
    { value: 'kharan', label: 'Kharan' },
    { value: 'harnai', label: 'Harnai' },
    { value: 'sherani', label: 'Sherani' },
    { value: 'musakhel', label: 'Musakhel' },
    { value: 'barkhan', label: 'Barkhan' },
    { value: 'killa-saifullah', label: 'Killa Saifullah' },
    { value: 'killa-abdullah', label: 'Killa Abdullah' }
  ]

  const propertyTypes = [
    { value: 'residential', label: t('residential') },
    { value: 'commercial', label: t('commercial') },
    { value: 'agricultural', label: t('agricultural') }
  ]

  const amenitiesList = [
    'parking', 'garden', 'security', 'generator', 'gym', 'pool', 'internet'
  ]

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const handleAmenityToggle = (amenity) => {
    const currentAmenities = filters.amenities || []
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity]
    
    handleFilterChange('amenities', newAmenities)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-gray-900">{t('filter')}</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="text-primary hover:bg-primary/10"
        >
          {t('clearAll')}
        </Button>
      </div>

      <div>
        <Select
          label={t('location')}
          options={cities}
          value={filters.city || ''}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          placeholder={`${t('location')}...`}
        />
      </div>

      <div>
        <Select
          label={t('propertyType')}
          options={propertyTypes}
          value={filters.propertyType || ''}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          placeholder={`${t('propertyType')}...`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('priceRange')} (PKR)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Min"
            type="number"
            value={filters.priceMin || ''}
            onChange={(e) => handleFilterChange('priceMin', e.target.value)}
          />
          <Input
            placeholder="Max"
            type="number"
            value={filters.priceMax || ''}
            onChange={(e) => handleFilterChange('priceMax', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('area')}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Min"
            type="number"
            value={filters.areaMin || ''}
            onChange={(e) => handleFilterChange('areaMin', e.target.value)}
          />
          <Input
            placeholder="Max"
            type="number"
            value={filters.areaMax || ''}
            onChange={(e) => handleFilterChange('areaMax', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('amenities')}
        </label>
        <div className="space-y-2">
          {amenitiesList.map(amenity => (
            <label key={amenity} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={(filters.amenities || []).includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700 capitalize">
                {t(amenity)}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <span>{t('filter')}</span>
          <ApperIcon name={isOpen ? "ChevronUp" : "ChevronDown"} size={20} />
        </Button>
      </div>

      {/* Mobile Filter Panel */}
      {isOpen && (
        <div className="lg:hidden bg-white rounded-lg shadow-lg p-6 mb-6">
          <FilterContent />
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <div className={`hidden lg:block bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <FilterContent />
      </div>
    </>
  )
}

export default FilterSidebar