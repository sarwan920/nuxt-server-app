import { Goal } from "~/server/models/Goal"

export default defineEventHandler(async (event) => {

    // GET THE GOAL ID FROM PARAMS
    const goalId = event.context.params.id;
    const user = event.context.user.id;
    // FIND THE GOAL
    const goal = await Goal.findById(goalId);

    // CHECK IF GOAL EXISTS
    if (!goal) {
        throw createError({
            status: 401,
            statusMessage: "Goal Not Found!"
        })
    }

    // CHECK IF USER EXISTS
    if (!user) {
        throw createError({
            status: 401,
            statusMessage: "User Not Found!"

        })
    }

    if (goal.user.toString() !== user) {
        throw createError({
            status: 401,
            statusMessage: "User Not Authorized!"

        })
    }

    await goal.deleteOne()

    setResponseStatus(event, 200);
    return {
        message: 'Goal Has been deleted'
    }

})