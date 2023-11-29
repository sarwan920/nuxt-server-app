import { Schema, model } from 'mongoose'



const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a Name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an Email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
}, {
    timestamps: true,
})

export const User = model('User', UserSchema);