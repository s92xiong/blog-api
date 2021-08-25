const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const config = process.env;

exports.register = [
  // Validate username and check if username is already taken
  body("username")
    .trim()
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must be between 4 and 30 characters")
    .escape()
    .custom(async (username) => {
      try {
        const username_in_db = await User.findOne({ username });
        if (username_in_db) throw new Error("Username already exists");
      } catch (err) {
        throw new Error(err);
      }
    }),

  // Validate password
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters")
    .escape(),

  // Handle potential form errors
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors.array());

    const { username, password } = req.body;
    
    try {
      // Encrypt user password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        username,
        password: hashedPassword   
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id },
        config.TOKEN_KEY,
        { expiresIn: "1h" }
      );

      // Save token & return to user
      user.token = token;
      return res.status(201).json(user);

    } catch (err) {
      return next(err);
    }
  }
];

exports.login = (req, res) => {
  console.log("Logging into user account");
};

exports.logout = (req, res) => {
  res.status(200).send("Logging out of Blog API");
}