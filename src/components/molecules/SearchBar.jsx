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

  const rentalSubtypes = {
    residential: [
      { value: 'apartment', label: 'Apartment' },
      { value: 'house', label: 'House' },
      { value: 'villa', label: 'Villa' },
      { value: 'studio', label: 'Studio' },
      { value: 'flat', label: 'Flat' },
      { value: 'room', label: 'Room' }
    ],
    commercial: [
      { value: 'office', label: 'Office' },
      { value: 'shop', label: 'Shop' },
      { value: 'warehouse', label: 'Warehouse' },
      { value: 'factory', label: 'Factory' },
      { value: 'showroom', label: 'Showroom' },
      { value: 'plaza', label: 'Plaza' }
    ],
    agricultural: [
      { value: 'farmland', label: 'Farmland' },
      { value: 'orchard', label: 'Orchard' },
      { value: 'livestock', label: 'Livestock Farm' },
      { value: 'poultry', label: 'Poultry Farm' },
      { value: 'dairy', label: 'Dairy Farm' },
      { value: 'greenhouse', label: 'Greenhouse' }
    ]
  }

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