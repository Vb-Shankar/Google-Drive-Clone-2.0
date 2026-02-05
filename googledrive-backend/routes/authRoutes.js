import express from 'express'
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verify-email/:token', verifyEmail)
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.get('/reset-password/:token', resetPassword)
router.post('/reset-password', resetPassword)

export default router
