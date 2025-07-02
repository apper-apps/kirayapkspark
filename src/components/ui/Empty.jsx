import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title, 
  message, 
  actionText, 
  onAction,
  icon = 'Search',
  type = 'search' 
}) => {
  const { t } = useLanguage()

  const getEmptyState = () => {
    switch (type) {
      case 'search':
        return {
          title: title || t('noResults'),
          message: message || 'Try adjusting your search criteria or browse all properties.',
          icon: 'Search',
          actionText: actionText || 'Browse All Properties'
        }
      case 'favorites':
        return {
          title: 'No Saved Properties',
          message: 'Start browsing and save properties you like to see them here.',
          icon: 'Heart',
          actionText: 'Start Browsing'
        }
      default:
        return {
          title: title || 'No Data Available',
          message: message || 'There is no data to display at this time.',
          icon: icon,
          actionText: actionText || 'Refresh'
        }
    }
  }

  const emptyState = getEmptyState()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={emptyState.icon} size={40} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {emptyState.title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {emptyState.message}
        </p>
        
        {onAction && (
          <button
            onClick={onAction}
            className="btn-primary text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <ApperIcon name="ArrowRight" size={18} />
            <span>{emptyState.actionText}</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Empty