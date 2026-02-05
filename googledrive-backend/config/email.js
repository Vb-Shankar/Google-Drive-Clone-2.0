import nodemailer from 'nodemailer'

let transporter = null

const getTransporter = () => {
  if (!transporter) {
    console.log('Initializing email transporter...')
    console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Present' : 'Missing')
    
    const apiKey = process.env.SENDGRID_API_KEY
    
    if (!apiKey) {
      console.warn('⚠️  SENDGRID_API_KEY not found in environment variables!')
      console.warn('Please add SENDGRID_API_KEY to Render environment variables')
    }
    
    // Always use SendGrid (more reliable than SMTP on Render)
    transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: apiKey || 'placeholder',
      },
      connectionTimeout: 10000,
      socketTimeout: 10000,
      logger: true,
      debug: true,
    })

    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error.message)
      } else {
        console.log('✅ Email transporter ready')
      }
    })
  }
  return transporter
}

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`
  
  const fromEmail = process.env.SENDGRID_API_KEY 
    ? process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER
    : process.env.EMAIL_USER
  
  const mailOptions = {
    from: `"Drive Clone" <${fromEmail}>`,
    to: email,
    subject: 'Email Verification - Drive Clone',
    html: `
      <h2>Welcome to Drive Clone!</h2>
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
    console.log('Sending verification email to:', email)
    console.log('From:', mailOptions.from)
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Verification email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Error sending verification email:', error.message)
    console.error('Full error:', error)
    throw error
  }
}

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`
  
  const fromEmail = process.env.SENDGRID_API_KEY 
    ? process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER
    : process.env.EMAIL_USER
  
  const mailOptions = {
    from: `"Drive Clone" <${fromEmail}>`,
    to: email,
    subject: 'Password Reset - Drive Clone',
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
    console.log('Sending password reset email to:', email)
    console.log('From:', mailOptions.from)
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Password reset email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Error sending password reset email:', error.message)
    console.error('Full error:', error)
    throw error
  }
}
export default getTransporter
