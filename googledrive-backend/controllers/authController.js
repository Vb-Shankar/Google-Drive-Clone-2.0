import User from '../models/User.js'
import {
  generateToken,
  generateVerificationToken,
  generatePasswordResetToken,
  formatUserResponse,
} from '../utils/helpers.js'
import { sendVerificationEmail, sendPasswordResetEmail } from '../config/email.js'

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Generate verification token
    const verificationToken = generateVerificationToken()
    const verificationTokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      verificationToken,
      verificationTokenExpire,
      isVerified: false,
    })

    await user.save()

    // Send verification email in background (non-blocking)
    sendVerificationEmail(email, verificationToken).catch(err => {
      console.error('Error sending verification email:', err.message)
    })

    res.status(201).json({
      message: 'Registration successful. Please verify your email.',
      user: formatUserResponse(user),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Check if user exists and get password field
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email first' })
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      token,
      user: formatUserResponse(user),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body

    // Find user with verification token - need to select the fields
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() },
    }).select('+verificationToken +verificationTokenExpire')

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' })
    }

    // Mark email as verified
    user.isVerified = true
    user.verificationToken = null
    user.verificationTokenExpire = null
    await user.save()

    res.json({ message: 'Email verified successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Generate reset token
    const passwordResetToken = generatePasswordResetToken()
    const passwordResetExpire = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    user.passwordResetToken = passwordResetToken
    user.passwordResetExpire = passwordResetExpire
    await user.save()

    // Send email with reset token in background (non-blocking)
    sendPasswordResetEmail(email, passwordResetToken).catch(err => {
      console.error('Error sending password reset email:', err.message)
    })

    res.json({ message: 'Password reset link sent to email' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    // Validate input
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' })
    }

    // Find user with reset token - need to select the fields
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpire: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpire')

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' })
    }

    // Update password
    user.password = newPassword
    user.passwordResetToken = null
    user.passwordResetExpire = null
    await user.save()

    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
}
