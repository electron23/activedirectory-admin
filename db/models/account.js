'use strict';
module.exports = (sequelize, DataTypes) => {
    var Account = sequelize.define('Account', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        isAdmin: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function (models) {

            }
        }
    });
    return Account;
};