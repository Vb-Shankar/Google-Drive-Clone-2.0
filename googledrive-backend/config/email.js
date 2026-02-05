import sgMail from '@sendgrid/mail'

if (!process.env.SENDGRID_API_KEY) {
  console.warn('⚠️  SENDGRID_API_KEY not found in environment variables!')
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL

if (!FROM_EMAIL) {
  console.warn('⚠️  SENDGRID_FROM_EMAIL not set!')
}

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`

  const msg = {
    to: email,
    from: {
      email: FROM_EMAIL,
      name: 'Drive Clone',
    },
    subject: 'Email Verification - Drive Clone',
    html: `
      <h2>Welcome to Drive Clone!</h2>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}" style="background-color:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
        Verify Email
      </a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link expires in 24 hours.</p>
    `,
  }

  try {
    console.log('Sending verification email to:', email)
    await sgMail.send(msg)
    console.log('✅ Verification email sent')
  } catch (error) {
    console.error('❌ Error sending verification email')
    console.error(error.response?.body || error)
    throw error
  }
}

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`

  const msg = {
    to: email,
    from: {
      email: FROM_EMAIL,
      name: 'Drive Clone',
    },
    subject: 'Password Reset - Drive Clone',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
        Reset Password
      </a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${resetUrl}</p>
      <p>This link expires in 1 hour.</p>
      <p>If you didn’t request this, ignore this email.</p>
    `,
  }

  try {
    console.log('Sending password reset email to:', email)
    await sgMail.send(msg)
    console.log('✅ Password reset email sent')
  } catch (error) {
    console.error('❌ Error sending password reset email')
    console.error(error.response?.body || error)
    throw error
  }
}
