import { DataTypes } from "sequelize";
import db from "../../db.js";
import { User } from "../users/users.model.js";

export const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'posts'
})

Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})