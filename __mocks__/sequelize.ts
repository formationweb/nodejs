import { DataTypes as OriginalDataTypes, Op as OriginalOp } from "sequelize"
import { vi } from "vitest"

const fakeData = [
    {
        id: 1,
        name: 'ana',
        email: 'ana@gmail.com'
    }
]

const postFakeData = [
    {
        id: 1,
        title: 'title',
        content : 'aaa bbb'
    }
]

class Mock {
    static async create(data) {
        return {
            id: 2,
            ...data
        }
    }
}

class PostModelMock extends Mock {
    static async findAll(options) {
        if (options?.where?.title) {
            return postFakeData
        }
        return postFakeData
    }
    static async findByPk(id) {
        return postFakeData.find(user => user.id == id)
    } 
}

class UserModelMock extends Mock {
    // static async findAll() {
    //     return fakeData
    // }
    static findAll = vi.fn().mockResolvedValue(postFakeData)
    static async findByPk(id) {
        return fakeData.find(user => user.id == id)
    } 
}

export class Sequelize {
    async sync() {}
    define(name, schema) {
        if (name == 'User') return UserModelMock
        else if (name == 'Post') return PostModelMock
    }
}

export const DataTypes = OriginalDataTypes
export const Op = OriginalOp