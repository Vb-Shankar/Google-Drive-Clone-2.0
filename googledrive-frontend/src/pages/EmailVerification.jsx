import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { authService } from '../services/api'

export default function EmailVerification() {
  const { token } = useParams()
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setError('No verification token found')
          setLoading(false)
          return
        }

        console.log('Verifying email with token:', token)
        const response = await authService.verifyEmail(token)
        console.log('Verification response:', response.data)
        
        toast.success('Email verified successfully! Redirecting to login...')
        setVerified(true)
        setTimeout(() => navigate('/login'), 3000)
      } catch (error) {
        console.error('Verification error:', error.response?.data || error.message)
        const errorMsg = error.response?.data?.message || 'Email verification failed'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [token, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl border border-gray-100 text-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Verifying Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </>
        ) : verified ? (
          <>
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Email Verified!</h2>
            <p className="text-gray-600">Your email has been verified successfully.</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
          </>
        ) : (
          <>
            <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/register')}
              className="btn-primary inline-block"
            >
              Back to Register
            </button>
          </>
        )}
      </div>
    </div>
  )
}
