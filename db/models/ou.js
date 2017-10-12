'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ou = sequelize.define('Ou', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    Name: DataTypes.STRING,
    ObjectClass: DataTypes.STRING,
    DistinguishedName: DataTypes.STRING,
    ObjectGUID: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ou;
};
