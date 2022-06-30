import { Sequelize } from 'sequelize';
import modelsSetup from './models';

const seq = new Sequelize('postgres://karol_sawicki:@localhost:5432/mentoring');

export default () => {
  return seq.authenticate()
  .then(() => {
    console.log('database connected');

    modelsSetup(seq);

    return seq;
  }).catch(e => {
    throw e;
  });
};
