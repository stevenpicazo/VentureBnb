'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 AddressOne',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'demo-name1',
        description: 'Dream Land1',
        price: 101.1
      },
      {
        ownerId: 2,
        address: '123 AddressTwo',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 47.7645358,
        lng: -223.4730327,
        name: 'demo-name2',
        description: 'Dream Land2',
        price: 102.2
      },
      {
        ownerId: 3,
        address: '123 AddressThree',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'demo-name2',
        description: 'Dream Land3',
        price: 103.3
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {});
  }
};
