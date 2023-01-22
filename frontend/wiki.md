VentureBnb wiki!

store = {
    session: {},
    spots: {
      allSpots: {
        [spotId]: {
          spotData,
        },
      },
      singleSpot: {
        spotData,
        SpotImages: [imagesData],
        Owner: {
          ownerData,
        },
      },
    },
    reviews: {
      // When on a single spot, use the spot slice.
      spot: {
        [reviewId]: {
          reviewData,
          User: {
            userData,
          },
        },
      },
      user: {
        [reviewId]: {
          reviewData,
          User: {
            userData,
          },
          Spot: {
            spotData,
          },
        },
      },
    }
  };


  - Summary: Spots are tied into a spots key accessed through the state. Reviews are tied to a Reviews key also accessed througth the state. The same can be said for the session state which allows for logged in users to be able to access info made available only for signed up users. 