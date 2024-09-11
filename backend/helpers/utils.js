const jwt = require("jsonwebtoken");

const jwtSign = (user, expired) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, expired);
};

const jwtDecode = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { jwtSign, jwtDecode };
