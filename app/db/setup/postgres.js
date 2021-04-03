import promise from 'bluebird';
import pg from 'pg-promise';
import config from '../../../config/env';

const { DATABASE_URL, TOTAL_LIMS_SYSTEM_NODE_ENV } = config;


const options = {
    promiseLib: promise,
};
const dbConfig = {
    connectionString: DATABASE_URL,
    max: 30,
    ssl: null
};

const pgp = pg(options);

const db = pgp(dbConfig);

export default db;