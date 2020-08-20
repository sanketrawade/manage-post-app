const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.autherization.split(" ")[1];
    jwt.verify(token, "secret_this_is_sas_sasas");
    next();
  } catch (error) {
    res.status(401).json({ Authfailed: true });
  }
};
