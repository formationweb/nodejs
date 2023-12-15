import { Schema, model } from "mongoose";

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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