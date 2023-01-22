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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48407664/original/1225a495-262f-4d8d-9eba-a0b5241172f8.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52010747/original/d96b2ded-9d33-4932-b590-040754975c19.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49774628/original/5db4d9bf-6737-4135-899c-dda0c2054536.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/52f6081b-263f-4c78-931c-e028570ddb68.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-698043117609650625/original/409aa015-a914-49f1-9bdd-93fbb9c7fbb7.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/5b064a4b-c0c9-48c7-b340-01ad0e29584b.jpg?im_w=1200',
        preview: true
      },

      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/9da6dfb6-9bbc-4f97-bf60-f8502814de69.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/6e75f583-5c1f-41e8-b705-511dbffe92b5.jpg?im_w=1200',
        preview: true
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
