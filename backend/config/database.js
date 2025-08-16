// backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;