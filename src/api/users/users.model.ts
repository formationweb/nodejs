import { model, Schema } from "mongoose";
import isEmail from 'validator/lib/isEmail';

export const UserModel = model('User', new Schema({
    name: {
        type: String,
        required: true
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
            message: 'Email incorrect'
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
}))