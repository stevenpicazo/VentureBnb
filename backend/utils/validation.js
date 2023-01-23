const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Validation Error');
    err.errors = errors;
    err.status = 400;
    err.title = 'Validation Error';
    next(err);
  }
  next();
};

const spotValidator = [
  check('address').exists({ checkFalsy: true })
  .withMessage("Street address is required")
  .isLength({ min: 0 })
  .isLength({ max: 100 })
  .withMessage("Max character limit off 100 reached"),

  check('city').exists({ checkFalsy: true })
  .withMessage("City is required")
  .isLength({ min: 0 })
  .isLength({ max: 100 })
  .withMessage("Max character limit off 100 reached"),

  check('state').exists({ checkFalsy: true })
  .withMessage("State is required")
  .isLength({ min: 0 })
  .isLength({ max: 100 })
  .withMessage("Max character limit off 100 reached"),

  check('country').exists({ checkFalsy: true })
  .withMessage("Country is required")
  .isLength({ min: 0 })
  .isLength({ max: 100 })
  .withMessage("Max character limit off 100 reached"),  

  check('name').exists({ checkFalsy: true })
  .isLength({ max: 49 })
  .withMessage( "Name must be less than 50 characters"),

  check('description').exists({ checkFalsy: true })
  .withMessage("Description is required")
  .isLength({ min: 0 })
  .isLength({ max: 100 })
  .withMessage("Max character limit off 100 reached"),

  check('price').exists({ checkFalsy: true })
  .withMessage("Price per day is required!")
  .isInt({ min: 1 })
  .withMessage("Price is required"),
  handleValidationErrors
]

const reviewValidator = [
  check('review').exists({ checkFalsy: true })
  .withMessage("Review text is required")
  .isLength({max: 255})
  .withMessage("Max character limit reached"),
  check('stars')
  .exists({ checkFalsy: true })
  .withMessage("").isInt({ min: 1, max: 5 })
  .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
]

const queryValidator = [
  check('page').isInt({min: 1, max: 10}).withMessage("Page must be greater than or equal to 1").optional(),
  check('size').isInt({min: 1}).withMessage("Size must be greater than or equal to 1").optional(),
  check('maxLat').isDecimal().withMessage("Maximum latitude is invalid").optional(),   
  check('minLat').isDecimal().withMessage("Minimum latitude is invalid").optional(),    
  check('minLng').isDecimal().withMessage("Minimum longitude is invalid").optional(),    
  check('maxLng').isDecimal().withMessage("Maximum longitude is invalid").optional(),    
  check('minPrice').isDecimal({min: 0}).withMessage("Minimum price must be greater than or equal to 0").optional(),    
  check('maxPrice').isDecimal({min: 0}).withMessage("Maximum price must be greater than or equal to 0").optional(),
  handleValidationErrors    
]


module.exports = {
  handleValidationErrors, spotValidator, reviewValidator, queryValidator
};