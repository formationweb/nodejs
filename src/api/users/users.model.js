import { Schema, model } from "mongoose";
import pkg from 'validator';

const { isEmail } = pkg;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: 'Email incorrect'
        }
    },
    age: Number,
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['admin', 'member']
    }
})

export const User = model('User', userSchema)