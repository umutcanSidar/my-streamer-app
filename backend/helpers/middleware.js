const { jwtDecode } = require("./utils");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.slice(
    7,
    req.headers.authorization.length
  );

  if (!token) {
    return res.status(401).send({
      success: false,
      error: true,
      errMsg: "Token bulunamadı..",
    });
  }

  try {
    const decodeToken = jwtDecode(token);
    req.user = decodeToken;

    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      error: true,
      errMsg: "Token geçerli değil.." + error,
    });
  }
};

module.exports = {
  verifyToken,
};
