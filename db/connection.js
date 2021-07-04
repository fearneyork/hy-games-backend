const { Pool } = require('pg');
const path = require('path');

//--Establishes environment variable for path--//
const ENV = process.env.NODE_ENV || 'development';

const config =
  ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

//--Configures the path to be used to the environment variable config files--//
require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

module.exports = new Pool(config);
