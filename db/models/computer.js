'use strict';
module.exports = (sequelize, DataTypes) => {
  var Computer = sequelize.define('Computer', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    Name: DataTypes.STRING,
    ObjectClass: DataTypes.STRING,
    DistinguishedName: DataTypes.STRING,
    ObjectGUID: DataTypes.STRING,
    DNSHostName: DataTypes.STRING,
    Enabled: DataTypes.STRING,
    SID: DataTypes.STRING,
    UserPrincipalName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Computer;
};