const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "sga", { expiresIn: "30d" });
};
module.exports = generateToken;
