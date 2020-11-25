import redis from 'redis';
import { promisifyAll } from 'bluebird';
import { loggers } from 'winston';
import config from '../../../config/env';

// promisify redis to enable the use of ES6 promises features.
promisifyAll(redis);

const { NODE_ENV } = config;

// Creates an instance of a redis client.
const redisDB = redis.createClient();
//{ url: process.env.REDIS_URL }

// Selects a different database while in the testing environment
if (NODE_ENV === 'test') {
  redisDB.select(3, async (err) => {
    if (err) {
      loggers.error(`An Error occurred while spawning a 
    new Redis database with the following message: ${err.message}`);
      process.exit(1);
    } else {
      try {
        await redisDB.flushdbAsync();
      } catch (e) {
        logger.error(
          `An Error occurred while removing test keys with the message: ${e.message}`
        );
      }
    }
  });
}

// Spawns a new redis connection instance that holds
// the same configuration as the client above with an option to change configurations.
const cloneRedisDB = (options = {}) => redisDB.duplicateAsync(options);

export { redisDB, cloneRedisDB };
