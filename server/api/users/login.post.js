import { User } from '~/server/models/User'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const storage = getStorage();

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "All Fields are requried!"
        })
    }
    const user = await User.findOne({ email });

    // const verify_password = await bcrypt.compare(password, user.password)
    if (user && (await bcrypt.compare(password, user.password))) {
        const fileRef = ref(storage, `images/${user.name}`)
        const downloadURL = await getDownloadURL(fileRef);
        setResponseStatus(event, 201)
        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            url: downloadURL,
            token: generateToken(user._id)
        }
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials."
        })
    }

})

function generateToken(id) {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    })
}