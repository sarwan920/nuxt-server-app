import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {

    console.log(event.context.user.id);
    const { _id, name, email } = await User.findById(event.context.user.id)

    setResponseStatus(event, 200)
    return {
        _id,
        name,
        email
    }
})