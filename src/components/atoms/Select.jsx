import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select option',
  error,
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`form-input w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 appearance-none bg-white ${
            error ? 'border-error' : 'border-gray-200'
          } ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          size={20} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        />
      </div>
      {error && (
        <p className="text-error text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default Select