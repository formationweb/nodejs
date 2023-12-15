import { Schema, model } from "mongoose";

const postSchema = new Schema({
    userId: String,
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    body: {
        type: String,
        required: true
    }
})

export const Post = model('Post', postSchema)