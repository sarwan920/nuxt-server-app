import { Goal } from '~/server/models/Goal'
export default defineEventHandler(async (event) => {
    const { text } = await readBody(event);


    if (!text) {
        throw createError({
            status: 400,
            statusText: "Please add a text field"
        })
    }

    const goal = await Goal.create({ text: text, user: event.context.user })
    return goal;
    // const goals = await Goal.find({ user: event.context.user.id });

})