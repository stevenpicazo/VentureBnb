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