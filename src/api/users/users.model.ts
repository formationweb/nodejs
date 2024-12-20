import { model, Schema } from "mongoose";
import isEmail from 'validator/es/lib/isEmail';
import bcrypt from 'bcrypt'
import { User as UserSchema } from "./users.schema";

export enum Role {
    Admin = 'admin',
    Member = 'member'
}

export interface IUser extends UserSchema {
    role: Role
    _id: string
}

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
    password: {
        type: String,
        required: true,
        minlength: 8
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

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10)
})

export const User = model('User', userSchema)