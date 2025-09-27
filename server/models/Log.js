const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Log = sequelize.define('Log', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  entryTime: { type: DataTypes.DATE, allowNull: true },
  exitTime: { type: DataTypes.DATE, allowNull: true }
});

module.exports = Log;
