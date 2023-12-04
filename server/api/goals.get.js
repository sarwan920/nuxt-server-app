import { Goal } from '~/server/models/Goal'
export default defineEventHandler(async (event) => {

    const goals = await Goal.find({ user: event.context.user.id });
    return goals
})