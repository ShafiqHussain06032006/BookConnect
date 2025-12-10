import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookProvider } from './context/Bookcontext'
import { DashboardProvider } from './context/DashboardContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UploadBook from './pages/UploadBook/UploadBook'
import Browse from './pages/Browse/Browse'
import Dashboard from './pages/Dashboard/Dashboard'
import DashboardOverview from './pages/Dashboard/DashboardOverview'
import MyBooks from './pages/Dashboard/MyBooks'
import RequestsSent from './pages/Dashboard/RequestsSent'
import RequestsReceived from './pages/Dashboard/RequestsReceived'
import PurchasesMade from './pages/Dashboard/PurchasesMade'
import PurchaseRequestsReceived from './pages/Dashboard/PurchaseRequestsReceived'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookProvider>
          <DashboardProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/upload" element={<UploadBook />} />
                  <Route path="/browse" element={<Browse />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="my-books" element={<MyBooks />} />
                    <Route path="requests-sent" element={<RequestsSent />} />
                    <Route path="requests-received" element={<RequestsReceived />} />
                    <Route path="purchases" element={<PurchasesMade />} />
                    <Route path="purchase-requests" element={<PurchaseRequestsReceived />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </DashboardProvider>
        </BookProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
