import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './env';
import { redisDB } from '../app/db/setup/redis';
import { constants } from '../app/utils';
import Helper from '../app/utils/helpers';
import apiV1Routes from '../app/routes/v1';

const { REDIS_RUNNING, LIMS_SYSTEM_RUNNING, WELCOME, v1 } = constants;
const { successResponse } = Helper;

const appConfig = (app) => {
  // adds security middleware to handle potential attacks from HTTP requests
  app.use(helmet());
  // adds middleware for cross-origin resource sharing configuration
  app.use(cors());
  // adds middleware that parses requests with x-www-form-urlencoded data encoding
  app.use(urlencoded({ extended: true }));
  // adds a heartbeat route for the culture
  app.use(json());

  app.use(v1, apiV1Routes);

  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
  // serves v1 api routes

  //redisDB.on('connect', () => logger.info(REDIS_RUNNING));
  // initialize the port constant

  const port = config.PORT || 7003;

  app.listen(port, () => {
    logger.info(`${LIMS_SYSTEM_RUNNING} ${port}`);
  });
};
export default appConfig;
