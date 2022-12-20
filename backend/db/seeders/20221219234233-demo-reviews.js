'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Immaculate Spot!!!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Such a great spot, owner left everything nice and ready for us.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Beautiful house. Enjoyed my stay.',
        stars: 5
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {});
  }
};
