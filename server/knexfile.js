require('dotenv').config({ path: './.env' });
module.exports = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
  migrations: {
    directory: './db/data/migrations',
  },
  seeds: { directory: './db/data/seeds' },
};
