import { Schema, model } from "mongoose";
import pkg from 'validator';
import bcrypt from 'bcrypt'

const { isEmail } = pkg;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
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
        enum: ['admin', 'member'],
        default: 'member'
    }
})

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10)
})

export const User = model('User', userSchema)