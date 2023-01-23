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
        userId: 7,
        review: 'Immaculate Spot!!!',
        stars: 4
      },
      {
        spotId: 1,
        userId: 8,
        review: 'Such a great spot, owner left everything nice and ready for us.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 7,
        review: 'Beautiful house. Enjoyed my stay.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 8,
        review: 'Beautiful house. Enjoyed my stay.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 7,
        review: 'Never experienced anything like this. The lights were so pretty.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 8,
        review: 'Loved it here.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 7,
        review: 'Such surreal spot.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 8,
        review: 'Loved it here.',
        stars: 4
      },
      {
        spotId: 5,
        userId: 7,
        review: 'Such surreal spot.',
        stars: 5
      },
      {
        spotId: 5,
        userId: 8,
        review: 'Loved it here.',
        stars: 5
      },
      {
        spotId: 6,
        userId: 7,
        review: 'Such surreal spot.',
        stars: 5
      },
      {
        spotId: 7,
        userId: 8,
        review: 'Loved it here.',
        stars: 5
      },
      {
        spotId: 8,
        userId: 6,
        review: 'Such surreal spot.',
        stars: 5
      },
      {
        spotId: 9,
        userId: 7,
        review: 'Such surreal spot.',
        stars: 5
      },
      {
        spotId: 10,
        userId: 7,
        review: 'Such surreal spot.',
        stars: 5
      },
      {
        spotId: 11,
        userId: 7,
        review: 'Such surreal spot.',
        stars: 5
      },
      {
        spotId: 12,
        userId: 8,
        review: 'Such surreal spot.',
        stars: 5
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }
    }, {});
  }
};

