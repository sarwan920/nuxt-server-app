import jwt from 'jsonwebtoken'
import { User } from '~/server/models/User'

const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
    const reqUrl = getRequestURL(event).pathname
    if (reqUrl.startsWith('/api/goals') || reqUrl.startsWith('/api/me')) {
        let token
        const headers = getHeaders(event);

        if (headers.authorization && headers.authorization.startsWith('Bearer')) {
            try {

                // GET TOKEN FROM HEADER
                token = headers.authorization.split(' ')[1];

                // Verify Token
                const decoded = jwt.verify(token, config.jwtSecret);

                event.context.user = await User.findById(decoded.id).select('-password')
            } catch (error) {
                throw createError({
                    statusCode: 401,
                    statusMessage: "Not Authorized"
                })
            }
        }

        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: "Not Authorized"
            })
        }
    }

})
