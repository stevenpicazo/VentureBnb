'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      //! SPOT ONE
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-610097809571786094/original/fd36d4e3-4d46-4b56-b4ab-ecc9dfed9849?im_w=1200',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-610097809571786094/original/a00fb152-3014-4184-a85d-0ce46850dd74?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-610097809571786094/original/b96e816d-4233-42cf-981d-6701aceb8f5d?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-610097809571786094/original/49a33042-b1c9-48d0-aede-cd5c8c820f4a?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-610097809571786094/original/4f09c517-4fbd-4d1d-82ac-c7fdc935bb03?im_w=720',
        preview: false
      },

      //! SPOT TWO
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/83a71ea1-4bc1-4efc-bbde-cd14cb56ecb1.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/189d0cea-905e-4f47-ae37-ec3999d43918.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/815f493a-6f21-4d06-817d-6f4959c220b1.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/98ff5a20-d3b0-4d79-bc16-c29f3c0eee08.jpg?im_w=720'
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/f135d85e-a5f0-4410-8a68-2c6a37b644c1.jpg?im_w=1200',
        preview: false
      },

      //! SPOT 3
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/5bfcaaf7-46a8-4859-ade2-e6a675b2a8e4.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/a3b3b3be-21aa-4d6f-ac09-9caa548ddbec.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/c40f8476-e33e-492e-90f7-ee5e7355d045.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/1a72c64f-77bd-41de-91b2-b3b2c77df4b4.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/fb1d75dd-a49f-4a46-9120-ef025f88d1a1.jpg?im_w=1200',
        preview: false
      },

      //! SPOT 4
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-746681771703050014/original/e2087e39-ec38-44b6-883d-3c6e3239b507.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-746681771703050014/original/8ee9171a-af1d-4374-b265-081dd1367e9f.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-746681771703050014/original/67b1b22b-fea9-436f-8aae-b75f0d961123.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-746681771703050014/original/5865867d-f3e9-4759-9dfe-ef620b230ac1.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-746681771703050014/original/39778044-71f8-4dd0-9091-93229090b65e.jpeg?im_w=1200',
        preview: false
      },

      //! SPOT 5
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-698043117609650625/original/409aa015-a914-49f1-9bdd-93fbb9c7fbb7.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-698043117609650625/original/0411951f-aeef-46cc-8ced-3eeea1065172.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-698043117609650625/original/f2955e24-3af9-4f5f-8a51-7041dd88536c.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/82d5380a-4bae-4a03-8a5d-c3a761816d40.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/e1e04e97-c42d-4cdb-a762-51d92ba73c77.jpg?im_w=720',
        preview: false
      },

      //! SPOT 6
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/687d077a-ab9f-4c15-8772-4dfe8cde4324.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/491e1161-5f9d-4ec9-8d4b-f9703a37ea53.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/46034530-be5f-447c-9c34-d53716666929.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/75a4a43a-96cd-47f0-b6cb-115246aafa3b.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/48a868e5-2ef5-481d-89cd-cf2b8ba955a0.jpg?im_w=1200',
        preview: false
      },

      //! SPOT 7
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-649102501321427344/original/8d04e37d-deb4-462c-b5c7-a4b0b3ececcf.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-649102501321427344/original/8bffe614-c214-440a-8958-efc1e2c52607.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-649102501321427344/original/2c1fc755-c9f0-4076-93ef-616d10f76e0c.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-649102501321427344/original/ab505288-b6d6-40b9-b2f1-4dd1649108fe.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-649102501321427344/original/8d04e37d-deb4-462c-b5c7-a4b0b3ececcf.jpeg?im_w=1200',
        preview: false
      },

      //! SPOT 8
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/6e75f583-5c1f-41e8-b705-511dbffe92b5.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48307356/original/8dd3d5c3-968b-414a-af09-9fdbf33212f7.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/4626d93b-e838-47c6-8b9b-01eee3e199e4.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/2fc8c4b9-74ff-4a40-8fe7-acad214834e7.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48307356/original/a3ec533b-abc0-409b-91a4-6ed1aab09060.jpeg?im_w=720',
        preview: false
      },

      //! SPOT 9
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/30b677f6-9c66-4774-8a45-3a0c9eca8b4c.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/ddffea6f-a937-424d-80ee-c82bc162b2e5.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/72fdd187-02f6-4e1f-b6d7-159fbc290f52.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/f868600b-db08-4359-aeaf-777557cbc8f6.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/a8c5e509-56c8-41e1-b297-0c2641876e41.jpeg?im_w=720',
        preview: false
      },

      //! SPOT 10
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/f1ea064b-9c26-47f8-aa17-6f92b1a9c14b.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/25338e95-fcde-4d28-a19f-4bd8029bb357.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/60ec9311-a205-42a2-85f3-b984e0069c77.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/a7cf3356-ef0d-4172-a54a-1533f185acf1.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/ae147ba6-e332-4ebe-b894-764ef31f922f.jpg?im_w=1200',
        preview: false
      },

      //! SPOT 11
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/d7e9ec73-f907-493d-83ed-1d89ad92fb5e.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/02be5844-50c1-4090-a4a0-9cb0cba47919.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/b7ecd241-6599-4dbe-9bfd-3ea047e2cb23.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/c473025a-f2f9-4e20-b55e-57410b1d2b86.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/401419f5-c07d-418b-ba43-78f2ed702094.jpg?im_w=720',
        preview: false
      },


      //! SPOT 12
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36775061/original/8116147e-7e3b-4ef8-80ae-34ccfe5d372d.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36775061/original/3bea95ae-3d4d-4ed6-b70a-f6a51d68bbe8.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36775061/original/1ceb2cbc-43d1-4dc3-9a3d-04def2e157a7.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36775061/original/9be4e9a9-990e-454e-ab90-95dd9d5c57ca.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36775061/original/55a7ce72-9a9d-4a61-9a02-22849b202bc1.jpeg?im_w=1200',
        preview: false
      },

      //! SPOT 13
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/06fb8c2c-30de-41c4-b882-a703007e02e3.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/f3fb2bbd-844c-4e24-ad30-41ed557ae570.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/a0131715-3295-4bd3-9ae3-bff66edb0d7d.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/d2b95cc9-dbed-45f8-9349-c6da0d6633b2.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/ee870ec7-ad45-4e1b-a671-0504aeaf9ec7.jpg?im_w=720',
        preview: false
      },

      //! SPOT 14
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/347136ce-5e02-4a90-86d1-8d96a0e12354.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/9902c892-d625-4e38-9173-ec8b01e915db.jpg?im_w=960',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/26005915-44ea-42f6-b672-7872947586fb.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/4b41b9df-6d8c-421d-ad00-0f0b39fa4d1b.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/114908c8-41da-4e72-bca8-85a02a44d292.jpg?im_w=720',
        preview: false
      },

      //! SPOT 15
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576388435268826012/original/d9ff6c5a-8bdf-4ed6-a1e0-57ec942af052.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576388435268826012/original/e45c183d-1d95-4eb1-87c5-c59f96efc0fb.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576388435268826012/original/6e12f876-3888-4da7-98be-ad9facf1e982.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576388435268826012/original/40b98c7e-5562-4c91-8acf-e1223c26f22d.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/c1d698ff-ce89-4c9c-908a-9866e63eae71.jpg?im_w=720',
        preview: false
      },

      //! SPOT 16
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/4d85c717-7bc3-4f03-88c2-913138f7f690.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/0a2e34d1-fc3c-4823-9422-6dcfa3dc83a1.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/0b1e4ee8-b39f-4106-8ca6-c5a1a09d306e.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/62ecad73-c032-4bb6-acb2-02ba1bcb04ad.jpg?im_w=1200',
        preview: false,
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/4d85c717-7bc3-4f03-88c2-913138f7f690.jpg?im_w=1200',
        preview: false,
      },

      //! SPOT 17
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/63787420-6a55-4d88-b459-c65d0251ba31.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/629dbec2-bdb8-48ff-afb0-518eec0f8fa0.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/37e688ac-2614-4588-b501-1c5752c29f69.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/0250953e-6890-44a3-916a-2339b6c1d362.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/bdaa239d-0d58-4f4a-ad80-bab3b3cd7cb8.jpg?im_w=1200',
        preview: false,
      },

      //! SPOT 18
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-731050307050312405/original/adf30be8-484a-46e6-99da-293d29ea7b27.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-731050307050312405/original/0f9b2553-8742-4e1f-a904-a5f5014e1b5a.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-731050307050312405/original/403fa365-ea18-455d-802b-28284687640e.jpeg?im_w=1200',
        preview: false,
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-731050307050312405/original/9e691f04-c742-4f39-ab0d-5a380078d15c.jpeg?im_w=1200',
        preview: false,
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-731050307050312405/original/471a052c-e0cc-4e69-a990-6669b13200e1.jpeg?im_w=1200',
        preview: false,
      },
      //! SPOT 19
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/4b9697e2-d851-40ed-b41d-7cdb2a228d59.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/6d6ffaa0-3618-498d-a879-1c38b55eb7f0.jpg?im_w=1200',
        preview: false,
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/1043aa88-3e32-4fcb-ab35-7d1571c71c77.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/c7457653-2fd1-4717-9851-3f4efc510849.jpg?im_w=1200',
        preview: false,
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/95ec29aa-6d3f-489b-b108-c0fea10ae8ef.jpg?im_w=1200',
        preview: false,
      },

      //! SPOT 20
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/d9db73e0-2f3e-4cd2-8174-a41b410bb6e5?im_w=1200',
        preview: true,
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/f2563864-d2c5-4a71-9b34-19cfcbf3585b?im_w=720',
        preview: false,
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/36c86409-22a0-46ca-83d5-2aabc18b93ca?im_w=720',
        preview: false,
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/4f1df392-45e6-47d3-ad26-e02dee921d4a?im_w=1200',
        preview: false,
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/f6b0a50f-1985-4231-a3c4-a64004b36bcd?im_w=1200',
        preview: false,
      },

      //! SPOT 21

      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/d9db73e0-2f3e-4cd2-8174-a41b410bb6e5?im_w=1200',
        preview: true,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/f2563864-d2c5-4a71-9b34-19cfcbf3585b?im_w=720',
        preview: false,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/36c86409-22a0-46ca-83d5-2aabc18b93ca?im_w=720',
        preview: false,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/4f1df392-45e6-47d3-ad26-e02dee921d4a?im_w=1200',
        preview: false,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/f6b0a50f-1985-4231-a3c4-a64004b36bcd?im_w=1200',
        preview: false,
      },

      //! SPOT 22

      {
        spotId: 22,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/d9db73e0-2f3e-4cd2-8174-a41b410bb6e5?im_w=1200',
        preview: true,
      },
      {
        spotId: 22,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/f2563864-d2c5-4a71-9b34-19cfcbf3585b?im_w=720',
        preview: false,
      },
      {
        spotId: 22,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-736983305872788888/original/36c86409-22a0-46ca-83d5-2aabc18b93ca?im_w=720',
        preview: false,
      },


    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    }, {});
  }
};
