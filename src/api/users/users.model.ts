import { model, Schema } from "mongoose";
import isEmail from 'validator/es/lib/isEmail';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            // validator: (email) => {
            //     return email.includes('@')
            // }
            validator: isEmail,
            message: 'Email is invalid'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    age: Number
})

export const User = model('User', userSchema)