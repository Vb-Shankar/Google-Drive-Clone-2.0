import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { authService } from '../services/api'

export default function VerifyEmail() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading') // loading, success, error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setStatus('error')
          setMessage('No verification token provided')
          return
        }

        // Call verification endpoint
        const response = await authService.verifyEmail(token)
        
        setStatus('success')
        setMessage('Email verified successfully! You can now log in.')
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } catch (error) {
        setStatus('error')
        setMessage(error.response?.data?.message || 'Failed to verify email. The link may have expired.')
        console.error('Verification error:', error)
      }
    }

    verifyEmail()
  }, [token, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl border border-gray-100 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Verifying Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Success!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
            <Link
              to="/login"
              className="btn-primary inline-block mt-6"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
              to="/login"
              className="btn-primary inline-block"
            >
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
