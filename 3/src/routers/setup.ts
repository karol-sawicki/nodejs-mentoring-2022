import { Express } from 'express';

export default (app: Express) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.use((req, res, next) => {
    res.status(400).json({ error: 'Not found' });
  });
};
