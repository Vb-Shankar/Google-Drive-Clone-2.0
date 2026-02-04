import React, { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiLogOut, FiMenu, FiUser, FiChevronDown, FiSearch } from 'react-icons/fi'
import { AuthContext } from '../context/AuthContext'

// Google Drive style logo component
const DriveLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 6L2 19.5L6.5 27L15 13.5L10.5 6Z" fill="#0066DA"/>
    <path d="M21.5 6L10.5 6L15 13.5L26 13.5L21.5 6Z" fill="#00AC47"/>
    <path d="M26 13.5L30 21L21.5 27L6.5 27L15 13.5L26 13.5Z" fill="#EA4335"/>
  </svg>
)

export default function Navbar() {
  const { user, logout, searchQuery, setSearchQuery } = useContext(AuthContext)
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogoClick = (e) => {
    e.preventDefault()
    setSearchQuery('') // Clear search
    navigate('/dashboard', { state: { resetToRoot: true } })
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex justify-between items-center py-4 gap-4">
        <button onClick={handleLogoClick} className="flex items-center gap-3 text-2xl font-bold text-gray-800 whitespace-nowrap hover:opacity-80 transition">
          <DriveLogo />
          <span>Drive Clone</span>
        </button>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search in Drive"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-gray-800">{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
              <FiChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{user?.firstName} {user?.lastName}</span>
                    <span className="text-sm text-gray-500">{user?.email}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition text-red-600 font-medium"
              >
                <FiLogOut className="text-xl" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
