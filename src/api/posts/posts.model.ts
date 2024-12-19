import { DataTypes } from "sequelize";
import { db } from "../../db";
import { User } from "../users/users.model";

export const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'articles'
})
Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})