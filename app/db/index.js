import db from './setup/postgres';
import { redisDB, cloneRedisDB } from './setup/redis';

export {
  db as default,
  redisDB,
  cloneRedisDB
};
