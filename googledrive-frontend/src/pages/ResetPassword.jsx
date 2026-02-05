import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiLock } from 'react-icons/fi'
import { authService } from '../services/api'

export default function ResetPassword() {
  const { token } = useParams()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await authService.resetPassword(token, newPassword)
      toast.success('Password reset successful! Redirecting to login...')
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem', width: '100%', maxWidth: '28rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#16a34a' }}>Password Reset Successful</h2>
          <p style={{ color: '#4b5563' }}>Your password has been reset. Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem', width: '100%', maxWidth: '28rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#1f2937' }}>Reset Password</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#9ca3af' }} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#9ca3af' }} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', backgroundColor: loading ? 'rgba(37, 99, 235, 0.5)' : '#2563eb', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
