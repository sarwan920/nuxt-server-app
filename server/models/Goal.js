import { Schema, model } from 'mongoose'

const GoalSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true,
})

export const Goal = model('Goal', GoalSchema)