import mockData from '@/services/mockData/properties.json'

const { mockProperties } = mockData

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const propertyService = {
  async getAll() {
    await delay(300)
    return [...mockProperties]
  },

  async getById(id) {
    await delay(200)
    const property = mockProperties.find(p => p.Id === id)
    if (!property) {
      throw new Error('Property not found')
    }
    return { ...property }
  },

  async getFeatured() {
    await delay(250)
    return mockProperties.filter(p => p.featured).slice(0, 6)
  },

  async getByType(type) {
    await delay(300)
    return mockProperties.filter(p => p.type === type)
  },

async search(filters) {
    await delay(400)
    let results = [...mockProperties]

    if (filters.city) {
      results = results.filter(p => 
        p.location.city.toLowerCase().includes(filters.city.toLowerCase()) ||
        p.location.area.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.propertyType) {
      results = results.filter(p => p.type === filters.propertyType)
    }

    if (filters.subtype) {
      results = results.filter(p => p.subtype === filters.subtype)
    }

    if (filters.furnished) {
      results = results.filter(p => p.furnished === filters.furnished)
    }

    if (filters.priceMin) {
      results = results.filter(p => p.price >= parseInt(filters.priceMin))
    }

    if (filters.priceMax) {
      results = results.filter(p => p.price <= parseInt(filters.priceMax))
    }

    if (filters.areaMin) {
      results = results.filter(p => p.area >= parseInt(filters.areaMin))
    }

    if (filters.areaMax) {
      results = results.filter(p => p.area <= parseInt(filters.areaMax))
    }

    if (filters.bedrooms) {
      results = results.filter(p => p.bedrooms >= parseInt(filters.bedrooms))
    }

    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter(p => 
        filters.amenities.some(amenity => p.amenities?.includes(amenity))
      )
    }

    return results
  },

  async getBySubtype(type, subtype) {
    await delay(300)
    return mockProperties.filter(p => p.type === type && p.subtype === subtype)
  },

  async getByCity(city) {
    await delay(300)
    return mockProperties.filter(p => 
      p.location.city.toLowerCase() === city.toLowerCase()
    )
  },

  async getFurnishedProperties() {
    await delay(300)
    return mockProperties.filter(p => p.furnished && p.furnished !== 'unfurnished')
  },

async getUserProperties(userId) {
    await delay(300)
    return mockProperties.filter(p => p.ownerId === userId).map(p => ({ 
      ...p, 
      status: p.status || 'active' 
    }))
  },

  async create(propertyData) {
    await delay(500)
    const maxId = Math.max(...mockProperties.map(p => p.Id), 0)
    const newProperty = {
      Id: maxId + 1,
      ...propertyData,
      ownerId: propertyData.ownerId,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    mockProperties.push(newProperty)
    return { ...newProperty }
  },

  async update(id, propertyData) {
    await delay(400)
    const index = mockProperties.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    mockProperties[index] = { ...mockProperties[index], ...propertyData }
    return { ...mockProperties[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockProperties.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
const deleted = mockProperties.splice(index, 1)[0]
    return { ...deleted }
  },

  async getCities() {
    await delay(200)
    const cities = [...new Set(mockProperties.map(p => p.location.city))]
    return cities.sort()
  }
}