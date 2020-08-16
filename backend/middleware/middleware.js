const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const encryptedToken = req.headers.autherization.split(" ")[1];
    const dycryptedToken = jwt.verify(
      encryptedToken,
      "secret_this_is_sas_sasas"
    );
    req.userData = {
      username: dycryptedToken.username,
      userId: dycryptedToken.userId,
    };
    next();
  } catch (error) {
    return res.status(200).json({ Authfailed: true });
  }
};
