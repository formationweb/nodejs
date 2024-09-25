import { model, Schema } from "mongoose";

export const UserModel = model('User', new Schema({
    name: String,
    email: String
}))