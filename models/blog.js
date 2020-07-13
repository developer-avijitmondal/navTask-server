'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
    blog_name: DataTypes.STRING,
    blog_description: DataTypes.STRING
  }, {});
  blog.associate = function(models) {
    // associations can be defined here
  };
  return blog;
};