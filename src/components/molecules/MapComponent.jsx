import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom property marker icon
const createPropertyIcon = (type, featured) => {
  const getColor = () => {
    switch (type) {
      case 'residential': return featured ? '#3B82F6' : '#60A5FA'
      case 'commercial': return featured ? '#10B981' : '#34D399'
      case 'agricultural': return featured ? '#F59E0B' : '#FBBF24'
      default: return featured ? '#6B7280' : '#9CA3AF'
    }
  }

  return L.divIcon({
    html: `
      <div style="
        background-color: ${getColor()};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'custom-property-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

// Component to fit map bounds to markers
const FitBounds = ({ properties }) => {
  const map = useMap()

  useEffect(() => {
    if (properties && properties.length > 0) {
      const validProperties = properties.filter(p => p.location?.coordinates?.lat && p.location?.coordinates?.lng)
      
      if (validProperties.length > 0) {
        const bounds = L.latLngBounds(
          validProperties.map(p => [p.location.coordinates.lat, p.location.coordinates.lng])
        )
        map.fitBounds(bounds, { padding: [20, 20] })
      }
    }
  }, [map, properties])

  return null
}

const MapComponent = ({ 
  properties = [], 
  height = '400px', 
  center = [31.5204, 74.3587], // Lahore, Pakistan default
  zoom = 10,
  showControls = true,
  className = '',
  singleProperty = null 
}) => {
  const { t, language } = useLanguage()
  const [mapKey, setMapKey] = useState(0)

  // Filter properties with valid coordinates
  const validProperties = properties.filter(
    p => p.location?.coordinates?.lat && p.location?.coordinates?.lng
  )

  // If single property mode, use its coordinates as center
  const mapCenter = singleProperty?.location?.coordinates 
    ? [singleProperty.location.coordinates.lat, singleProperty.location.coordinates.lng]
    : center

  const mapZoom = singleProperty ? 15 : zoom

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  // Force re-render when properties change
  useEffect(() => {
    setMapKey(prev => prev + 1)
  }, [properties])

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <MapContainer
        key={mapKey}
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        scrollWheelZoom={true}
        zoomControl={showControls}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {!singleProperty && validProperties.length > 1 && (
          <FitBounds properties={validProperties} />
        )}

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          spiderfyDistanceMultiplier={1.5}
        >
          {validProperties.map((property) => {
            const title = language === 'ur' ? property.title_ur : property.title_en
            const description = language === 'ur' ? property.description_ur : property.description_en
            
            return (
              <Marker
                key={property.Id}
                position={[property.location.coordinates.lat, property.location.coordinates.lng]}
                icon={createPropertyIcon(property.type, property.featured)}
              >
                <Popup maxWidth={300} minWidth={250}>
                  <div className="p-2">
                    {property.images?.[0] && (
                      <img
                        src={property.images[0]}
                        alt={title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                          {title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="price-badge text-sm font-bold px-2 py-1 rounded">
                          {formatPrice(property.price)}
                        </div>
                        <span className="text-xs text-gray-500 capitalize">
                          {t(property.type)}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-gray-600">
                        <ApperIcon name="MapPin" size={12} className="mr-1" />
                        <span>{property.location.area}, {property.location.city}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                          {property.bedrooms && (
                            <div className="flex items-center">
                              <ApperIcon name="Bed" size={12} className="mr-1" />
                              <span>{property.bedrooms}</span>
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center">
                              <ApperIcon name="Bath" size={12} className="mr-1" />
                              <span>{property.bathrooms}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <ApperIcon name="Home" size={12} className="mr-1" />
                            <span>{property.area} {t(property.areaUnit)}</span>
                          </div>
                        </div>
                      </div>

                      <Link to={`/property/${property.Id}`}>
                        <Button size="sm" className="w-full mt-2 text-xs">
                          {t('viewDetails')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Map legend */}
      {showControls && validProperties.length > 0 && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Property Types</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">{t('residential')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">{t('commercial')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600">{t('agricultural')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapComponent