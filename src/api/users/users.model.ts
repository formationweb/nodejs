import { model, Schema } from "mongoose";

export const UserModel = model('User', new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    }
}))