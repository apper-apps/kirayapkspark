import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'

const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-primary transition-all duration-200 ${className}`}
    >
      <span className="text-lg">
        {language === 'en' ? '🇬🇧' : '🇵🇰'}
      </span>
      <span className="font-medium text-gray-700">
        {language === 'en' ? 'EN' : 'اردو'}
      </span>
    </motion.button>
  )
}

export default LanguageToggle