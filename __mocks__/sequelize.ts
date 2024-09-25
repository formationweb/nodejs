import { DataTypes as OriginalDataTypes } from "sequelize";

const fakeData = [
  {
    id: 1,
    name: "ana",
    email: "ana@gmail.com",
  },
];

class UserModelMock {
  static async findAll() {
    return fakeData;
  }
  static async findByPk(id) {
    return fakeData.find(user => user.id == id);
  }
  static async create(obj) {
    return {
        id: 1,
        ...obj
    };
  }
}

export class Sequelize {
  async sync() {}
  define(name, schema) {
    if (name == "User") return UserModelMock;
  }
}

export const DataTypes = OriginalDataTypes;
