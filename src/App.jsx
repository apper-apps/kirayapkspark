import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { LanguageProvider } from '@/hooks/useLanguage'
import { AuthProvider } from '@/hooks/useAuth'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import SearchResultsPage from '@/components/pages/SearchResultsPage'
import PropertyDetailPage from '@/components/pages/PropertyDetailPage'
import CategoryPage from '@/components/pages/CategoryPage'
import MapPage from '@/components/pages/MapPage'
import LoginPage from '@/components/pages/LoginPage'
import RegisterPage from '@/components/pages/RegisterPage'
import ProfilePage from '@/components/pages/ProfilePage'
import MyPropertiesPage from '@/components/pages/MyPropertiesPage'
import ProtectedRoute from '@/components/molecules/ProtectedRoute'
function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />
                <Route path="/category/:type" element={<CategoryPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/my-properties" element={
                  <ProtectedRoute>
                    <MyPropertiesPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </Layout>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{ zIndex: 9999 }}
          />
</div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App