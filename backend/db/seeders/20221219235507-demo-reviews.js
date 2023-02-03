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
        review: "This place was amazing! The host was very accommodating and the space was clean, spacious and had all the amenities we needed. We felt like we were at home.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 8,
        review: "I highly recommend this place. The location was perfect, the apartment was clean, and the host was very responsive. We had an amazing time and can't wait to come back.",
        stars: 3
      },
      {
        spotId: 2,
        userId: 7,
        review: "This place was perfect for our family vacation. The location was great, the apartment was spacious, and the host was very helpful. We had a great time and would definitely come back.",
        stars: 5
      },
      {
        spotId: 2,
        userId: 8,
        review: "The place was absolutely fantastic. It was clean, modern, and had all the amenities we needed. The host was very welcoming and provided us with great recommendations for local restaurants and attractions.",
        stars: 5
      },
      {
        spotId: 3,
        userId: 7,
        review: "This spot was a great value for the price. The location was perfect and the apartment was clean and comfortable. We had a great time and would definitely recommend it to others.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 8,
        review: "The host was amazing! The apartment was clean, well-equipped, and in a great location. We had a wonderful time and would definitely come back.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 7,
        review: "This place and area was just perfect for our group of friends. The location was great, the apartment was spacious, and the host was very helpful. We had a fantastic time and would definitely recommend it.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 8,
        review: "The spot was exactly what we were looking for. It was clean, comfortable, and had all the amenities we needed. The host was very friendly and provided us with great recommendations for local restaurants and attractions.",
        stars: 4
      },
      {
        spotId: 5,
        userId: 7,
        review: "This house was amazing! The location was perfect, the house was clean and spacious, and the host was very accommodating. We had a great time and would definitely come back.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 8,
        review: "I highly recommend staying here. The house was clean, well-equipped, and in a great location. The host was very friendly and made sure we had everything we needed.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 7,
        review: "This place was perfect for our family vacation. The location was great, the apartment was clean and comfortable, and the host was very helpful. We had a fantastic time and would definitely come back.",
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

