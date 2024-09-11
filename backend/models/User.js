const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: ["Lütfen bir e-posta adresi girin.", true],
    unique: true,
  },
  password: {
    type: String,
    require: ["Lütfen bir şifre girin.", true],
  },
  token: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  last_login: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
