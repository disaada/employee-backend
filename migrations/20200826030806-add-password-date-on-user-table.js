'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('user', 'email', {
      type: Sequelize.DataTypes.STRING
    }),

    await queryInterface.addColumn('user', 'date_birth', {
      type: Sequelize.DataTypes.DATE
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user', 'email'),
    await queryInterface.removeColumn('user', 'date_birth')
  }
};
