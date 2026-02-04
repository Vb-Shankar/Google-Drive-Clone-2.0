import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authService } from '../services/api'

export default function EmailVerification() {
  const { token } = useParams()
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await authService.verifyEmail(token)
        toast.success('Email verified successfully! Redirecting to login...')
        setVerified(true)
        setTimeout(() => navigate('/login'), 2000)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Email verification failed')
        setTimeout(() => navigate('/register'), 2000)
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [token, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="card w-full max-w-md text-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Verifying Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </>
        ) : verified ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Email Verified!</h2>
            <p className="text-gray-600">Your email has been verified. Redirecting to login...</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h2>
            <p className="text-gray-600">Email verification failed. Redirecting to register...</p>
          </>
        )}
      </div>
    </div>
  )
}
