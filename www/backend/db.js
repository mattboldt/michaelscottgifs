/* global module */
/* global require */
/* global process */

const Sequelize = require('sequelize');

class db {
  connect() {
    const env = process.env;
    const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },

      operatorsAliases: false
    });

    return sequelize.authenticate();
  }
}

module.exports = new db();
