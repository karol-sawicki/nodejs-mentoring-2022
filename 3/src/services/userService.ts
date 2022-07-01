import { FindAttributeOptions, FindOptions, Model, ModelStatic, Sequelize, WhereOptions } from 'sequelize';

type WhereCondition = {
  id?: number;
  login?: string;
}

export default class {

  private model: ModelStatic<Model>;

  constructor(private db: Sequelize) {
    this.model = db.models.User;
  }

  async create(user: any) {

    try {
      const result = await this.model.create(user);
      return result;
    } catch (err) {
      return err;
    }
  }

  async findUsers(conditions: WhereCondition, attributes: FindOptions = {}) {
    const users = await this.model.findAll({
      where: conditions,
      raw: true,
      ...attributes
    });
    return users;
  }

  async updateUser(user: any) {
    const id = user.id;
    delete user.id;
    const updatedUser = await this.model.update(user, {
      where: {
        id
      }
    });
    return updatedUser;
  }

  async deleteUser(id: number) {
    const result = await this.model.update({
      isDeleted: true,
    }, {
      where: {
        id
      }
    });
    return result;
  }
}
