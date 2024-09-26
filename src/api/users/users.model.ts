import { model, Schema } from "mongoose";
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt'
import { User } from "./users.schema";

export enum Role {
    Admin = 'admin',
    Member = 'member'
}

export interface IUser extends User {
    role: Role
}

const userSchema =  new Schema({
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

export const UserModel = model('User', userSchema)