'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
      },
      GivenName: {
        type: Sequelize.STRING
      },
      Surname: {
        type: Sequelize.STRING
      },
      UserPrincipalName: {
        type: Sequelize.STRING
      },
      Enabled: {
        type: Sequelize.STRING
      },
      SamAccountName: {
        type: Sequelize.STRING
      },
      SID: {
        type: Sequelize.STRING
      },
      DistinguishedName: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      ObjectClass: {
        type: Sequelize.STRING
      },
      ObjectGUID: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};