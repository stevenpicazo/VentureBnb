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
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Nebula Estate',
        description: 'A spacious country house surrounded by lush green gardens, ideal for groups of friends or large families. This stunning home features a large living room with a fireplace and plenty of seating, a fully equipped kitchen with all the latest appliances. The house also has a large private pool, a hot tub, and plenty of outdoor seating areas, perfect for relaxing and enjoying the beautiful countryside views.',
        price: 540
      },
      {
        ownerId: 3,
        address: '444 Lian Rd.',
        city: 'Running Springs',
        state: 'CA',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Hacienda Mansion',
        description: 'Indulge in the peace and serenity of this stunning mountain retreat. Soak up breathtaking views from the wraparound deck, take a dip in the hot tub, or simply relax in the cozy living area.',
        price: 320
      },
      {
        ownerId: 1,
        address: '405 Heavenly Ave',
        city: 'Lake Elsinore',
        state: 'CA',
        country: 'United States',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Lake Side Views, Game Room',
        description: 'Experience the ultimate lakeside getaway in this cozy cabin with breathtaking views of the lake. The open-plan living area features a comfortable fireplace, large windows, and plenty of natural light, allowing you to enjoy the stunning lake views from the comfort of your own home. ',
        price: 1000
      },
      {
        ownerId: 2,
        address: '3582 Tesera',
        city: 'Ensenada',
        state: 'BC',
        country: 'Mexico',
        lat: 47.7645358,
        lng: -223.4730327,
        name: 'Mid-Century Ensenada Retreat',
        description: 'Savor the laid-back beach lifestyle in this stunning home with breathtaking views of the ocean in Ensenada, Mexico. The open-plan living area features floor-to-ceiling windows, comfortable furnishings, and plenty of natural light, offering panoramic views of the ocean from every angle.',
        price: 550
      },
      {
        ownerId: 3,
        address: '123 Tropican Rd.',
        city: 'Greely',
        state: 'CO',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'A-Frame with 10 acres in the Country Side',
        description: 'Escape to the countryside in this charming A-frame house, surrounded by rolling hills and lush greenery. The cozy and inviting living area features a comfortable fireplace, skylights, and plenty of natural light, creating a warm and welcoming atmosphere.',
        price: 248
      },
      {
        ownerId: 1,
        address: '312 Jubilee St',
        city: 'Santa Rosa',
        state: 'CA',
        country: 'United States',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Rosa Estate',
        description: 'A charming cottage in the heart of the city, perfect for couples or small families. This lovely home features a comfortable living room with a plush sofa and a flat-screen TV, a fully equipped kitchen with all the essentials. The cottage also boasts a small private garden where guests can relax and enjoy the beautiful city views.',
        price: 300
      },
      {
        ownerId: 2,
        address: '9854 Laurel Ct.',
        city: 'Pequot Lakes',
        state: 'MN',
        country: 'United States',
        lat: 47.7645358,
        lng: -223.4730327,
        name: 'Luxury Lodge',
        description: 'Indulge in the ultimate luxury getaway at this stunning lodge, surrounded by breathtaking natural scenery. The spacious and elegantly designed living area features high ceilings, comfortable furnishings, and an abundance of natural light, creating a warm and inviting atmosphere.',
        price: 680
      },
      {
        ownerId: 3,
        address: '563 McKinney Rd.',
        city: 'Santa Maria',
        state: 'CT',
        country: 'Spain',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Luxurious Spanish Villa',
        description: 'Escape to this enchanting Spanish villa, nestled amidst lush greenery and breathtaking natural scenery. The fully equipped gourmet kitchen is perfect for entertaining guests, while the comfortable bedrooms and stylish bathrooms provide a restful retreat. Take a dip in the pool, lounge on the terrace, and explore the nearby nature trails in this tranquil and serene Spanish villa escape.',
        price: 735
      },
      {
        ownerId: 6,
        address: '0020 Manteca',
        city: 'Guadalajara',
        state: 'JAL',
        country: 'Mexico',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Cozy Luxorious Loft',
        description: 'Experience the ultimate jungle getaway in this unique and spacious loft, surrounded by lush vegetation and towering trees. The open-plan living area features high ceilings, plenty of natural light, and a comfortable lounge area, offering a breathtaking view of the surrounding jungle.',
        price: 300
      },
      {
        ownerId: 6,
        address: '1392 Ian Ave.',
        city: 'Temecula',
        state: 'CA',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Cliffside Estate',
        description: 'Entertain in style at this chic and spacious home, featuring a stunning pool, spacious outdoor area, and fully equipped indoor kitchen. The sleek and modern living area features comfortable furnishings, clean lines, and an abundance of natural light. The fully equipped kitchen is perfect for hosting guests, while the stylish bedrooms and luxurious bathrooms provide a comfortable escape. Enjoy al fresco dining by the pool, lounge on the sun loungers, and entertain guests in this beautiful and contemporary setting.',
        price: 450
      },
      {
        ownerId: 6,
        address: '093 Maine',
        city: 'Moraine Harbor',
        state: 'ME',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Modern Luxury Retreat',
        description: "Embrace the ultimate lake lifestyle in this stunning and modern house, directly connected to the water's edge. The open-plan living area features floor-to-ceiling windows, comfortable furnishings, and an abundance of natural light, offering breathtaking views of the lake from every angle.",
        price: 1250
      },
      {
        ownerId: 6,
        address: '34 Hill Rd.',
        city: 'Burlington',
        state: 'VT',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Hill Side Estate',
        description: "Escape to the mountains in this contemporary and luxurious hillside home, offering breathtaking views of the snow-capped peaks. The spacious and elegantly designed living area features floor-to-ceiling windows, comfortable furnishings, and an abundance of natural light, offering stunning views of the surrounding landscape.",
        price: 300
      },
      {
        ownerId: 6,
        address: '55 Neighbor Rd.',
        city: 'Cobb',
        state: 'CA',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Noble Estate',
        description: 'Nestled among the trees, this charming and cozy cabin offers a peaceful retreat in the heart of the woods. The warm and inviting living area features a crackling fireplace, comfortable furnishings, and plenty of natural light. The fully equipped kitchen is perfect for whipping up meals, while the comfortable bedrooms and quaint bathrooms provide a restful retreat.',
        price: 300
      },
      {
        ownerId: 6,
        address: '9368 Campus St.',
        city: 'Santa Barbara',
        state: 'CA',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Ocean Front Beach Home',
        description: 'Embrace the beach life in this stunning oceanfront condo. Wake up to breathtaking views, lounge on the private balcony, and enjoy a dip in the sparkling pool.',
        price: 300
      },
      {
        ownerId: 6,
        address: '234 Woodland Rd.',
        city: 'Big Bear',
        state: 'CA',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Herald Cabin',
        description: 'Escape to this cozy and charming cabin in the heart of Big Bear. Surrounded by stunning mountain scenery, this cabin offers a peaceful retreat from the hustle and bustle of city life. The warm and inviting living area features a comfortable fireplace, soft lighting, and rustic décor, creating a welcoming atmosphere.',
        price: 300
      },
      {
        ownerId: 6,
        address: '563 McKinney Rd.',
        city: 'Vancouver',
        state: 'BC',
        country: 'Canada',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Noble Estate',
        description: 'Elevate your vacation experience in this sleek and contemporary home, featuring a stunning infinity pool overlooking the city skyline. The fully equipped kitchen is perfect for entertaining guests, while the spacious bedrooms and stylish bathrooms provide a luxurious retreat. Take a dip in the pool, relax on the sun loungers, and enjoy the beauty of the city from this modern oasis.',
        price: 300
      },


    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
