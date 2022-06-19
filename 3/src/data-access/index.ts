import { Sequelize } from 'sequelize';
import models from './models';

const seq = new Sequelize('postgres://karol_sawicki:@localhost:5432/mentoring');

export default seq.authenticate()
  .then(() => {
    console.log('database connected');

    models(seq);

    return seq;
  }).catch(e => {
    throw e;
  });
