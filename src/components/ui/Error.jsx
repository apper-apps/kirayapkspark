import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message, onRetry }) => {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="bg-gradient-to-br from-error to-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t('error')}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <ApperIcon name="RefreshCw" size={18} />
            <span>{t('tryAgain')}</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Error