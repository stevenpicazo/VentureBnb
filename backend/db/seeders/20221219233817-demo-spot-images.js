'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/28b3cb18-2fd1-4148-a463-119b8694d363.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/61db831a-2394-4502-84d8-f1ddd83c5fd0.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-552797436177821069/original/d837bad5-ff15-46eb-86b3-42751b6e3e36?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'preview image',
        preview: true
      },
      {
        spotId: 5,
        url: 'preview image',
        preview: true
      },
      {
        spotId: 6,
        url: 'preview image',
        preview: true
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
