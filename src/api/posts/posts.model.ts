import { model, Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    content: {
        type: String,
        required: true,
        maxlength: 2000
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: String
})

postSchema.index({
    title: 'text'
})

export const Post = model('Post', postSchema)