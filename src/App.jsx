import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { LanguageProvider } from '@/hooks/useLanguage'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import SearchResultsPage from '@/components/pages/SearchResultsPage'
import PropertyDetailPage from '@/components/pages/PropertyDetailPage'
import CategoryPage from '@/components/pages/CategoryPage'
import MapPage from '@/components/pages/MapPage'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Layout>
<Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/category/:type" element={<CategoryPage />} />
              <Route path="/map" element={<MapPage />} />
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
    </LanguageProvider>
  )
}

export default App