import { DataTypes } from "sequelize";
import db from "../../db.js";

export const Post = db.define('Post', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})