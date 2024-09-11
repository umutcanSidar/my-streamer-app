const express = require("express");
const dotenv = require("dotenv");
const User = require("../models/User");
const crypto = require("crypto");
const { jwtSign } = require("../helpers/utils");
const { verifyToken } = require("../helpers/middleware");

dotenv.config();

const route = () => {
  const router = new express.Router();

  router.route("/signin").post((req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            error: true,
            errMsg: "Kullanıcı bulunamadı.",
          });
        }

        const hashedPassword = crypto
          .createHmac("sha256", process.env.JWT_SECRET_KEY)
          .update(password)
          .digest("hex");

        if (user.password === hashedPassword) {
          const token = jwtSign({ email: user.email, role: user.roleId });

          user.last_login = Date.now();
          user.token = token;
          user.save();

          return res.status(200).send({
            success: true,
            token: token,
          });
        } else {
          res.status(400).send({
            success: false,
            error: false,
            errMsg: "Kullanıcı bilgilerini kontrol edin.",
          });
        }
      });
    } else {
      return res.status(400).send({
        success: false,
        error: true,
        errMsg: "",
      });
    }
  });

  router.route("/verify-token").post(verifyToken, (req, res) => {
    const token = req.headers.authorization.slice(
      7,
      req.headers.authorization.length
    );
    res.status(200).send({
      success: true,
      token: token,
    });
  });

  return router;
};

module.exports = {
  route,
  routePrefix: `/${process.env.API_VERSION}/api/auth`,
};
