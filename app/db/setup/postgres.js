import promise from 'bluebird';
import pg from 'pg-promise';
import config from '../../../config/env';

const { DATABASE_URL } = config;


const options = {
    promiseLib: promise,
};
// const dbConfig = {
//     connectionString: `${DATABASE_URL}/?sslmode=require`,
//     ssl: true
// };

const pgp = pg(options);

const db = pgp( `${DATABASE_URL}/?sslmode=require`);

export default db;