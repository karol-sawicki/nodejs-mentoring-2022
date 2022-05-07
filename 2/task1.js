import express from 'express';
import { createReadStream } from 'fs';
import userRouter from './userRouter.js';

const app = express();
app.use('/user', userRouter);

const readStream = createReadStream('./users.json', 'utf8');

const buffer = [];
export let USERS = [];

readStream.on('data', (chunk) => buffer.push(chunk.toString()));
readStream.on('end', () => {
  USERS = JSON.parse(buffer.join(''));
  app.listen(3000, () => console.log('server running'));
});
