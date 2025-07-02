import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const LoginPage = () => {
  const { t } = useLanguage()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await login(data)
    setLoading(false)

    if (result.success) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-3">
            <ApperIcon name="Home" size={32} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary-dark">KirayaPK</h1>
            <p className="text-sm text-gray-500">Rental Directory</p>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access your property listings and dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                label="Email Address"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={errors.password?.message}
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-dark"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <ApperIcon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <ApperIcon name="LogIn" size={20} />
              )}
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/register">
                <Button variant="outline" className="w-full">
                  <ApperIcon name="UserPlus" size={20} />
                  <span>Create Account</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h4>
            <p className="text-xs text-gray-600">
              Email: ahmed@example.com<br />
              Password: password123
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage