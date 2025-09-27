const { Sequelize } = require('sequelize');
const path = require('path');

// If DB env vars point to a MySQL instance and you want to use it, set USE_MYSQL=1
let sequelize;
if (process.env.USE_MYSQL === '1') {
  sequelize = new Sequelize(process.env.DB_NAME || 'libtrack', process.env.DB_USER || 'libuser', process.env.DB_PASS || 'libpass', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  });
  console.log('Configured to use MySQL (USE_MYSQL=1)');
} else {
  const storage = path.resolve(__dirname, 'dev.sqlite');
  sequelize = new Sequelize({ dialect: 'sqlite', storage, logging: false });
  console.log('Using SQLite development DB at', storage);
}

module.exports = sequelize;
