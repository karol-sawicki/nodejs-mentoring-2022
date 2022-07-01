import express from 'express';
import seq from './data-access';
import routersSetup from './routers';

(async function () {
  const app = express();

  const db = await seq();

  routersSetup(app, db);

  app.listen(3000, () => {
    console.log('app running...');
  }).on('error', err => {
    console.log('app error: ', err);
  });
}());
