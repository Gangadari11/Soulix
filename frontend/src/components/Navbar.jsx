


//**************Enable profile******************** */

"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../pages/firebase"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-white/20"
      style={{
        backgroundColor: "#A7BEEB",
        color: "white",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 bg-white/20 backdrop-blur-sm border border-white/30">
              <img
                src="/logo6.png"
                alt="Soulix Logo"
                className="w-8 h-8 object-contain filter brightness-110 contrast-110"
              />
            </div>
            <span className="text-2xl font-bold text-white drop-shadow-md">Soulix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/theworldyouneed" isActive={isActive("/theworldyouneed")}>
              Get Inspired
            </NavLink>
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-white font-medium text-sm bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/30 shadow-sm">
                  Hi, {user.displayName?.split(" ")[0] || user.email?.split("@")[0]} 👋
                </span>
                <Link
                  to="/profile"
                  className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm flex items-center space-x-2 ${
                    isActive("/profile")
                      ? "bg-white text-purple-800 shadow-md border border-white/40"
                      : "bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:border-white/50 shadow-sm"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 text-white hover:bg-white/30 font-medium rounded-lg transition-all duration-200 border border-white/30 hover:border-white/50 text-sm shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white/20 text-white hover:bg-white/30 font-medium rounded-lg transition-all duration-200 border border-white/30 hover:border-white/50 text-sm shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-purple-800 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors text-white border border-white/30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/30">
            <div className="flex flex-col space-y-2">
              <MobileNavLink
                to="/theworldyouneed"
                isActive={isActive("/theworldyouneed")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Inspired
              </MobileNavLink>
              
              {user && (
                <MobileNavLink
                  to="/profile"
                  isActive={isActive("/profile")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </div>
                </MobileNavLink>
              )}

              <div className="pt-3 border-t border-white/30 flex flex-col space-y-2">
                {user ? (
                  <>
                    <span className="px-3 py-2 text-white font-medium bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 text-sm shadow-sm">
                      Hi, {user.displayName?.split(" ")[0] || user.email?.split("@")[0]} 👋
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 bg-white/20 text-white hover:bg-white/30 font-medium rounded-lg transition-all text-left border border-white/30 text-sm shadow-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-2 bg-white/20 text-white hover:bg-white/30 font-medium rounded-lg transition-all border border-white/30 text-sm shadow-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-3 py-2 bg-white text-purple-800 hover:bg-gray-100 font-semibold rounded-lg transition-all text-center shadow-md hover:shadow-lg text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const NavLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm shadow-sm ${
      isActive
        ? "bg-white text-purple-800 shadow-md border border-white/40"
        : "bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:border-white/50"
    }`}
  >
    {children}
  </Link>
)

const MobileNavLink = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-3 py-2 rounded-lg font-medium transition-all text-sm shadow-sm ${
      isActive
        ? "bg-white text-purple-800 shadow-md border border-white/40"
        : "bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:border-white/50"
    }`}
  >
    {children}
  </Link>
)

export default Navbar