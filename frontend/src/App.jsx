

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import Media from "./pages/Media"
import Practice from "./pages/Practice"
import Meditate from "./pages/Meditate"
import BoxBreathing from "./pages/BoxBreathing"
import BodyScan from "./pages/BodyScan"
import LovingKindness from "./pages/LovingKindness"
import MindfulWalking from "./pages/MindfulWalking"
import GratitudeReflection from "./pages/GratitudeReflection"
import VisualizationMeditation from "./pages/VisualizationMeditation"
import ConnectCounselors from "./pages/ConnectCounselors"
import CounselorProfile from './pages/CounselorProfile'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Sleep from "./pages/Sleep"
import FantasyStories from "./pages/FantasyStories"
import TheWorldYouNeed from "./pages/TheWorldYouNeed"
import ProtectedRoute from "./components/ProtectedRoute"
import CheckIn from "./pages/CheckIn"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/media" element={<Media />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/practice/meditate" element={<Meditate />} />
              <Route path="/practice/meditate/box-breathing" element={<BoxBreathing />} />
              <Route path="/practice/meditate/body-scan" element={<BodyScan />} />
              <Route path="/practice/meditate/loving-kindness" element={<LovingKindness />} />
              <Route path="/practice/meditate/mindful-walking" element={<MindfulWalking />} />
              <Route path="/practice/meditate/gratitude-reflection" element={<GratitudeReflection />} />
              <Route path="/practice/meditate/visualization-meditation" element={<VisualizationMeditation />} />
              
              <Route path="/practice/sleep" element={<Sleep />} />
              <Route path="/practice/sleep/stories/fantasy" element={<FantasyStories />} />


              {/* Route for Soulix homepage navigation */}
              <Route path="/theworldyouneed" element={<TheWorldYouNeed />} />

              {/* Protected route for TheWorldYouNeed */}
              <Route 
                path="/practice/theworldyouneed" 
                element={
                  <ProtectedRoute>
                    <TheWorldYouNeed />
                  </ProtectedRoute>
                } 
              />

              {/* Keep the old routes for backward compatibility */}
              <Route path="/practice/box-breathing" element={<BoxBreathing />} />
              <Route path="/practice/body-scan" element={<BodyScan />} />
              <Route path="/practice/loving-kindness" element={<LovingKindness />} />
              <Route path="/practice/mindful-walking" element={<MindfulWalking />} />
              <Route path="/practice/gratitude-reflection" element={<GratitudeReflection />} />
              <Route path="/practice/visualization-meditation" element={<VisualizationMeditation />} />

              {/* Check-In route */}
              <Route path="/practice/check-in" element={<CheckIn />} />
              
              {/* Counselor routes */}
              <Route path="/ConnectCounselors" element={<ConnectCounselors />} />
              <Route path="/counselor/:id" element={<CounselorProfile />} />


              
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Profile route */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                    <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App