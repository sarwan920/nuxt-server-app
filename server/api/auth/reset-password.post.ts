import { User } from '~/server/models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

interface ResetPasswordBody {
  token: string
  newPassword: string
}

interface DecodedToken {
  userId: string
  iat: number
  exp: number
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<ResetPasswordBody>(event)
  console.log(body)
  const { token, newPassword } = body

  try {
    // 1. Verify the token.
    const config = useRuntimeConfig()
    const decodedToken = jwt.verify(token, config.jwtSecret) as DecodedToken

    // 2. Find the user by the decoded user ID.
    const user = await User.findOne({
      _id: decodedToken.userId,
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Check if token is expired.
    })

    if (!user) {
      return { status: 400, message: 'Invalid or expired token.' }
    }

    // 3. Hash the new password.
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // 4. Update the user's password and clear the reset token fields.
    user.password = hashedPassword
    user.resetToken = ''
    user.resetTokenExpiry = new Date()
    await user.save()

    return { status: 200, message: 'Password reset successful.' }
  } catch (error) {
    console.error('Error in reset-password:', error)
    return {
      status: 500,
      message: 'Internal server error.',
      error: (error as Error).message,
    }
  }
})
