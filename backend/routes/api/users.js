const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
  
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

    const existingEmail = await User.findOne({
      where: { email: email }
    })

    if (existingEmail) {
      res.status(403)
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    } 

    const existingUsername = await User.findOne({
      where: { username: username }
    })

    if (existingUsername) {
      res.status(403)
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "username": "User with that username already exists"
        }
      })
    }
    
    const user = await User.signup({ firstName, lastName, email, username, password });
    const token = await setTokenCookie(res, user);

    const userInfo = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
      token: token
    }

    return res.json({ user: userInfo});
  }
);
  

module.exports = router;