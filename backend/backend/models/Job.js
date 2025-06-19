const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./User');

const Job = sequelize.define('Job', {
  company: DataTypes.STRING,
  role: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('Applied','Interview','Offer','Rejected','Accepted'),
    defaultValue: 'Applied'
  },
  appliedDate: { type: DataTypes.DATEONLY, allowNull: false },
  notes: DataTypes.TEXT,
});

User.hasMany(Job);
Job.belongsTo(User);

module.exports = Job;
