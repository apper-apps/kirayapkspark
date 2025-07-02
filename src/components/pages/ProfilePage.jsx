import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const ProfilePage = () => {
  const { t } = useLanguage()
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || ''
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    await updateProfile(data)
    setLoading(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: 'User' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user?.avatar || '/api/placeholder/100/100'}
                alt={user?.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-primary-dark transition-colors">
                <ApperIcon name="Camera" size={16} />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center mt-2">
                <ApperIcon name="Calendar" size={16} className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">
                  Member since {new Date(user?.joinedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ApperIcon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Profile Information
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Update your account profile information and email address.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        {...register('name', {
                          required: 'Name is required'
                        })}
                        error={errors.name?.message}
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        value={user?.email}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>

                    <Input
                      label="Phone Number"
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required'
                      })}
                      error={errors.phone?.message}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <ApperIcon name="Loader2" size={18} className="animate-spin" />
                        ) : (
                          <ApperIcon name="Save" size={18} />
                        )}
                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Security Settings
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Manage your account security and password settings.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Password</h3>
                          <p className="text-sm text-gray-600">
                            Last updated 3 months ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-600">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Account Preferences
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Customize your experience and notification settings.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">
                            Receive email notifications about property updates
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                          <p className="text-sm text-gray-600">
                            Get SMS alerts for important updates
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage