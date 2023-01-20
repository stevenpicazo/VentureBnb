'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Immaculate Spot!!!',
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Such a great spot, owner left everything nice and ready for us.',
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Beautiful house. Enjoyed my stay.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Beautiful house. Enjoyed my stay.',
        stars: 5
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Never experienced anything like this. The lights were so pretty.',
        stars: 4
      },
      {
        spotId: 6,
        userId: 2,
        review: 'Loved it here.',
        stars: 4
      },
      {
        spotId: 7,
        userId: 2,
        review: 'Such surreal spot.',
        stars: 4
      },
      {
        spotId: 8,
        userId: 2,
        review: 'Amazing scenery, will reccomend to others.',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};

