import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Events from './pages/events'
import NotFound from './pages/notFound'
import Login from './pages/login'
import Navbar from './components/navBar'
import ProtectedRoute from './components/protectedRoute'
import CreateEvent from './pages/createEvent'
import Profile from './pages/profile'
import EventDetails from './pages/eventDetails'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from 'sonner'


const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
          <Route path="/create" element={<CreateEvent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
