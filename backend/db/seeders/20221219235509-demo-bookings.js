'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2023-11-19'),
        endDate: new Date('2023-12-21'),
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2023-11-19'),
        endDate: new Date('2023-12-21'),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2023-11-19'),
        endDate: new Date('2023-12-21'),
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2024-11-19'),
        endDate: new Date('2024-12-21'),
      },
      {
        spotId: 5,
        userId: 1,
        startDate: new Date('2024-01-19'),
        endDate: new Date('2023-01-21'),
      },
      {
        spotId:9,
        userId: 1,
        startDate: new Date('2024-02-19'),
        endDate: new Date('2023-02-21'),
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
