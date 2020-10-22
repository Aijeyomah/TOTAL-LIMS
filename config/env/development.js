import 'dotenv/config';

export default {
  DATABASE_URL: process.env.TOTAL_LIMS_SYSTEM_POSTGRES_DEV_URL || process.env.DATABASE_URL,
  SEND_GRID_API: process.env.TOTAL_LIMS_SEND_GRID_API_KEY,
  TOTAL_LIMS_BASE_URL: "",
  TOTAL_LIMS_SEND_GRID_API_KEY: process.env.TOTAL_LIMS_SEND_GRID_API_KEY,
};
