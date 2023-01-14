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
        address: '405 Heavenly Ave',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Miller Private Mansion',
        description: 'Party hard',
        price: 10000
      },
      {
        ownerId: 2,
        address: '821 Beverly Way',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 47.7645358,
        lng: -223.4730327,
        name: 'West Hills Mansion',
        description: 'Dream Land2',
        price: 550
      },
      {
        ownerId: 3,
        address: '123 Tropican Ct.',
        city: 'San Diego',
        state: 'California',
        country: 'United States of America',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Potter Mansion',
        description: 'Amazing view. Very close to the city.',
        price: 450
      },
      {
        ownerId: 1,
        address: '405 Heavenly Ave',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Miller Private Mansion',
        description: 'Party hard',
        price: 10000
      },
      {
        ownerId: 2,
        address: '821 Beverly Way',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 47.7645358,
        lng: -223.4730327,
        name: 'West Hills Mansion',
        description: 'Dream Land2',
        price: 550
      },
      {
        ownerId: 3,
        address: '123 Tropican Ct.',
        city: 'San Diego',
        state: 'California',
        country: 'United States of America',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Potter Mansion',
        description: 'Amazing view. Very close to the city.',
        price: 450
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
