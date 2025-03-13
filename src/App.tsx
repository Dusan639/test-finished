import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store'
// PAGES
import Homepage from './pages/Homepage'
import BlogPage from './pages/BlogPage'
import AddBlogPostPage from './pages/AddBlogPostPage'
// GLOBAL STYLES
import { GlobalStyles } from './components/GlobalStyles/GlobalStyles'
import { ToastContainer } from 'react-toastify'

const store = setupStore()
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/add-blog/:userId" element={<AddBlogPostPage />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  )
}

export default App
