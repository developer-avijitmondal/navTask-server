'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING

  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};