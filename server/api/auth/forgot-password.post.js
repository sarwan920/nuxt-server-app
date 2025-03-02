import { User } from '~/server/models/User' // Assuming you have a User model
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Resend } from 'resend'
const config = useRuntimeConfig()
const resend = new Resend(config.resendApiKey) // Get your API key from env

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body)
  const { email } = body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return { status: 404, message: 'User not found.' }
    }

    // 1. Generate a unique reset token.
    const resetToken = jwt.sign(
      { userId: user._id },
      config.jwtSecret, // Add a JWT_SECRET to your .env
      { expiresIn: '1h' },
    )

    // 2. Update the user in the database with the token and expiry.
    user.resetToken = resetToken
    user.resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now
    await user.save()
    console.log(user)
    // 3. Send the password reset email.
    const resetLink = `${config.baseUrl}/reset-password?token=${resetToken}` // Replace with your base URL

    const emailData = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified sender
      to: email,
      subject: 'Password Reset',
      html: `<p>Click this link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
      attachments: [
        {
          path: 'https://resend.com/static/sample/invoice.pdf',
          filename: 'sample-invoice.pdf',
        },
      ],
    })

    return {
      status: 200,
      message: 'Password reset email sent.',
      emailData,
    }
  } catch (error) {
    console.error('Error in forgot-password:', error)
    return {
      status: 500,
      message: 'Internal server error.',
      error: error.message,
    }
  }
})
