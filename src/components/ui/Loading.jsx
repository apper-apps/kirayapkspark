import React from 'react'

const Loading = ({ type = 'grid' }) => {
  if (type === 'property-detail') {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-lg h-96 mb-4"></div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-200 rounded h-16 w-16"></div>
              ))}
            </div>
          </div>
          
          {/* Property Info Skeleton */}
          <div className="space-y-4">
            <div className="bg-gray-200 h-8 rounded w-3/4"></div>
            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
            <div className="bg-gray-200 h-4 rounded w-full"></div>
            <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-200 h-4 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="animate-pulse bg-white rounded-lg p-4 shadow-sm">
            <div className="flex space-x-4">
              <div className="bg-gray-200 rounded-lg h-24 w-32 flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="bg-gray-200 h-5 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default grid skeleton
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-200 h-48"></div>
          <div className="p-4 space-y-3">
            <div className="bg-gray-200 h-5 rounded w-3/4"></div>
            <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            <div className="bg-gray-200 h-4 rounded w-full"></div>
            <div className="flex justify-between items-center">
              <div className="bg-gray-200 h-6 rounded w-20"></div>
              <div className="bg-gray-200 h-8 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading