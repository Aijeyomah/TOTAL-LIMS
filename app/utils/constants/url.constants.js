import config from '../../../config/env';

const {
  TOTAL_LIMS_BASE_URL,
  NODE_ENV,
  PORT
} = config;

const BASE_URL = NODE_ENV === 'production'
  ? TOTAL_LIMS_BASE_URL
  : `http://localhost:${PORT || 3500}`;

export default {
  BASE_URL,
  v1: '/api/v1',

};
