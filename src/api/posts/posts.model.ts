import { model, Schema } from "mongoose";

export const Post = model('Post', new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Number,
        
    }
}))