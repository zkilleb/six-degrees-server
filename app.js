import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import {
  loggingMiddleware,
  configurationMiddleware,
  validateMiddlware,
} from './middleware.js';
import { host, port } from './constants.js';
import {
  getActorById,
  getActorByName,
  getActorImage,
  getMovieById,
  getMovieByName,
} from './controllers/tmdbControllers.js';

dotenv.config();

const app = express();

app.use(express.raw());
app.use(validateMiddlware);
app.use(loggingMiddleware);
app.use(configurationMiddleware);
app.use(helmet());

app.get('/person/id/:id', getActorById);

app.get('/person/name/:name', getActorByName);

app.get('/image/:id', getActorImage);

app.get('/movie/id/:id', getMovieById);

app.get('/movie/name/:name', getMovieByName);

app.listen(port, () => {
  console.log(`App listening at ${host}:${port}`);
});
