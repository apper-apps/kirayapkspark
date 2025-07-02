import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const RegisterPage = () => {
  const { t } = useLanguage()
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await registerUser(data)
    setLoading(false)

    if (result.success) {
      navigate('/', { replace: true })
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
              Create Account
            </h2>
            <p className="text-gray-600">
              Join KirayaPK to list your properties and find great rentals
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                label="Full Name"
                type="text"
                {...register('name', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
                error={errors.name?.message}
                placeholder="Enter your full name"
              />
            </div>

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
                label="Phone Number"
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+92-\d{3}-\d{7}$/,
                    message: 'Format: +92-300-1234567'
                  }
                })}
                error={errors.phone?.message}
                placeholder="+92-300-1234567"
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
                placeholder="Create a password"
              />
            </div>

            <div>
              <Input
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match'
                })}
                error={errors.confirmPassword?.message}
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                type="checkbox"
                {...register('agreeTerms', {
                  required: 'You must agree to the terms and conditions'
                })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:text-primary-dark">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-primary-dark">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-600 text-sm">{errors.agreeTerms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <ApperIcon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <ApperIcon name="UserPlus" size={20} />
              )}
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <ApperIcon name="LogIn" size={20} />
                  <span>Sign In</span>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage