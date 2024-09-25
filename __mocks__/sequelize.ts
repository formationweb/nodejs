import { DataTypes as OriginalDataTypes } from "sequelize";
import { vi } from "vitest";

const fakeData = [
  {
    id: 1,
    name: "ana",
    email: "ana@gmail.com",
  },
];

const postfakeData = [
  {
    id: 1,
    title: "title",
    content: "content sunt",
  }
]

class Mock {
  static async create(obj) {
    return {
        id: 1,
        ...obj
    };
  }
}

class UserModelMock extends Mock {
  static async findAll() {
    return fakeData;
  }
  static async findByPk(id) {
    return fakeData.find(user => user.id == id);
  }
}

export class PostModelMock extends Mock {
  //static findAll = vi.fn().mockResolvedValue(postfakeData)
  static findAll(options) {
    if (!options) {
      return postfakeData
    }
    if (options.where.title) {
      return [
        {
          id: 2,
          title: 'search title',
          content: 'content'
        }
      ]
    }
  }
  static async findByPk(id) {
    return postfakeData.find(post => post.id == id);
  }
}

export class Sequelize {
  async sync() {}
  define(name, schema) {
    if (name == "User") return UserModelMock;
    if (name == "Post") return PostModelMock
  }
}

export const DataTypes = OriginalDataTypes;
