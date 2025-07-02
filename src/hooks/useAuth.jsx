import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { userService } from '@/services/api/userService'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const token = Cookies.get('auth_token')
      if (token) {
        const userData = await userService.verifyToken(token)
        setUser(userData)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Auth initialization failed:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      setLoading(true)
      const { user: userData, token } = await userService.login(credentials)
      
      Cookies.set('auth_token', token, { expires: 7 })
      setUser(userData)
      setIsAuthenticated(true)
      
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Login failed')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const { user: newUser, token } = await userService.register(userData)
      
      Cookies.set('auth_token', token, { expires: 7 })
      setUser(newUser)
      setIsAuthenticated(true)
      
      toast.success('Registration successful!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove('auth_token')
    setUser(null)
    setIsAuthenticated(false)
    toast.info('Logged out successfully')
  }

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await userService.updateProfile(user.Id, profileData)
      setUser(updatedUser)
      toast.success('Profile updated successfully!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Profile update failed')
      return { success: false, error: error.message }
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}