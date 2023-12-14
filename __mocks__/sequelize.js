import { DataTypes as OriginalDataType } from "sequelize"

class UserMock {
    static async findAll() {
        return [
            {
                id: 1,
                name: 'ana',
                email: 'ffe@gmail.com'
            }
        ]
    }
    static async update(objUpdate, objQuery) {
        return [objQuery.where.id]
    }
    static async findByPk(id) {
        return {
            id
        }
    }
    static async create(objCreate) {
        return {
            id: 1,
            ...objCreate
        }
    }
    static async destroy(objQuery) {
        return objQuery.where.id
    }
}

export class Sequelize { 
    async sync() { }
    define(name, schema) {
        if (name == 'User') return UserMock
    }
}

export const DataTypes = OriginalDataType