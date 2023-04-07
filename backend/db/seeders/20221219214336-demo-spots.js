'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 3,
        address: '123 Tropican Ct.',
        city: 'Lake Arrowhead',
        state: 'CA',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'One Mile High Home',
        description: 'A spacious country house surrounded by lush green gardens, ideal for groups of friends. The house also has a large private pool and plenty of outdoor seating areas, perfect for relaxing and enjoying the beautiful countryside views.',
        price: 268
      },
      {
        ownerId: 1,
        address: '444 Lian Rd.',
        city: 'Miami',
        state: 'FL',
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
        description: 'Experience the ultimate lakeside getaway in this cozy cabin with breathtaking views of the lake. The open-plan living area allows you to enjoy the stunning lake views from the comfort of your own home.',
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
        description: 'Savor the laid-back beach lifestyle in this stunning home with breathtaking views of the ocean in Ensenada, Mexico. The open-plan living area features plenty of natural light, offering panoramic views of the ocean from every angle.',
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
        description: 'A charming cottage in the heart of the city, perfect for small families. This lovely home features a comfortable living room with a plush sofa and a flat-screen TV. The cottage also boasts a small private garden where guests can relax and enjoy.',
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
        description: 'Indulge in the ultimate luxury getaway at this stunning lodge, surrounded by breathtaking natural scenery. The spacious and elegantly designed living area features high ceilings and an abundance of natural light, creating a warm and inviting atmosphere.',
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
        description: 'Escape to this enchanting Spanish villa, nestled amidst lush greenery and breathtaking natural scenery. Take a dip in the pool, lounge on the terrace, and explore the nearby nature trails in this tranquil and serene Spanish villa escape.',
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
        description: 'Experience the ultimate jungle getaway in this unique and spacious loft, surrounded by lush vegetation and towering trees. The open-plan living area features a comfortable lounge area, offering a breathtaking view of the surrounding jungle.',
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
        description: 'Entertain in style at this chic and spacious home, featuring a stunning pool, spacious outdoor area, and fully equipped indoor kitchen. The sleek and modern living area features comfortable furnishings, clean lines, and an abundance of natural light.',
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
        description: "Embrace the ultimate lake lifestyle in this stunning and modern house, directly connected to the water's edge. The open-plan living area features an abundance of natural light, offering breathtaking views of the lake from every angle.",
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
        description: "Escape to the mountains in this luxurious hillside home, offering breathtaking views of the snow-capped peaks. The spacious and elegantly designed living area features comfortable furnishings offering stunning views of the surrounding landscape.",
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
        description: 'Nestled among the trees, this charming and cozy cabin offers a peaceful retreat in the heart of the woods. The fully equipped kitchen is perfect for whipping up meals, while the comfortable bedrooms and quaint bathrooms provide a restful retreat.',
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
        description: 'Escape to this cozy and charming cabin in the heart of Big Bear. This cabin offers a peaceful retreat from the hustle and bustle of city life. The living area features a comfortable, rustic décor, creating a welcoming atmosphere.',
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
        description: 'Elevate your vacation experience in this sleek and contemporary home, featuring a stunning infinity pool overlooking the city skyline. The fully equipped spacious bedrooms have stylish bathrooms and all provide for a luxurious retreat.',
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
        description: 'Elevate your vacation experience in this sleek and contemporary home, featuring a stunning infinity pool overlooking the city skyline. The fully equipped spacious bedrooms have stylish bathrooms and all provide for a luxurious retreat.',
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
        description: 'Elevate your vacation experience in this sleek and contemporary home, featuring a stunning infinity pool overlooking the city skyline. The fully equipped spacious bedrooms have stylish bathrooms and all provide for a luxurious retreat.',
        price: 300
      },
      {
        ownerId: 6,
        address: '563 McKinney Rd.',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Villa Elyzeum',
        description: 'Perched on a seaside hill, Villa Elyzeum captures stunning views of the Mediterranean. Located in the vicinity of two UNESCO World Heritage Sites, and walking distance from the beach.',
        price: 300
      },
      {
        ownerId: 6,
        address: '563 McKinney Rd.',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Palmilla Estates',
        description: "Fire up the barbeque, throw the big game on the outdoor TV, and enjoy the sunset from the scenic patio of this Cabo villa on the Palmilla Estate. When you're not lounging by the poolside, hanging out in the hot tub, or relaxing by the fire.",
        price: 300
      },
      {
        ownerId: 6,
        address: '563 McKinney Rd.',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Palmilla Estates',
        description: "Fire up the barbeque, throw the big game on the outdoor TV, and enjoy the sunset from the scenic patio of this Cabo villa on the Palmilla Estate. When you're not lounging by the poolside, hanging out in the hot tub, or relaxing by the fire.",
        price: 300
      },
      {
        ownerId: 6,
        address: '563 McKinney Rd.',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        lat: 57.7645358,
        lng: -334.4730327,
        name: 'Palmilla Estates',
        description: "Fire up the barbeque, throw the big game on the outdoor TV, and enjoy the sunset from the scenic patio of this Cabo villa on the Palmilla Estate. When you're not lounging by the poolside, hanging out in the hot tub, or relaxing by the fire.",
        price: 300
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
