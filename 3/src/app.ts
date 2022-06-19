import express from 'express';
import seq from './data-access';
import routers from './routers';

// eslint-disable-next-line func-names
(async function () {
  const app = express();

  const db = await seq;

  routers(app, db);

  app.listen(3000, () => {
    console.log('app running...');
  }).on('error', err => {
    console.log('app error: ', err);
  });
}());
