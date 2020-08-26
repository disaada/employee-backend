'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [{
      name: 'disa',
      password: bcrypt.hashSync('disa', 10),
      date_birth: '1996-04-11'
    }, {
      name: 'aria',
      password: bcrypt.hashSync('aria', 10),
      date_birth: '1994-12-21'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, [])
  }
};
