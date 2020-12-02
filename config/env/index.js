import rootPath from 'app-root-path';
import development from './development';
import production from './production';
import test from './test';

const {
  TOTAL_PORT: PORT,
  TOTAL_LIMS_SYSTEM_NODE_ENV: NODE_ENV,
  TOTAL_LIMS_SYSTEM_SECRET: SECRET,
} = process.env;

const currentEnv = {
  development,
  production,
  test
}[NODE_ENV || 'development'];



export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  SECRET,
  NODE_ENV
};
