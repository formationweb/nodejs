import { DataTypes } from "sequelize";
import { db } from "../../db";

export const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
})