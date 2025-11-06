import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookProvider } from './context/Bookcontext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UploadBook from './pages/UploadBook/UploadBook'
import Browse from './pages/Browse/Browse'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/upload" element={<UploadBook />} />
                <Route path="/browse" element={<Browse />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BookProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
