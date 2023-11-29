import { User } from '~/server/models/User'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const { name, email, password } = await readBody(event);
    console.log(name, email, password);
    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Name is Required"
        })
    }

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email is Required"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name: name, email: email, password: hashPassword })

    return {
        user
    }

})