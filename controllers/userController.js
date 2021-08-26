const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

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
        { username },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );

      // Save user token
      const userReturnValue = {...user};
      userReturnValue._doc.token = token;

      return res.status(201).json(userReturnValue._doc);

    } catch (err) {
      return next(err);
    }
  }
];

exports.login = [
  body("username").custom(async (username) => {
    try {
      const isUserValid = await User.findOne({ username });
      if (!isUserValid) throw new Error("Username does not exist");
    } catch (err) {
      throw new Error(err);
    }
  }),
  body("password").custom(async (password, { req }) => {
    bcrypt.compare(password, req.body.password, (err) => {
      if (err) throw new Error("Incorrect password");
      else return true;
    });
  }),

  async (req, res, next) => {
    // Check for errors in the form fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors.array());
    
    try {
      const { username } = req.body;
      const user = await User.findOne({ username });

      const token = jwt.sign(
        { username },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );

      // Save user token
      const userReturnValue = {...user};
      userReturnValue._doc.token = token;


      // User
      res.status(200).json(userReturnValue._doc);

    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
];

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
}