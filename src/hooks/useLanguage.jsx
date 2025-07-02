import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.setAttribute('dir', language === 'ur' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en')
  }

  const t = (key) => {
    const translations = {
      // Navigation
      home: { en: 'Home', ur: 'ہوم' },
      residential: { en: 'Residential', ur: 'رہائشی' },
      commercial: { en: 'Commercial', ur: 'تجارتی' },
      agricultural: { en: 'Agricultural', ur: 'زرعی' },
      search: { en: 'Search', ur: 'تلاش' },
      
      // Search & Filters
      searchProperties: { en: 'Search Properties', ur: 'پراپرٹی تلاش کریں' },
      location: { en: 'Location', ur: 'مقام' },
      propertyType: { en: 'Property Type', ur: 'پراپرٹی کی قسم' },
      priceRange: { en: 'Price Range', ur: 'قیمت کی حد' },
      area: { en: 'Area', ur: 'رقبہ' },
      amenities: { en: 'Amenities', ur: 'سہولات' },
      filter: { en: 'Filter', ur: 'فلٹر' },
      clearAll: { en: 'Clear All', ur: 'تمام صاف کریں' },
      
      // Property Details
      price: { en: 'Price', ur: 'قیمت' },
      perMonth: { en: 'per month', ur: 'ماہانہ' },
      sqft: { en: 'sq ft', ur: 'مربع فٹ' },
      marla: { en: 'Marla', ur: 'مرلہ' },
      kanal: { en: 'Kanal', ur: 'کنال' },
      bedrooms: { en: 'Bedrooms', ur: 'بیڈروم' },
      bathrooms: { en: 'Bathrooms', ur: 'باتھروم' },
      parking: { en: 'Parking', ur: 'پارکنگ' },
      contact: { en: 'Contact', ur: 'رابطہ' },
      viewDetails: { en: 'View Details', ur: 'تفصیلات دیکھیں' },
      
      // Common
      featured: { en: 'Featured', ur: 'نمایاں' },
      new: { en: 'New', ur: 'نیا' },
      loading: { en: 'Loading...', ur: 'لوڈ ہو رہا ہے...' },
      noResults: { en: 'No properties found', ur: 'کوئی پراپرٹی نہیں ملی' },
      error: { en: 'Something went wrong', ur: 'کچھ غلط ہوا' },
      tryAgain: { en: 'Try Again', ur: 'دوبارہ کوشش کریں' },
      
      // Cities
      karachi: { en: 'Karachi', ur: 'کراچی' },
      lahore: { en: 'Lahore', ur: 'لاہور' },
      islamabad: { en: 'Islamabad', ur: 'اسلام آباد' },
      rawalpindi: { en: 'Rawalpindi', ur: 'راولپنڈی' },
      faisalabad: { en: 'Faisalabad', ur: 'فیصل آباد' },
      multan: { en: 'Multan', ur: 'ملتان' },
      
      // Homepage
      findYourPerfectRental: { en: 'Find Your Perfect Rental Property', ur: 'اپنی بہترین کرایے کی پراپرٹی تلاش کریں' },
      searchThousands: { en: 'Search thousands of properties across Pakistan', ur: 'پاکستان بھر میں ہزاروں پراپرٹیز تلاش کریں' },
      popularCities: { en: 'Popular Cities', ur: 'مشہور شہر' },
      featuredProperties: { en: 'Featured Properties', ur: 'نمایاں پراپرٹیز' },
      
      // Contact Form
      name: { en: 'Name', ur: 'نام' },
      phone: { en: 'Phone', ur: 'فون' },
      email: { en: 'Email', ur: 'ای میل' },
      message: { en: 'Message', ur: 'پیغام' },
      sendMessage: { en: 'Send Message', ur: 'پیغام بھیجیں' },
      
      // Amenities
      garden: { en: 'Garden', ur: 'باغ' },
      security: { en: 'Security', ur: 'سیکیورٹی' },
      generator: { en: 'Generator', ur: 'جنریٹر' },
      gym: { en: 'Gym', ur: 'جم' },
      pool: { en: 'Swimming Pool', ur: 'سوئمنگ پول' },
      internet: { en: 'Internet', ur: 'انٹرنیٹ' },
    }

    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}