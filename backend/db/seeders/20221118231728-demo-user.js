'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Ash',
        lastName: 'Ketchum',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Pancho',
        lastName: 'Picazo',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Tyrion',
        lastName: 'Lannister',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Bobby',
        lastName: 'Stark',
        email: 'user3@user.io',
        username: 'BobbyB',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Emilia',
        lastName: 'Isla',
        email: 'user5@user.io',
        username: 'IsaEmiliana',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Tommy',
        lastName: 'Oliver',
        email: 'user6@user.io',
        username: 'Olytommy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Hirving',
        lastName: 'Lozano',
        email: 'user7@user.io',
        username: 'Chuckylozano',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Luna',
        lastName: 'Star',
        email: 'user8@user.io',
        username: 'LuluStar',
        hashedPassword: bcrypt.hashSync('password')
      }

    ], {});
    const users = await User.findAll()
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 
      'BobbyB', 'IsaEmiliana', 'Olytommy', 'chuckylozano', 'LuluStar'] }
    }, {});
  }
};
