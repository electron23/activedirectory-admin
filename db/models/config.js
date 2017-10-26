'use strict';
module.exports = (sequelize, DataTypes) => {
    var Config = sequelize.define('Config', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        description: DataTypes.TEXT,
        key: DataTypes.STRING,
        value: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {

            }
        }
    });
    return Config;
};