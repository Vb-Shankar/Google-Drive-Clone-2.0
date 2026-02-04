import nodemailer from 'nodemailer'

let transporter = null

const getTransporter = () => {
  if (!transporter) {
    // Check if using SendGrid API key
    if (process.env.SENDGRID_API_KEY) {
      // Use SendGrid API (works on Render)
      transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY,
        },
      })
    } else {
      // Fallback to Gmail SMTP
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT || 587),
        secure: Number(process.env.EMAIL_PORT || 587) === 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    }

    transporter.verify((error, success) => {
      if (error) {
        console.error('Email transporter error:', error)
      } else {
        console.log('Email transporter ready')
      }
    })
  }
  return transporter
}

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification - Google Drive Clone',
    html: `
      <h2>Welcome to Google Drive Clone!</h2>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <p>Or copy and paste this link in your browser: ${verificationUrl}</p>
      <p>This link expires in 24 hours.</p>
    `,
  }

  try {
    const transporter = getTransporter()
    const info = await transporter.sendMail(mailOptions)
    console.log('Verification email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw new Error(`Email Error: ${error.message}`)
  }
}

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset - Google Drive Clone',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p>Or copy and paste this link in your browser: ${resetUrl}</p>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
    `,
  }

  try {
    const transporter = getTransporter()
    const info = await transporter.sendMail(mailOptions)
    console.log('Password reset email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Error sending password reset email:', error)
    throw new Error(`Email Error: ${error.message}`)
  }
}
export default getTransporter
