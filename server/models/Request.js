const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Request = sequelize.define('Request', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending','approved','rejected'), defaultValue: 'pending' },
  reason: { type: DataTypes.STRING }
});

Request.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

module.exports = Request;
