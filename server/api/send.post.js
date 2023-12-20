
import { Resend } from 'resend'
import { User } from '~/server/models/User'

const resend = new Resend('re_ac8XBfFR_BNYDHWLo8VjHjgnWnwuvo5Hy');
export default defineEventHandler(async (event) => {

    const { email } = await readBody(event);

    // CHECK IF USER EXISTS
    const userExists = await User.findOne({ email });
    if (!userExists) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email Does not Exist!"
        })
    }
    try {
        const data = await resend.emails.send({
            from: 'Sarwan <onboarding@resend.dev>',
            to: [`${email}`],
            subject: 'Password Reset',
            html: `<strong>Click on the <a href="http://localhost:3000/">Link</a> </strong>`,
        });

        return data;
    } catch (error) {
        return { error };
    }


})