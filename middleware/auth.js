const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  
  let token;

  // Retrieve token from authorization header
  const bearerHeader = req.headers["authorization"];
  
  // Get "token" from <"bearer token">
  if (bearerHeader && bearerHeader.toLowerCase().startsWith('bearer ')) {
    token = bearerHeader.substring(7);
  }

  // Verify token
  if (!token) return res.status(403).send("A token is required for authentication");
  jwt.verify(token, process.env.TOKEN_KEY);

  return next();
};

module.exports = verifyToken;