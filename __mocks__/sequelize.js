import { DataTypes as OriginalDataType } from "sequelize"

class Mock {
    static async update(objUpdate, objQuery) {
        return [objQuery.where.id]
    }
    static async findByPk(id) {
        if (id == 0) {
            return 0
        }
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

class PostMock extends Mock {
    static async findAll(objQuery) {
        if (objQuery?.where.title) {
            return []
        }
        return [
            {
                id: 1,
                title: 'dzdz',
                body: 'fefez',
                userId: 1
            }
        ]
    }
}

class UserMock extends Mock {
    static async findAll() {
        return [
            {
                id: 1,
                name: 'ana',
                email: 'ffe@gmail.com'
            }
        ]
    }
}

export class Sequelize { 
    async sync() { }
    define(name, schema) {
        if (name == 'Post') return PostMock
        if (name == 'User') return UserMock
    }
}

export const DataTypes = OriginalDataType