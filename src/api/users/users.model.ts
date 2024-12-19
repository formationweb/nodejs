import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String
})

export const User = model('User', userSchema)