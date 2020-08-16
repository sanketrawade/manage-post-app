const jwt = require("jsonwebtoken");
let token;

module.exports = (req, res, next) => {
  try {
    token = req.headers.autherization.split(" ")[1];
    jwt.verify(token, "secret_this_is_sas_sasas");
    next();
  } catch (error) {
    return res.status(200).json({ "Authfailed": true });
  }
};
