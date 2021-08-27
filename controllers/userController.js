const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// REGISTER A USER
exports.register = [
  // Validate username and check if username is already taken
  body("username")
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must be between 4 and 30 characters")
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
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters"),

    async (req, res, next) => {
    // Handle potential form errors, return errors as json
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const { username, password } = req.body;
    
    try {
      // Encrypt user password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        username,
        password: hashedPassword   
      });

      return res.status(201).json(user);

    } catch (err) {
      return next(err);
    }
  }
];

// LOGIN USER
exports.login = [
  // Verify username
  body("username").custom(async (username) => {
    try {
      const checkUsername = await User.findOne({ username });
      if (!checkUsername) throw new Error("Username does not exist");
    } catch (err) {
      throw new Error(err);
    }
  }),

  // Verify password
  body("password").custom(async (password, { req }) => {
    bcrypt.compare(password, req.body.password, (err) => {
      if (err) throw new Error("Incorrect password");
    });
  }),

  async (req, res, next) => {
    // Handle potential form errors, return errors as json
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    
    try {
      const { username } = req.body;
      const user = await User.findOne({ username });

      const token = jwt.sign(
        { user },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );

      // Return token
      res.json(token);

    } catch (err) {
      return next(err);
    }
  }
];

// exports.logout = (req, res) => {
//   req.logout();
//   res.redirect("/");
// };