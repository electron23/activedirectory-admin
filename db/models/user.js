'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    GivenName: DataTypes.STRING,
    Surname: DataTypes.STRING,
    UserPrincipalName: DataTypes.STRING,
    Enabled: DataTypes.STRING,
    SamAccountName: DataTypes.STRING,
    SID: DataTypes.STRING,
    DistinguishedName: DataTypes.STRING,
    Name: DataTypes.STRING,
    ObjectClass: DataTypes.STRING,
    ObjectGUID: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
