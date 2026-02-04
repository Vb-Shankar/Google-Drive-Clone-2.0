import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex')
}

export const generatePasswordResetToken = () => {
  return crypto.randomBytes(32).toString('hex')
}

export const formatUserResponse = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isVerified: user.isVerified,
    storage: user.storage,
    createdAt: user.createdAt,
  }
}

export default {
  generateToken,
  generateVerificationToken,
  generatePasswordResetToken,
  formatUserResponse,
}
