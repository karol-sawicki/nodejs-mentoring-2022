import { Express } from 'express';
import { Sequelize } from 'sequelize';
import userRoute from './user';
import defaultSetup from './setup';

export default (app: Express, db: Sequelize) => {
  userRoute(app, db);
  defaultSetup(app);
};
