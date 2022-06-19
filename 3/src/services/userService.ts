import { Sequelize } from 'sequelize';

export default class {
  // eslint-disable-next-line no-unused-vars
  constructor(private db: Sequelize) {}

  create(user: any) {
    return this.db.models.User.create(user)
      .then(result => result)
      .catch(err => err);
  }
}
