const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock user data
let mockUsers = [
  {
    Id: 1,
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    phone: '+92-300-1234567',
    password: 'password123', // In real app, this would be hashed
    avatar: '/api/placeholder/100/100',
    joinedAt: '2024-01-01T00:00:00Z',
    verified: true,
    role: 'user'
  },
  {
    Id: 2,
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    phone: '+92-300-2234567',
    password: 'password123',
    avatar: '/api/placeholder/100/100',
    joinedAt: '2024-01-02T00:00:00Z',
    verified: true,
    role: 'user'
  }
]

// Mock auth tokens
const mockTokens = new Map()

const generateToken = (userId) => {
  const token = `mock_token_${userId}_${Date.now()}`
  mockTokens.set(token, { userId, expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) })
  return token
}

const validateToken = (token) => {
  const tokenData = mockTokens.get(token)
  if (!tokenData || tokenData.expiresAt < Date.now()) {
    mockTokens.delete(token)
    return null
  }
  return tokenData
}

export const userService = {
  async login(credentials) {
    await delay(500)
    
    const { email, password } = credentials
    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }
    
    const token = generateToken(user.Id)
    const { password: _, ...userWithoutPassword } = user
    
    return {
      user: userWithoutPassword,
      token
    }
  },

  async register(userData) {
    await delay(600)
    
    const { name, email, phone, password } = userData
    
    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('User with this email already exists')
    }
    
    const maxId = Math.max(...mockUsers.map(u => u.Id), 0)
    const newUser = {
      Id: maxId + 1,
      name,
      email,
      phone,
      password,
      avatar: '/api/placeholder/100/100',
      joinedAt: new Date().toISOString(),
      verified: false,
      role: 'user'
    }
    
    mockUsers.push(newUser)
    
    const token = generateToken(newUser.Id)
    const { password: _, ...userWithoutPassword } = newUser
    
    return {
      user: userWithoutPassword,
      token
    }
  },

  async verifyToken(token) {
    await delay(200)
    
    const tokenData = validateToken(token)
    if (!tokenData) {
      throw new Error('Invalid or expired token')
    }
    
    const user = mockUsers.find(u => u.Id === tokenData.userId)
    if (!user) {
      throw new Error('User not found')
    }
    
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async updateProfile(userId, profileData) {
    await delay(400)
    
    const userIndex = mockUsers.findIndex(u => u.Id === userId)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    const allowedFields = ['name', 'phone', 'avatar']
    const updatedData = {}
    
    allowedFields.forEach(field => {
      if (profileData[field] !== undefined) {
        updatedData[field] = profileData[field]
      }
    })
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData }
    
    const { password: _, ...userWithoutPassword } = mockUsers[userIndex]
    return userWithoutPassword
  },

  async changePassword(userId, oldPassword, newPassword) {
    await delay(400)
    
    const user = mockUsers.find(u => u.Id === userId)
    if (!user) {
      throw new Error('User not found')
    }
    
    if (user.password !== oldPassword) {
      throw new Error('Current password is incorrect')
    }
    
    user.password = newPassword
    return { success: true }
  },

  async forgotPassword(email) {
    await delay(500)
    
    const user = mockUsers.find(u => u.email === email)
    if (!user) {
      throw new Error('No account found with this email address')
    }
    
    // In real app, this would send an email
    return { message: 'Password reset instructions sent to your email' }
  },

  async resetPassword(token, newPassword) {
    await delay(400)
    
    // In real app, this would validate the reset token
    // For demo, we'll just simulate success
    return { message: 'Password reset successfully' }
  }
}