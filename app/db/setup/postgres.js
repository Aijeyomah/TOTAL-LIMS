import promise from 'bluebird';
import pg from 'pg-promise';
import config from '../../../config/env';

const { DATABASE_URL } = config;

const options = {
    promiseLib: promise
};

const pgp = pg(options);
pgp.pg.defaults.ssl = true;
const db = pgp(DATABASE_URL);

export default db;