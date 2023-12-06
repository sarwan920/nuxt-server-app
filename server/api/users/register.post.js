import { User } from '~/server/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {

    const { name, email, password } = await readBody(event);


    if (!name || !email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "All Fields are Required"
        })
    }

    // CHECK IF USER EXISTS
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw createError({
            statusCode: 400,
            statusMessage: "User already exists"
        })
    }

    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashPassword })

    if (user) {
        setResponseStatus(event, 201)
        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        }

    } else {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid User Data"
        })
    }

})

function generateToken(id) {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    })
}

