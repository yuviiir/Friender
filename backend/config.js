const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
  NODE_ENV : process.env.NODE_ENV || 'development',
  HOST : process.env.HOST || 'localhost',
  PORT : process.env.PORT || 3002,
  DB_HOST : process.env.DB_HOST,
  DB_PORT : process.env.DB_PORT,
  DB_USER : process.env.DB_USER,
  DB_PASSWORD : process.env.DB_PASSWORD,
  DB_DATABASE : process.env.DB_DATABASE
}