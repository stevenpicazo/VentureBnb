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
        ownerId: 3,
        address: '123 Tropican Ct.',
        city: 'San Diego',
        state: 'CA',
        country: 'United States of America',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Nebula Estate',
        description: 'Great scenery. Very secluded.',
        price: 540
      },
      {
        ownerId: 3,
        address: '444 Lian Rd.',
        city: 'Orlando',
        state: 'FL',
        country: 'United States of America',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Hacienda Mansion',
        description: 'Expansive 15acre lot, perfect for outdoor activities.',
        price: 750
      },
      {
        ownerId: 1,
        address: '405 Heavenly Ave',
        city: 'Miami',
        state: 'FL',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Miller Private Mansion',
        description: 'Party hard',
        price: 1000
      },
      {
        ownerId: 2,
        address: '821 Beverly Way',
        city: 'San Francisco',
        state: 'CA',
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
        state: 'CA',
        country: 'United States of America',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Potter Mansion',
        description: 'Amazing view. Very close to the city.',
        price: 450
      },
      {
        ownerId: 1,
        address: '312 Jubilee St',
        city: 'Santa Rosa',
        state: 'CA',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Rosa Estate',
        description: 'Party hard',
        price: 1000
      },
      {
        ownerId: 2,
        address: '9854 Laurel Ct.',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States of America',
        lat: 47.7645358,
        lng: -223.4730327,
        name: 'Frisco Herald Mansion',
        description: 'Dream Land2',
        price: 230
      },
      {
        ownerId: 3,
        address: '563 McKinney Rd.',
        city: 'San Dimas',
        state: 'CA',
        country: 'United States of America',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Noble Estate',
        description: 'Amazing view. Very close to the city.',
        price: 300
      },
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
