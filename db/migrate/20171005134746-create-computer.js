'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Computers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
      },
      Name: {
        type: Sequelize.STRING
      },
      ObjectClass: {
        type: Sequelize.STRING
      },
      DistinguishedName: {
        type: Sequelize.STRING
      },
      ObjectGUID: {
        type: Sequelize.STRING
      },
      DNSHostName: {
        type: Sequelize.STRING
      },
      Enabled: {
        type: Sequelize.STRING
      },
      SID: {
        type: Sequelize.STRING
      },
      UserPrincipalName: {
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
    return queryInterface.dropTable('Computers');
  }
};