import { Sequelize } from 'sequelize';
import user from './user';

export default (seq: Sequelize) => ({
  user: user(seq),
});