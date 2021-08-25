const User = require("../models/userModel");

exports.register = (req, res) => {
  console.log("Registering an account");
};

exports.login = (req, res) => {
  console.log("Logging into user account");
};

exports.logout = (req, res) => {
  res.status(200).send("Logging out of Blog API");
}