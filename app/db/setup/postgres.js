import promise from 'bluebird';
import pg from 'pg-promise';
import config from '../../../config/env';

const { DATABASE_URL } = config;

const options = {
    promiseLib: promise,
    ssl: {
        rejectUnauthorized: false
    }
};

const pgp = pg(options);

const db = pgp(DATABASE_URL);

export default db;